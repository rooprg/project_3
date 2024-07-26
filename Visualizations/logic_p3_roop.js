let map;

// Initialize arrays to hold circle markers
let quakeCircles = [];
let tsunamiCircles = [];
let volcanoCircles = [];

function createMap(earthquake, tsunami, volcano) {

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
        "Earthquakes": earthquake
    };

    // Create an object to hold the tsunami layer
    let tsuMaps = {
        "Tsunamis": tsunami
    };

    // Create an object to hold the volcano layer
    let volMaps = {
        "Volcanos": volcano
    };
    
    // Create the map object
    map = L.map("map", {
        center: [44.58, -103.46],
        zoom: 5,
        layers: [streetMap, quakeMaps, tsuMaps, volMaps]
    });
    
    // Create a layer control, and pass in baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMaps, { ...quakeMaps, ...tsuMaps, ...volMaps }, {
        collapsed: false
    }).addTo(map);
}

// Create a function for the earthquakes
function createQuakeCircles(response1) {
    let features1 = response1;

    features1.forEach(feature => {
        let year = feature.year;
        let month = feature.month;
        let day = feature.day;
        let latitude = feature.latitude;
        let longitude = feature.longitude;
        let depth = feature.eqDepth;
        let magnitude = feature.eqMagnitude;
        let damage = feature.damageAmountOrderTotal;
        let houses_destroyed = feature.housesDestroyedAmountOrderTotal;
        let country = feature.country;

        // For each event, create a circle marker, plus bind a popup with name
        let quakeCircle = L.circleMarker([latitude, longitude], {
            fillOpacity: 0.75,
            color: "black",
            fillColor: "orange"
        }).bindPopup(`<h3>Country: ${country}</h3><h3>Magitude: ${magnitude}</h3><h3>Depth: ${depth}</h3><h3><h3>Latitude: ${latitude}</h3><h3>Longitude: ${longitude}</h3></h3><h3>Damage: ${damage}</h3></h3>
            <h3>Houses Destroyed: ${houses_destroyed}</h3></h3><h3>Date: ${year}-${month}-${day}</h3>`);

        // Add markers to quakeMarkers array
        quakeCircles.push(quakeCircle);
    });
}

// Create a function for the tsunamis
function createTsunamiCircles(response2) {
    let features2 = response2;

    features2.forEach(feature => {
        let year = feature.year;
        let month = feature.month;
        let day = feature.day;
        let latitude = feature.latitude;
        let longitude = feature.longitude;
        let height = feature.maxWaterHeight;
        let damage = feature.damageAmountOrderTotal;
        let deaths = feature.deathsTotal;
        let country = feature.country;

        // For each event, create a circle marker, plus bind a popup with name
        let tsunamiCircle = L.circleMarker([latitude, longitude], {
            fillOpacity: 0.75,
            color: "blue",
            fillColor: "red"
        }).bindPopup(`<h3>Country: ${country}</h3><h3>Height: ${height}</h3><h3>Latitude: ${latitude}</h3><h3>Longitude: ${longitude}</h3>
            <h3>Damage: ${damage}</h3><h3>Total Deaths: ${deaths}</h3><h3>Date: ${year}-${month}-${day}</h3>`);

        // Add markers to tsunamiCircles array
        tsunamiCircles.push(tsunamiCircle);
    });
}

// Create a function for the volcanos
function createVolCircles(response3) {
    let features3 = response3;

    features3.forEach(feature => {
        let year = feature.year;
        let month = feature.month;
        let day = feature.day;
        let latitude = feature.latitude;
        let longitude = feature.longitude;
        let elevation = feature.elevation;
        let vol_type = feature.morphology;
        let deaths = feature.deathsTotal;
        let country = feature.country;

        // For each event, create a circle marker, plus bind a popup with name
        let volcanoCircle = L.circleMarker([latitude, longitude], {
            fillOpacity: 0.75,
            color: "white",
            fillColor: "purple"
        }).bindPopup(`<h3>Country: ${country}</h3><h3>Elevation: ${elevation}</h3><h3>Latitude: ${latitude}</h3><h3>Longitude: ${longitude}</h3><h3>Type: ${vol_type}</h3><h3>Total Deaths: ${deaths}</h3><h3>Date: ${year}-${month}-${day}</h3>`);

        // Add markers to volcanoCircles array
        volcanoCircles.push(volcanoCircle);
    });
}


// Create layer groups from the arrays
let quakeLayerGroup = L.layerGroup(quakeCircles);
let tsunamiLayerGroup = L.layerGroup(tsunamiCircles);
let volcanoLayerGroup = L.layerGroup(volcanoCircles);

// Retrieve data
// d3.json("../Datasets/cleaned_earthquake.json")
// .then(earthquake => d3.json("../Datasets/cleaned_tsunami.json"))
// .then(tsunami => d3.json("../Datasets/cleaned_volcano.json"))
// .then(volcano => createMap(earthquake, tsunami, volcano));



d3.json("../Datasets/cleaned_earthquake.json").then(function(earthquake){
    let earthquake_data= createQuakeCircles(earthquake);
    d3.json("../Datasets/cleaned_tsunami.json").then(function(tsunami){
        let tsunami_data = createTsunamiCircles(tsunami);
        d3.json("../Datasets/cleaned_volcano.json").then(function(volcano){
            let volcano_data = createVolCircles(volcano)
            createMap(earthquake_data, tsunami_data, volcano_data);
        })
    })
})