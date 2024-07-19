import requests
import json

base_url = "https://www.ngdc.noaa.gov/hazel"

volcano = "/hazard-service/api/v1/volcanoes"
query_url="?maxYear=2024&minYear=2000"

url=base_url+volcano+query_url
response=requests.get(url)
data=response.json()
print(json.dumps(data, indent=4, sort_keys=True))