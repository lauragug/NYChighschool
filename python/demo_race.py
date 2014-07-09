from pandas import Series, DataFrame
import pandas as pd
import numpy as np
import csv as csv

dsDistrict = pd.read_csv('NYC_Schools/School_District_Breakdowns.csv')
dsDistrict = dsDistrict.drop(['COUNT PARTICIPANTS','COUNT FEMALE','COUNT MALE',\
'PERCENT FEMALE','PERCENT MALE',
'COUNT GENDER UNKNOWN','PERCENT GENDER UNKNOWN','COUNT GENDER TOTAL',\
'PERCENT GENDER TOTAL','COUNT PACIFIC ISLANDER','COUNT HISPANIC LATINO',\
'COUNT AMERICAN INDIAN','COUNT ASIAN NON HISPANIC','COUNT WHITE NON HISPANIC',\
'COUNT BLACK NON HISPANIC','COUNT OTHER ETHNICITY','COUNT ETHNICITY UNKNOWN',\
'COUNT ETHNICITY TOTAL','PERCENT ETHNICITY TOTAL','COUNT PERMANENT RESIDENT ALIEN',\
'COUNT US CITIZEN','COUNT OTHER CITIZEN STATUS','COUNT CITIZEN STATUS UNKNOWN',\
'COUNT CITIZEN STATUS TOTAL','PERCENT CITIZEN STATUS TOTAL',\
'COUNT RECEIVES PUBLIC ASSISTANCE','PERCENT RECEIVES PUBLIC ASSISTANCE',\
'COUNT NRECEIVES PUBLIC ASSISTANCE','PERCENT NRECEIVES PUBLIC ASSISTANCE',\
'COUNT PUBLIC ASSISTANCE UNKNOWN','PERCENT PUBLIC ASSISTANCE UNKNOWN',\
'COUNT PUBLIC ASSISTANCE TOTAL','PERCENT PUBLIC ASSISTANCE TOTAL',\
'PERCENT CITIZEN STATUS UNKNOWN','PERCENT ETHNICITY UNKNOWN',\
'PERCENT PERMANENT RESIDENT ALIEN','PERCENT US CITIZEN','PERCENT OTHER CITIZEN STATUS'],\
axis=1)

dsDistrict.to_csv('NYC_Schools/School_District_Breakdowns_drop.csv',index=False)
csv_file_object = csv.reader(open('NYC_Schools/School_District_Breakdowns_drop.csv')) 
#header = csv_file_object.next() 
data=[] 

for row in csv_file_object:
    data.append(row)
data = np.array(data)
dataT = data.T
frame = DataFrame(dataT)
frame.to_csv('district_bar.csv',index=False,header=False)

district1 = lambda x: x[4:6]
dsDistrict['JURISDICTION NAME'] = dsDistrict['JURISDICTION NAME'].map(district1).astype(int)
dsDistrict.to_csv('district_pie.csv',index=False)