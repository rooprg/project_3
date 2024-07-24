# Import dependencies
import requests
import json
import pandas as pd

# Set base url
base_url = "https://www.ngdc.noaa.gov/hazel"

# Develop queries text
volcano = "/hazard-service/api/v1/volcanoes"
earthquake="/hazard-service/api/v1/earthquakes"
tsunami="/hazard-service/api/v1/tsunamis/events"
query_url="?maxYear=2024&minYear=2000"

# Create volcano json

url=base_url+volcano+query_url
response=requests.get(url)
volcano=response.json()

# Create for loop for earthquakes
list = [1,2,3,4,5,6,7]
query_url2 = "?maxYear=2024&minYear=2000&page={}"
url2 = base_url+earthquake+query_url2
earthquake_items = []

for i in list:
    earthquake_url2 = url2.format(i)
    response2=requests.get(earthquake_url2)
    earthquake=response2.json()
    earthquake_items += earthquake["items"]

# Create for loop for tsunamis
list2 = [1,2]
query_url3 = "?maxYear=2024&minYear=2000&page={}"
url3 = base_url+tsunami+query_url3
tsunami_items = []

for i in list2:
    tsunami_url3 = url3.format(i)
    response3=requests.get(tsunami_url3)
    tsunami=response3.json()
    tsunami_items += tsunami["items"]

# Generating jsons
with open("volcano.json", mode="w", encoding="utf-8") as write_file:
    json.dump(volcano, write_file)

with open("earthquake.json", mode="w", encoding="utf-8") as write_file:
    json.dump(earthquake_items, write_file)

with open("tsunami.json", mode="w", encoding="utf-8") as write_file:
    json.dump(tsunami_items, write_file)
