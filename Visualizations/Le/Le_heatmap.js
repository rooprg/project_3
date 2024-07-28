// heatMap.js
export function createHeatMap(map) {
  return new Promise((resolve, reject) => {
      d3.json('Le_cleaned_earthquake_geo.json').then(function (data) {
          let heatData = data.map(function (Le_cleaned_earthquake_geo) {
              return [Le_cleaned_earthquake_geo.latitude, Le_cleaned_earthquake_geo.longitude];
          });

          let heatLayer = L.heatLayer(heatData, {
              radius: 25,
              blur: 15,
              maxZoom: 17,
          });

          resolve(heatLayer);
      }).catch(error => reject(error));
  });
}