import pandas as pd
import numpy as np
import math

dsProgReports = pd.read_csv('NYC_Schools/School_Progress_Reports_-_All_Schools_-_2009-10.csv')
dsDistrict = pd.read_csv('NYC_Schools/School_District_Breakdowns.csv')
dsClassSize = pd.read_csv('NYC_Schools/2009-10_Class_Size_-_School-level_Detail.csv')
dsAttendEnroll = pd.read_csv('NYC_Schools/School_Attendance_and_Enrollment_Statistics_by_District__2010-11_.csv')[:-2] 
dsSAT = pd.read_csv('NYC_Schools/SAT__College_Board__2010_School_Level_Results.csv')

cut_label = lambda x: x[2:]
dsSAT.DBN = dsSAT['DBN'].map(cut_label)
dsProgReports.DBN = dsProgReports['DBN'].map(cut_label)
district1 = lambda x: x[4:6]
district2 = lambda x: x[-2:]
dsDistrict['JURISDICTION NAME'] = dsDistrict['JURISDICTION NAME'].map(district1).astype(int)
dsAttendEnroll['District'] = dsAttendEnroll['District'].map(district2).astype(int)

dsProgReports_bu = dsProgReports
dsDistrict_bu = dsDistrict
dsClassSize_bu = dsClassSize 
dsAttendEnroll_bu = dsAttendEnroll 
dsSAT_bu = dsSAT 
#460 rows

dsProgReports = dsProgReports.set_index('DBN')
dsDistrict = dsDistrict.set_index('JURISDICTION NAME')
dsClassSize = dsClassSize.set_index('SCHOOL CODE') #25476
dsAttendEnroll = dsAttendEnroll.set_index('District')
dsSAT = dsSAT.set_index('DBN') #460 rows

mask = dsSAT['Number of Test Takers'].map(lambda x: x != 's')
dsSAT = dsSAT[mask] #386 rows

dsPupilTeacher = dsClassSize.filter(['SCHOOLWIDE PUPIL-TEACHER RATIO'])
mask = dsPupilTeacher['SCHOOLWIDE PUPIL-TEACHER RATIO'].map(lambda x: x > 0)
dsPupilTeacher = dsPupilTeacher[mask]      #1464 rows
dsClassSize = dsClassSize.drop(['SCHOOLWIDE PUPIL-TEACHER RATIO','BORO','CSD','SCHOOL NAME','GRADE ','PROGRAM TYPE',\
'CORE SUBJECT (MS CORE and 9-12 ONLY)','CORE COURSE (MS CORE and 9-12 ONLY)',\
'SERVICE CATEGORY(K-9* ONLY)','DATA SOURCE'], axis=1)
grouped = dsClassSize.groupby(level=0)
dsClassSize = grouped.aggregate(np.max).\
    join(grouped.aggregate(np.min), lsuffix=".max").\
    join(grouped.aggregate(np.mean), lsuffix=".min", rsuffix=".mean").\
    join(dsPupilTeacher)
mask = dsProgReports['SCHOOL LEVEL*'].map(lambda x: x == 'High School')
dsProgReports = dsProgReports[mask] # 422

final = dsSAT.join(dsClassSize).\
join(dsProgReports).\
merge(dsDistrict, left_on='DISTRICT', right_index=True).\
merge(dsAttendEnroll, left_on='DISTRICT', right_index=True) #336x83

final = final.drop(['School Name','SCHOOL','PRINCIPAL','SCHOOL LEVEL*','PROGRESS REPORT TYPE'],axis=1)
final['YTD % Attendance (Avg)'] = final['YTD % Attendance (Avg)'].map(lambda x: x.replace("%","")).astype(float)
#final.dtypes[final.dtypes.map(lambda x: x=='object')]
final.to_csv('NYC_Schools/final_toplot.csv')2

gradeCols = ['2009-2010 OVERALL GRADE','2009-2010 ENVIRONMENT GRADE','2009-2010 PERFORMANCE GRADE','2009-2010 PROGRESS GRADE','2008-09 PROGRESS REPORT GRADE']

grades = np.unique(final[gradeCols].values) #[nan, A, B, C, D, F]

for c in gradeCols:
    for g in grades:
        final = final.join(pd.Series(data=final[c].map(lambda x: 1 if x is g else 0), name=c + "_is_" + str(g))) 

final = final.drop(gradeCols, axis=1) 
final = final.dropna(axis=0) #320

#Uncomment to generate csv files 
final.to_csv('NYC_Schools/final.csv')
final.drop(['Critical Reading Mean','Mathematics Mean','Writing Mean'],axis=1).to_csv('NYC_Schools/train.csv') 
final.filter(['Critical Reading Mean','Mathematics Mean','Writing Mean']).to_csv('NYC_Schools/target.csv')

from sklearn.ensemble import RandomForestRegressor

target = final.filter(['Critical Reading Mean'])
target_array=target['Critical Reading Mean'].values
#target = target.ravel()
#We drop all three dependent variables because we don't want them used when trying to make a prediction.
train = final.drop(['Critical Reading Mean','Writing Mean','Mathematics Mean'],axis=1)
model = RandomForestRegressor(n_estimators=100, n_jobs=-1, compute_importances = True)
model.fit(train, target_array)

predictions = np.array(model.predict(train))

#rmse = math.sqrt(np.mean((np.array(target.values) - predictions)**2))
desired_array = [int(numeric_string) for numeric_string in target_array]
rmse = math.sqrt(np.mean((np.array(desired_array) - predictions)**2))
imp = sorted(zip(train.columns, model.feature_importances_), key=lambda tup: tup[1], reverse=True)

print "RMSE: " + str(rmse)
print "10 Most Important Variables:" + str(imp[:10])
#RMSE: 80.13105688
#10 Most Important Variables:[('PEER INDEX*', 0.81424747874371173), ('TOTAL REGISTER.min', 0.060086333792196724), ('2009-2010 ENVIRONMENT CATEGORY SCORE', 0.023810405565050669), ('2009-2010 ADDITIONAL CREDIT', 0.021788425210174274), ('2009-2010 OVERALL SCORE', 0.019046860376900468), ('AVERAGE CLASS SIZE.mean', 0.0094882658926829649), ('2009-2010 PROGRESS CATEGORY SCORE', 0.0094678349064146652), ('AVERAGE CLASS SIZE.min', 0.0063723026953534942), ('2009-2010 OVERALL GRADE_is_nan', 0.0057710237481254567), ('Number of Test Takers', 0.0053660239780210584)]
