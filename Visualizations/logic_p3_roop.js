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
        "Earthquakes": earthquakes
    };

    // Create an object to hold the tsunamis layer
    let tsunamiMaps = {
        "Tsunamis": tsunamis
    };

    // Create an object to hold the volcanos layer
    let volcanoMaps = {
        "Volcanos": volcanos
    };

    // Create the map object
    map = L.map("map", {
        center: [0.00, 0.00],
        zoom: 5,
        layers: [streetMap, earthquakes, tsunamis, volcanos]
    });

    // Create a layer control, and pass in baseMaps and overlayMaps. Add the layer control to the map.
    // Add in tsunami and volcanos layer?
    L.control.layers(baseMaps, quakeMaps, tsunamiMaps, volcanoMaps, {
        collapsed: false
    }).addTo(map);
}

// Create a function for the earthquakes
function createCircles(data) {

    // Initialize an array to hold earthquakes
    let quakeCircles = [];

    // Loop through each earthquake data object
    data.forEach(earthquake => {
        // Extract earthquake details
        let latitude = earthquake.latitude;
        let longitude = earthquake.longitude;
        let magnitude = earthquake.eqMagnitude;
        let depth = earthquake.eqDepth;
        let total_homes = earthquake.housesDestroyedAmountOrderTotal;
        let damage = earthquake.damageAmountOrderTotal;
        let country = earthquake.country;
        let year = earthquake.year;
        let month = earthquake.month;
        let day = earthquake.day;

        // For each earthquake, create a circle marker, plus bind a popup with name
        let quakeCircle = L.circleMarker([latitude, longitude], {
            color: 'navy',
            fillColor: 'orange',
            fillOpacity: 0.5
        }).bindPopup(`<h3>Magnitude: ${magnitude}</h3><h3>Depth: ${depth}</h3><h3>Latitude: ${latitude}</h3><h3>Longitude: ${longitude}</h3><h3>Date: ${year}-${month}-${day}</h3>
            <h3>Homes Destroyed: ${total_homes}</h3><h3>Damages: ${damage}</h3><h3>Country: ${country}</h3>`);

        // Add markers to quakeMarkers array
        quakeCircles.push(quakeCircle);
    });

    // Create a layer group that's made from the new array, and pass it to the createMap function.
    // createMap(L.layerGroup(quakeCircles));
    return(L.layerGroup(quakeCircles));
}

// Create a function for the tsunamis
function createTsunamiMarkers(data1) {

    // Initialize an array to hold tsunamis
    let tsunamiMarkers = [];

    // Loop through each earthquake data object
    data1.forEach(tsunami => {
        // Extract earthquake details
        let latitude = tsunami.latitude;
        let longitude = tsunami.longitude;
        let wave = tsunami.maxWaterHeight;
        let deaths = tsunami.deathsTotal;
        let damage = tsunami.damageAmountOrderTotal;
        let country = tsunami.country;
        let year = tsunami.year;
        let month = tsunami.month;
        let day = tsunami.day;

        // For each volcano, create a circle marker, plus bind a popup with name
        let tsunamiMarker = L.marker([latitude, longitude], {
            color: 'black',
            fillColor: 'red',
            fillOpacity: 0.5
        }).bindPopup(`<h3>Wave Height: ${wave}</h3><h3><h3>Latitude: ${latitude}</h3><h3>Longitude: ${longitude}</h3><h3>Date: ${year}-${month}-${day}</h3>
            <h3>Deaths: ${deaths}</h3><h3>Damages: ${damage}</h3><h3>Country: ${country}</h3>`);

        // Add markers to quakeMarkers array
        tsunamiMarkers.push(tsunamiMarker);
    });

    // createMap(L.layerGroup(quakeCircles));
    return(L.layerGroup(tsunamiMarkers));
}

// Create a function for the volcanos
function createVolcanoMarkers(data2) {

    // Initialize an array to hold volcanos
    let volcanoMarkers = [];

    // Loop through each volcano data object
    data2.forEach(volcano => {
        // Extract volcano details
        let latitude = volcano.latitude;
        let longitude = volcano.longitude;
        let elevation = volcano.elevation;
        let type = volcano.morphology;
        let deaths = volcano.deathsTotal;
        let damage = volcano.damageAmountOrderTotal;
        let country = volcano.country;
        let year = volcano.year;
        let month = volcano.month;
        let day = volcano.day;

        // For each volcano, create a circle marker, plus bind a popup with name
        let volcanoMarker = L.marker([latitude, longitude], {
            color: 'white',
            fillColor: 'yellow',
            fillOpacity: 0.5
        }).bindPopup(`<h3>Type: ${type}</h3><h3>Elevation: ${elevation}</h3><h3>Latitude: ${latitude}</h3><h3>Longitude: ${longitude}</h3><h3>Date: ${year}-${month}-${day}</h3>
            <h3>Deaths: ${deaths}</h3><h3>Damages: ${damage}</h3><h3>Country: ${country}</h3>`);

        // Add markers to quakeMarkers array
        volcanoMarkers.push(volcanoMarker);
    });
    
    // createMap(L.layerGroup(quakeCircles));
    return(L.layerGroup(volcanoMarkers));
}

// Retrieve earthquake data
// d3.json("/Datasets/cleaned_earthquake.json").then(createCircles);

// Retrieve tsunami data
//d3.json("/Datasets/cleaned_tsunami.json").then(createTsunamiMarkers);

// Retrieve volcano data
// d3.json("/Datasets/cleaned_volcano.json").then(createVolcanoMarkers);

// Retrieve data
// d3.json("/Datasets/cleaned_earthquake.json")
// .then(earthquake => d3.json("/Datasets/cleaned_tsunami.json"))
// .then(tsunami => d3.json("/Datasets/cleaned_volcano.json"))
// .then(volcano => createMap(earthquake, tsunami, volcano));

createMap(d3.json("/Datasets/cleaned_earthquake.json").then(createCircles),d3.json("/Datasets/cleaned_tsunami.json").then(createTsunamiMarkers), d3.json("/Datasets/cleaned_volcano.json").then(createVolcanoMarkers))