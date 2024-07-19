import requests
import json
import pandas as pd

base_url = "https://www.ngdc.noaa.gov/hazel"

volcano = "/hazard-service/api/v1/volcanoes"
earthquake="/hazard-service/api/v1/earthquakes"
tsunami="/hazard-service/api/v1/tsunamis/events"
query_url="?maxYear=2024&minYear=2000"

url=base_url+volcano+query_url
url2=base_url+earthquake+query_url
url3=base_url+tsunami+query_url
response=requests.get(url)
data=response.json()
print(json.dumps(data, indent=4, sort_keys=True))

df = pd.read_csv(url)
df2 = pd.read_csv(url2)
df3 = pd.read_csv(url3)
df.to_csv("volcano.csv", index=False)
df2.to_csv("earthquake.csv", index=False)
df3.to_csv("tsunami.csv", index=False)