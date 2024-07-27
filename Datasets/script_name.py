#! usr/bin/env python

from sys import argv
from os.path import exists
import json

script, in_file, out_file = argv

data = json.load(open(in_file))
for d in data:
    print(d["longitude"], d["latitude"])
geojson = {
    "type": "FeatureCollection",
    "features": [
    {
        "type": "Feature",
        "geometry" : {
            "type": "Point",
            "coordinates": [d["longitude"], d["latitude"]],
            },
        "properties" : d,
     } for d in data]
     # if lat or long or both, skip record
}


output = open(out_file, 'w')
json.dump(geojson, output)

print (geojson)