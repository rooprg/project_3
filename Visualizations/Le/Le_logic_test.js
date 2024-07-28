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
    let location = feature.properties.locationName;
    let latitude = feature.geometry.coordinates[1];
    let longitude = feature.geometry.coordinates[0];
    let magnitude = feature.properties.eqMagnitude;
    let depth = feature.properties.eqDepth;
    let year = feature.properties.year;})


// Create a circle marker for each earthquake (Roof)
let earthquakeMarker = L.circleMarker([latitude, longitude], {
    color: 'black',
    fillColor: 'red',
    fillOpacity: 0.5,
    radius: Math.sqrt(feature.properties.eqMagnitude) * 4
}).bindPopup(`<h1>Location: ${location}</h1><h3>Magnitude: ${magnitude}</h3><h3>Depth: ${depth}</h3><h3>Latitude: ${latitude}</h3>
    <h3>Longitude: ${longitude}</h3><h3>Year: ${year}</h3>`);

// Define a function to determine the color based on earhtquake year
    function getColor(year) {
        if (year < 2000) {
            return 'yellow';
        } else if (year < 2010) {
            return 'green';
        } else if (year < 2020) {
            return 'purple';
        } else {
            return 'blue';
        }
    }
// Create a GeoJSOn layer that contain the features array on the earthquakedata object
 // Give each feature a popup that describes the place, time, and magnitude of the earthquake
 let earthquakes = L.geoJSON(earthquakeData, {
    pointToLayer: createCircleMarker,
    onEachFeature: function (feature, layer) {
        // layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
        layer.on('mouseover', function() { 
            layer.bindPopup(`<b>Location:${feature.properties.locationName}</b><br><b>Magnitude: ${feature.properties.eqMagnitude}</b><br><b>Year: ${feature.properties.year}</b><br><b>Depth: ${eature.properties.eqDepth[2]}</b>`).openPopup();
        });
        layer.on('mouseout', function() { 
            layer.bindPopup(`<b>Location:${feature.properties.locationName}</b><br><b>Magnitude: ${feature.properties.eqMagnitude}</b><br><b>Year: ${feature.properties.year}</b><br><b>Depth: ${feature.properties.eqDepth[2]}</b>`).closePopup();
        });
    }
});

console.log("Earthquakes Layer:", earthquakes);
// Create earthquake year legend and add to map
let legend = L.control({ position: "bottomright" });

legend.onAdd = function (map) {
    let div = L.DomUtil.create('div', 'info legend');
    let legendData = [
        { limit: 2000, color: 'yellow'},
        { limit: 2010, color: 'green' },
        { limit: 2020, color: 'purple' },
        { limit: 2030, color: 'blue' },

    ]};

    // Loop through legend data and add color blocks
    // Xpert Learning Assistant was used to identify and troubleshoot legend code
    for (let i = 0; i < legendData.length; i++) {
        let item = legendData[i];
        let colorBlock = document.createElement('div');
        colorBlock.className = 'legend-color-block';
        colorBlock.style.backgroundColor = item.color;
        colorBlock.textContent = item.limit + (legendData[i + 1] ? ' - ' + legendData[i + 1].limit : ' +');
        div.appendChild(colorBlock);
    }

    return div;

    //Add legend title
        div.innerHTML = '<h4>Year</h4>';

// Add the marker to the earthquakeMarkers array
    earthquakeMarkers.push(earthquakeMarker);
};
// Initialize an array to hold volcano markers

createMap(L.layerGroup(earthquakeMarkers));




// // Retrieve earthquake data
// // d3.json("/Datasets/cleaned_earthquake_geo.json").then(createCircles);
Promise.all([
    d3.json('/Datasets/cleaned_earthquake_geo.json'),
]).then(createCircles)