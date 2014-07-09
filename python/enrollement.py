from pandas import Series, DataFrame
import pandas as pd
import numpy as np
import csv as csv

dsEnrollment = pd.read_csv('NYC_Schools/School_Attendance_and_Enrollment_Statistics_by_District__2010-11_.csv')
dsEnrollment = dsEnrollment.drop(['YTD % Attendance (Avg)'],axis=1)

dsEnrollment.to_csv('NYC_Schools/School_Attendance_and_Enrollment_Statistics_by_District__2010-11_drop2.csv',index=False)
csv_file_object = csv.reader(open('NYC_Schools/School_Attendance_and_Enrollment_Statistics_by_District__2010-11_drop2.csv')) 
#header = csv_file_object.next() 
data=[] 

for row in csv_file_object:
    data.append(row)
data = np.array(data)
dataT = data.T
frame = DataFrame(dataT)
frame.to_csv('enrollment_bar.csv',index=False,header=False)

enrollment1 = lambda x: x[-2:]
dsEnrollment['District'] = dsEnrollment['District'].map(enrollment1)
dsEnrollment.to_csv('enrollment_pie.csv',index=False)