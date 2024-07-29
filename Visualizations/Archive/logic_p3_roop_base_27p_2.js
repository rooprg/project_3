let map;

function createMap(earthquakes, volcanos, tsunamis) {
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
        "Volcanos": volcanos,
        "Tsunamis": tsunamis
};

    // Create the map object and include layers
map = L.map("map", {
    center: [0.00, 0.00],
    zoom: 3,
    // Add volcanos?
    layers: [streetMap, earthquakes, tsunamis, volcanos]
});

    // Create a layer control, and pass in baseMaps and overlayMaps. Add the layer control to the map.
    // Add other maps
    L.control.layers(baseMaps, quakeMaps, {
    collapsed: false
}).addTo(map);
}

// Create a function to handle GeoJSON data
function createCircles([data,data2,data3]) {
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
            color: 'orange',
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
        let volcanoMarker = L.circleMarker([latitude, longitude], {
            color: 'white',
            fillColor: 'blue',
            fillOpacity: 0.5,
            radius: Math.log(feature.properties.elevation) * 2
        }).bindPopup(`<h1>Location: ${location}</h1><h3>Type: ${type}</h3><h3>Elevation: ${elevation}</h3><h3>Latitude: ${latitude}</h3>
            <h3>Longitude: ${longitude}</h3><h3>Date: ${year}-${month}-${day}</h3><h3>Houses Damaged: ${houses_damaged}</h3>
            <h3>Damages: ${damage}</h3><h3>Country: ${country}</h3>`);

        // Add markers to the volcanoMarkers array
        volcanoMarkers.push(volcanoMarker);
    })

// Initialize an array to hold tsunami markers
let tsunamiMarkers = [];

	// Loop through each tsunami data object
    data3.features.forEach(feature => {
        // Extract tsunami details
        let latitude = feature.geometry.coordinates[1];
        let longitude = feature.geometry.coordinates[0];
		let location = feature.properties.locationName;
        let water_height = feature.properties.maxWaterHeight;
        let deaths= feature.properties.deathsTotal;
		let damage = feature.properties.damageAmountOrderTotal;
        let runups = feature.properties.numRunups;
        let country = feature.properties.country;
        let year = feature.properties.year;
        let month = feature.properties.month;
        let day = feature.properties.day;

        // For each event, create a circle marker, plus bind a popup with name
        let tsunamiMarker = L.circleMarker([latitude, longitude], {
            color: "white",
            fillColor: "pink",
	    	fillOpacity: 0.75,
            radius: Math.log(feature.properties.maxWaterHeight) * 3
        }).bindPopup(`<h1>Location: ${location}</h1><h3>Country: ${country}</h3><h3>Height: ${water_height}</h3>
            <h3>Latitude: ${latitude}</h3><h3>Longitude: ${longitude}</h3>
            <h3>Damage: ${damage}</h3><h3>Total Deaths: ${deaths}</h3><h3>Date: ${year}-${month}-${day}</h3>`);

        // Add markers to the volcanoMarkers array
        tsunamiMarkers.push(tsunamiMarker);
})

createMap(L.layerGroup(earthquakeMarkers),L.layerGroup(volcanoMarkers),L.layerGroup(tsunamiMarkers));
}

// Retrieve earthquake data
// d3.json("/Datasets/cleaned_earthquake_geo.json").then(createCircles);
Promise.all([
    d3.json('../Datasets/cleaned_earthquake_geo.json'),
    d3.json('../Datasets/cleaned_volcano_geo.json'),
    d3.json('../Datasets/cleaned_tsunami_geo.json')

]).then(createCircles)
