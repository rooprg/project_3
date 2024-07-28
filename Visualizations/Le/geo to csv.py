import pandas as pd
import json

# Read the JSON file
with open('Le_cleaned_earthquake.json', 'r') as file:
    json_data = json.load(file)

# convert json to dadaframe

df = pd.DataFrame(json_data)

# export DataFrame to CSV

df.to_csv('le_earthquake.csv', index=False)


# # Extract and transform data (headder)
# csv_data = [['latitude', 'longitude', 'depth', 'magnitude', 'location', 'year']]  

# for item in data:
#     latitude = item['latitude']
#     longitude = item['longitude']
#     depth = item['depth']
#     magnitude = item['magnitude']
#     location = item['location']
#     year = item['year']

#     csv_data.append([latitude, longitude, depth, magnitude, location, year])

# # Write to CSV
# with open('output.csv', 'w', newline='') as csvfile:
#     csvwriter = csv.writer(csvfile)
#     csvwriter.writerows(csv_data)