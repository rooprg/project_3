// Create a Leaflet map
var map = L.map('map').setView([51.505,-0.09], 13);

// Add a tile layer for the base map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Load JSON data
    d3.json("../Datasets/cleaned_earhtquake.json").then(function(data) {

// Prepare th JSON data
    // parsed_data = json.loads(cleaned_earthquake)
    

    // Plot markers on the map based on the data
    data.forEach(function(d) {
        L.marker([d.latitude, d.longitude]).addTo(map)
            .bindPopup('Location: ' + d.location);
        });
    });
    
    // // Create an object to hold the streetmap layer
    // let baseMaps = {
    //     "Street Map": streetMap
    // };
    
    // // Create an object to hold the earthquakes layer
    // let quakeMaps = {
    //     "Earthquakes": earthquakes
    // };
    
    // // Create the map object
    // map = L.map("map", {
    //     center: [44.58, -103.46],
    //     zoom: 5,
    //     layers: [streetMap, quakeMaps]
    // });
    
    // // Create a layer control, and pass in baseMaps and overlayMaps. Add the layer control to the map.
    // L.control.layers(baseMaps, quakeMaps, {
    //     collapsed: false
    // }).addTo(map);

    // // Create function for Earthquake
    // function createFeatures(earthquakeData) {
    //   // Set data markers to reflect magnitude by size and depth of earthquake by color
    //       function createCircleMarker(feature, latlng) {
    //           console.log("Feature:", feature);
    //           console.log("LatLng:", latlng);
      
    //           let options = {
    //               radius: feature.properties.mag * 5,
    //               fillColor: getColor(feature.geometry.coordinates[2]),
    //               color: "black",
    //               weight: 1,
    //               opacity: 1,
    //               fillOpacity: 0.8
    //           };
    //           return L.circleMarker(latlng, options);
    //       }
      

// // Adding the legend to the map
// legend.addTo(map);
// }



// // Create the map
// var map = L.map('mapid').setView([51.505, -0.09], 13);


