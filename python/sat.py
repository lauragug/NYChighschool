from pandas import Series, DataFrame
import pandas as pd
import numpy as np
import csv as csv

dsProgReports = pd.read_csv('NYC_Schools/School_Progress_Reports_-_All_Schools_-_2009-10.csv')
dsSAT = pd.read_csv('NYC_Schools/SAT__College_Board__2010_School_Level_Results.csv')

cut_label = lambda x: x[2:]
dsSAT.DBN = dsSAT['DBN'].map(cut_label)
dsProgReports.DBN = dsProgReports['DBN'].map(cut_label)

dsProgReports = dsProgReports.set_index('DBN')
dsSAT = dsSAT.set_index('DBN') #460 rows
mask = dsSAT['Number of Test Takers'].map(lambda x: x != 's')
dsSAT = dsSAT[mask] #386 rows
mask = dsProgReports['SCHOOL LEVEL*'].map(lambda x: x == 'High School')
dsProgReports = dsProgReports[mask]
final = dsSAT.join(dsProgReports)

dsSAT = dsSAT.drop(['School Name','Number of Test Takers'],axis=1)
dsSAT.to_csv('NYC_Schools/sat.csv',index=False)

mask = final['PEER INDEX*'].map(lambda x: x >0 )
final = final[mask]

final = final.drop(['School Name','Number of Test Takers','DISTRICT','SCHOOL','PRINCIPAL',\
'PROGRESS REPORT TYPE','SCHOOL LEVEL*','2009-2010 OVERALL GRADE','2009-2010 OVERALL SCORE',\
'2009-2010 ENVIRONMENT CATEGORY SCORE','2009-2010 ENVIRONMENT GRADE',\
'2009-2010 PERFORMANCE CATEGORY SCORE','2009-2010 PERFORMANCE GRADE',\
'2009-2010 PROGRESS CATEGORY SCORE','2009-2010 PROGRESS GRADE','2009-2010 ADDITIONAL CREDIT',\
'2008-09 PROGRESS REPORT GRADE'],axis=1)
final_r=DataFrame(final,columns=['PEER INDEX*','Critical Reading Mean'])
final_m=DataFrame(final,columns=['PEER INDEX*','Mathematics Mean'])
final_w=DataFrame(final,columns=['PEER INDEX*','Writing Mean'])
final.to_csv('NYC_Schools/sat_peer.csv',index=False)
final_r.to_csv('NYC_Schools/read_peer.csv',index=False,header=False)
final_m.to_csv('NYC_Schools/math_peer.csv',index=False,header=False)
final_w.to_csv('NYC_Schools/write_peer.csv',index=False,header=False)

csv_file_object = csv.reader(open('NYC_Schools/read_peer.csv')) 
data=[] 
for row in csv_file_object: data.append(row)
data = np.array(data)
#np.savetxt('array_r.csv',data.astype(np.float64),fmt='%10.5f',delimiter=',')
