let map;

function createMap(earthquakes) {
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
//         "Volcanos": volcanos,
//         "Tsunamis": tsunamis
    };
    
    // Create the map object and include layers
map = L.map("map", {
    center: [0.00, 0.00],
    zoom: 3,
    // Add volcanos?
    layers: [streetMap, earthquakes]
});

    // Create a layer control, and pass in baseMaps and overlayMaps. Add the layer control to the map.
    // Add other maps
    L.control.layers(baseMaps, quakeMaps, {
    collapsed: false
}).addTo(map)
}

// Create a function to handle GeoJSON data
function createCircles([data]) {
    // Initialize an array to hold earthquake markers
    let earthquakeMarkers = [];

// Loop through each feature in the GeoJSON data
data.features.forEach(feature => {
    // Extract earthquake details from the propertie
    let latitude = feature.geometry.coordinates[1];
    let longitude = feature.geometry.coordinates[0];
    let magnitude = feature.properties.eqMagnitude;
    let depth = feature.properties.eqDepth;
    let total_homes = feature.properties.housesDestroyedAmountOrderTotal;
    let location = feature.properties.locationName;
    let damage = feature.properties.damageAmountOrderTotal;
    let country = feature.properties.country;
    let year = feature.properties.year;
    let month = feature.properties.month;
    let day = feature.properties.day;

// Create a circle marker for each earthquake (Roof)
let earthquakeMarker = L.circleMarker([latitude, longitude], {
    color: 'black',
    fillColor: 'red',
    fillOpacity: 0.5,
    radius: Math.sqrt(feature.properties.eqMagnitude) * 4
}).bindPopup(`<h1>Location: ${location}</h1><h3>Magnitude: ${magnitude}</h3><h3>Depth: ${depth}</h3><h3>Latitude: ${latitude}</h3>
    <h3>Longitude: ${longitude}</h3><h3>Date: ${year}-${month}-${day}</h3>
    <h3>Homes Destroyed: ${total_homes}</h3><h3>Damages: ${damage}</h3><h3>Country: ${country}</h3>`);


// Add the marker to the earthquakeMarkers array
    earthquakeMarkers.push(earthquakeMarker);
});

// Initialize an array to hold volcano markers

createMap(L.layerGroup(earthquakeMarkers));
}

// // Retrieve earthquake data
// // d3.json("/Datasets/cleaned_earthquake_geo.json").then(createCircles);
Promise.all([
    d3.json('/Datasets/cleaned_earthquake_geo.json'),
]).then(createCircles)