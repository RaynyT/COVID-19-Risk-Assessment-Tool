#!/usr/bin/python

# Script will run on server at 3pm every day. (Implemented via cnontab on server.)

from __future__ import print_function

import requests
import json
import datetime
import pymysql

countiesAPI = requests.get("https://api.covidactnow.org/v2/counties.json?apiKey=6ab5b1bb12264815b6bdd39e9914c3fa")
stateAPI = requests.get("https://api.covidactnow.org/v2/states.json?apiKey=6ab5b1bb12264815b6bdd39e9914c3fa")

countyData = countiesAPI.json()
stateData = stateAPI.json()

db = pymysql.connect(
        host = '172.18.0.3',
        user = 'root',
        passwd = '', #password deleted for security
        db = 'radb'
)

insert = "INSERT INTO TblStateCounty_Rate(StateCountyID, Uploaded, PosTestRateCounty, NumNewCases) VALUES(%s, CURDATE(), %s, %s)"
query = "SELECT StateCountyID FROM TblStateCounty WHERE FIPS = %s"

with db.cursor() as cursor:
        for county in countyData:
                fips = county["fips"]
                cursor.execute(query, (fips))
                sc_id = cursor.fetchone()
                if sc_id != None:
                        pTRC = county["metrics"]["testPositivityRatio"]
                        if pTRC == None:
                                stateAcr = county["state"]
                                for state in stateData:
                                        if state["state"] == stateAcr:
                                                pTRC = state["metrics"]["testPositivityRatio"]
                        cursor.execute(insert, (sc_id, pTRC, county["actuals"]["newCases"]))
                        db.commit()
db.close()