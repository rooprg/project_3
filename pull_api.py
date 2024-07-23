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

# Format queries
url=base_url+volcano+query_url
url2=base_url+earthquake+query_url
url3=base_url+tsunami+query_url
response=requests.get(url)
volcano=response.json()
response2=requests.get(url2)
earthquake=response2.json()
response3=requests.get(url3)
tsunami=response3.json()

# Generating jsons
with open("volcano.json", mode="w", encoding="utf-8") as write_file:
    json.dump(volcano, write_file)

with open("earthquake.json", mode="w", encoding="utf-8") as write_file:
    json.dump(earthquake, write_file)

with open("tsunami.json", mode="w", encoding="utf-8") as write_file:
    json.dump(tsunami, write_file)
