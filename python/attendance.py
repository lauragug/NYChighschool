from pandas import Series, DataFrame
import pandas as pd
import numpy as np
import csv as csv

dsAttendance = pd.read_csv('NYC_Schools/School_Attendance_and_Enrollment_Statistics_by_District__2010-11_.csv')
dsAttendance = dsAttendance.drop(['YTD Enrollment(Avg)'],\
axis=1)

dsAttendance.to_csv('NYC_Schools/School_Attendance_and_Enrollment_Statistics_by_District__2010-11_drop1.csv',index=False)
csv_file_object = csv.reader(open('NYC_Schools/School_Attendance_and_Enrollment_Statistics_by_District__2010-11_drop1.csv')) 
#header = csv_file_object.next() 
data=[] 

for row in csv_file_object:
    data.append(row)
data = np.array(data)
dataT = data.T
frame = DataFrame(dataT)
frame.to_csv('attendance_bar.csv',index=False,header=False)

attendance1 = lambda x: x[-2:]
dsAttendance['District'] = dsAttendance['District'].map(attendance1)
dsAttendance.to_csv('attendance_pie.csv',index=False)