let map;

function createMap(NatureHarzard) {

    // Create the tile layer that will be the background of the map
    let streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    
    // Create an object to hold the streetmap layer
    let baseMaps = {
        "Street Map": streetMap
    };
    
    // Create an object to hold the earthquakes layer
    let quakeMaps = {
        "Earthquakes": earthquakes
    };
    
    // Create the map object
    map = L.map("map", {
        center: [44.58, -103.46],
        zoom: 5,
        layers: [streetMap, quakeMaps]
    });
    
    // Create a layer control, and pass in baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, quakeMaps, {
        collapsed: false
    }).addTo(map);

    // Create function for Earthquake
    function createFeatures(earthquakeData) {
      // Set data markers to reflect magnitude by size and depth of earthquake by color
          function createCircleMarker(feature, latlng) {
              console.log("Feature:", feature);
              console.log("LatLng:", latlng);
      
              let options = {
                  radius: feature.properties.mag * 5,
                  fillColor: getColor(feature.geometry.coordinates[2]),
                  color: "black",
                  weight: 1,
                  opacity: 1,
                  fillOpacity: 0.8
              };
              return L.circleMarker(latlng, options);
          }
      

// // Adding the legend to the map
// legend.addTo(map);
// }
