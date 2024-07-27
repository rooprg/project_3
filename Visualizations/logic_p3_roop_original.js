let map;

function createMap(earthquakes, tsunamis, volcanos) {
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
        "Earthquakes": earthquakes,
        // "Volcanos": volcanos,
};

    // Create an object to hold the volcanos layer
    let volcanoMaps = {
        "Volcanos": volcanos
};

    // Create an object to hold the tsunamis layer
    let tsunamiMaps = {
        "Tsunamis": tsunamis
};

    // Create the map object and include both earthquake and volcano layers
map = L.map("map", {
    center: [0.00, 0.00],
    zoom: 5,
    // Add volcanos?
    layers: [streetMap, earthquakes]
});

    // Create a layer control, and pass in baseMaps and overlayMaps. Add the layer control to the map.
    // Add other maps
    L.control.layers(baseMaps, quakeMaps, {
    collapsed: false
}).addTo(map);
}

// Create a function to handle the earthquake GeoJSON data
function createCircles(data) {
    // Initialize an array to hold earthquake markers
    let earthquakeMarkers = [];

    // Loop through each feature in the GeoJSON data
    data.features.forEach(feature => {
        // Extract earthquake details from the properties
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

        // Create a circle marker for each earthquake
        let earthquakeMarker = L.circleMarker([latitude, longitude], {
            color: 'navy',
            fillColor: 'orange',
            fillOpacity: 0.5
        }).bindPopup(`<h1>Location: ${location}</h1><h3>Magnitude: ${magnitude}</h3><h3>Depth: ${depth}</h3><h3>Latitude: ${latitude}</h3><h3>Longitude: ${longitude}</h3><h3>Date: ${year}-${month}-${day}</h3>
            <h3>Homes Destroyed: ${total_homes}</h3><h3>Damages: ${damage}</h3><h3>Country: ${country}</h3>`);

        // Add the marker to the earthquakeMarkers array
        earthquakeMarkers.push(earthquakeMarker);
    });

    // Create a layer group from the earthquake markers and pass it to the createMap function
    createMap(L.layerGroup(earthquakeMarkers));
}

// Create a function to handle the volcano GeoJSON data
function createVolcanoMarkers(data2) {

    // Initialize an array to hold volcano markers
    let volcanoMarkers = [];

    // Loop through each volcano data object
    data2.features.forEach(feature => {
        // Extract volcano details
        let latitude = feature.geometry.coordinates[1];
        let longitude = feature.geometry.coordinates[0];
        let location = feature.properties.location;
        let elevation = feature.properties.elevation;
        let type = feature.properties.morphology;
        let damage = feature.properties.damageAmountOrderTotal;
        let houses_damaged = feature.properties.housesDestroyedAmountOrderTotal;
        let country = feature.properties.country;
        let year = feature.properties.year;
        let month = feature.properties.month;
        let day = feature.properties.day;

        // For each volcano, create a circle marker and bind a popup with details
        let volcanoMarker = L.marker([latitude, longitude], {
            color: 'white',
            fillColor: 'yellow',
            fillOpacity: 0.5
        }).bindPopup(`<h1>Location: ${location}</h1><h3>Type: ${type}</h3><h3>Elevation: ${elevation}</h3><h3>Latitude: ${latitude}</h3><h3>Longitude: ${longitude}</h3><h3>Date: ${year}-${month}-${day}</h3><h3>Houses Damaged: ${houses_damaged}</h3><h3>Damages: ${damage}</h3><h3>Country: ${country}</h3>`);

        // Add markers to the volcanoMarkers array
        volcanoMarkers.push(volcanoMarker);
    });

    // another createMap for layerGroup? Or return markers? Or addTo?
    
}

// // Create a function for the tsunamis
// function createTsunamiMarkers(data1) {

//     // Initialize an array to hold tsunamis
//     let tsunamiMarkers = [];

//     // Loop through each earthquake data object
//     data1.forEach(tsunami => {
//         // Extract earthquake details
//         let latitude = tsunami.latitude;
//         let longitude = tsunami.longitude;
//         let wave = tsunami.maxWaterHeight;
//         let deaths = tsunami.deathsTotal;
//         let damage = tsunami.damageAmountOrderTotal;
//         let country = tsunami.country;
//         let year = tsunami.year;
//         let month = tsunami.month;
//         let day = tsunami.day;

//         // For each volcano, create a circle marker, plus bind a popup with name
//         let tsunamiMarker = L.marker([latitude, longitude], {
//             color: 'black',
//             fillColor: 'red',
//             fillOpacity: 0.5
//         }).bindPopup(`<h3>Wave Height: ${wave}</h3><h3><h3>Latitude: ${latitude}</h3><h3>Longitude: ${longitude}</h3><h3>Date: ${year}-${month}-${day}</h3>
//             <h3>Deaths: ${deaths}</h3><h3>Damages: ${damage}</h3><h3>Country: ${country}</h3>`);

//         // Add markers to quakeMarkers array
//         tsunamiMarkers.push(tsunamiMarker);
//     });

//     // another createMap for layerGroup? Or return markers? Or addTo?
    
//}

// Retrieve earthquake data
d3.json("/Datasets/cleaned_earthquake_geo.json").then(createCircles);

// Retrieve volcano data
//d3.json("/Datasets/cleaned_volcano.json").then(createVolcanoMarkers);

// Retrieve tsunami data
//d3.json("/Datasets/cleaned_tsunami.json").then(createTsunamiMarkers);

// Retrieve data
// d3.json("/Datasets/cleaned_earthquake.json")
// .then(earthquake => d3.json("/Datasets/cleaned_tsunami.json"))
// .then(tsunami => d3.json("/Datasets/cleaned_volcano.json"))
// .then(volcano => createMap(earthquake, tsunami, volcano));

// createMap(d3.json("/Datasets/cleaned_earthquake_geo.json").then(createCircles), d3.json("/Datasets/cleaned_volcano_geo.json").then(createVolcanoMarkers))