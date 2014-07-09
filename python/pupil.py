from pandas import Series, DataFrame
import pandas as pd
import numpy as np
import csv as csv
import math

dsClassSize = pd.read_csv('NYC_Schools/2009-10_Class_Size_-_School-level_Detail.csv')

dsPupilTeacher = dsClassSize.filter(['SCHOOLWIDE PUPIL-TEACHER RATIO'])
mask = dsPupilTeacher['SCHOOLWIDE PUPIL-TEACHER RATIO'].map(lambda x: x > 0)
dsPupilTeacher = dsPupilTeacher[mask]

#dsEnrollment.to_csv('NYC_Schools/School_Attendance_and_Enrollment_Statistics_by_District__2010-11_drop2.csv',index=False)
#csv_file_object = csv.reader(open('NYC_Schools/School_Attendance_and_Enrollment_Statistics_by_District__2010-11_drop2.csv')) 
##header = csv_file_object.next() 
#data=[] 
#for row in csv_file_object:
#    data.append(row)
#data = np.array(data)
#dataT = data.T
#frame = DataFrame(dataT)
#frame.to_csv('enrollment_bar.csv',index=False,header=False)

mask1 = dsClassSize['SCHOOLWIDE PUPIL-TEACHER RATIO'].map(lambda x: x > 0)
dsClassSize1=  dsClassSize[mask1]
dsClassSize1=  dsClassSize1.drop(['GRADE ','PROGRAM TYPE','CORE SUBJECT (MS CORE and 9-12 ONLY)',\
'CORE COURSE (MS CORE and 9-12 ONLY)','SERVICE CATEGORY(K-9* ONLY)','NUMBER OF CLASSES',\
'TOTAL REGISTER','AVERAGE CLASS SIZE','SIZE OF SMALLEST CLASS','SIZE OF LARGEST CLASS',\
'DATA SOURCE','SCHOOLWIDE PUPIL-TEACHER RATIO'], axis=1)
#enrollment1 = lambda x: x[-2:]
#dsEnrollment['District'] = dsEnrollment['District'].map(enrollment1)
#final = dsClassSize['SCHOOL CODE'].join(dsPupilTeacher)
#final.to_csv('pupil.csv',index=False)
cut_label = lambda x: x[-3:]
dsClassSize1['SCHOOL CODE'] = dsClassSize1['SCHOOL CODE'].map(cut_label)
dsClassSize1.to_csv('schools_list.csv',index=False)

df=dsPupilTeacher.describe()
df.to_csv('pupil_describe.csv')