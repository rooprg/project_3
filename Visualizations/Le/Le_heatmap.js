
var map = L.map('map').setView([0.00, 0.00], 5);
// Get the canvas element
var canvas = document.getElementById('myCanvas');

// Set the willReadFrequently attribute to true
canvas.getContext('2d').willReadFrequently = true;

// Add a tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

// Function to process CSV data for Earthquake
function processCSV(data) {
    var heatData2000 = [];
    var heatData2010 = [];
    var heatData2020 = [];
    
    // Loop through each row in the CSV
    data.forEach(row => {
        // Assuming the CSV has columns 'latitude' and 'longitude'
        var lat = parseFloat(row.Latitude);
        var lng = parseFloat(row.Longitude);
        var year = parseInt(row.Year);
        // Check if latitude and longitude are valid numbers
        if (!isNaN(lat) && !isNaN(lng) && year<2010) {
            heatData2000.push([lat, lng]);
        } else if (!isNaN(lat) && !isNaN(lng) && year<2020) {
            heatData2010.push([lat, lng]);
        } else if  (!isNaN(lat) && !isNaN(lng) && year<2030) {
            heatData2020.push([lat, lng]);
        }
        
    });
    
    // Create a heatmap layer with the processed data
    var heat2000 = L.heatLayer(heatData2000, {
        radius: 25,
        blur: 15,
        maxZoom: 17
    }).addTo(map);
    var heat2010 = L.heatLayer(heatData2010, {
        radius: 25,
        blur: 15,
        maxZoom: 17
    }).addTo(map);
    var heat2020 = L.heatLayer(heatData2020, {
        radius: 25,
        blur: 15,
        maxZoom: 17
    }).addTo(map);
    var overlayMaps ={
        'Earthquake 2000s': heat2000,
        'Earthquake 2010s': heat2010,
        'Earthquake 2020s': heat2020
    }
    L.control.layers(overlayMaps).addTo(map)
};
    // var layerControl = L.control.layers(,).addTo(map);
// Fetch and parse the CSV data
Papa.parse("Earthquake.csv", {
    download: true, // Set to true to fetch the file from a URL
    header: true,   // Set to true if your CSV file has headers
    complete: function(results) {
        processCSV(results.data);
    },
    error: function(error) {
        console.error('Error fetching CSV data:', error);
    }
});
// Function to process CSV data for Tusnami
function processCSV(data) {
    var heatData2000 = [];
    var heatData2010 = [];
    var heatData2020 = [];
    
    // Loop through each row in the CSV
    data.forEach(row => {
        // Assuming the CSV has columns 'latitude' and 'longitude'
        var lat = parseFloat(row.Latitude);
        var lng = parseFloat(row.Longitude);
        var year = parseInt(row.Year);
        // Check if latitude and longitude are valid numbers
        if (!isNaN(lat) && !isNaN(lng) && year<2010) {
            heatData2000.push([lat, lng]);
        } else if (!isNaN(lat) && !isNaN(lng) && year<2020) {
            heatData2010.push([lat, lng]);
        } else if  (!isNaN(lat) && !isNaN(lng) && year<2030) {
            heatData2020.push([lat, lng]);
        }
        
    });
    
    // Create a heatmap layer with the processed data
    var heat2000 = L.heatLayer(heatData2000, {
        radius: 25,
        blur: 15,
        maxZoom: 17
    }).addTo(map);
    var heat2010 = L.heatLayer(heatData2010, {
        radius: 25,
        blur: 15,
        maxZoom: 17
    }).addTo(map);
    var heat2020 = L.heatLayer(heatData2020, {
        radius: 25,
        blur: 15,
        maxZoom: 17
    }).addTo(map);
    var overlayMaps ={
        'Tsunami 2000s': heat2000,
        'Tsunami 2010s': heat2010,
        'Tsunami 2020s': heat2020
    }
    L.control.layers(overlayMaps).addTo(map)
};
    // var layerControl = L.control.layers(,).addTo(map);
// Fetch and parse the CSV data
Papa.parse("Tsunami.csv", {
    download: true, // Set to true to fetch the file from a URL
    header: true,   // Set to true if your CSV file has headers
    complete: function(results) {
        processCSV(results.data);
    },
    error: function(error) {
        console.error('Error fetching CSV data:', error);
    }
});

// Function to process CSV data for Volcano
function processCSV(data) {
    var heatData2000 = [];
    var heatData2010 = [];
    var heatData2020 = [];
    
    // Loop through each row in the CSV
    data.forEach(row => {
        // Assuming the CSV has columns 'latitude' and 'longitude'
        var lat = parseFloat(row.Latitude);
        var lng = parseFloat(row.Longitude);
        var year = parseInt(row.Year);
        // Check if latitude and longitude are valid numbers
        if (!isNaN(lat) && !isNaN(lng) && year<2010) {
            heatData2000.push([lat, lng]);
        } else if (!isNaN(lat) && !isNaN(lng) && year<2020) {
            heatData2010.push([lat, lng]);
        } else if  (!isNaN(lat) && !isNaN(lng) && year<2030) {
            heatData2020.push([lat, lng]);
        }
        
    });
    
    // Create a heatmap layer with the processed data
    var heat2000 = L.heatLayer(heatData2000, {
        radius: 25,
        blur: 15,
        maxZoom: 17
    }).addTo(map);
    var heat2010 = L.heatLayer(heatData2010, {
        radius: 25,
        blur: 15,
        maxZoom: 17
    }).addTo(map);
    var heat2020 = L.heatLayer(heatData2020, {
        radius: 25,
        blur: 15,
        maxZoom: 17
    }).addTo(map);
    var overlayMaps ={
        'Volcano 2000s': heat2000,
        'Volcano 2010s': heat2010,
        'Volcano 2020s': heat2020
    }
    L.control.layers(overlayMaps).addTo(map)
};
    // var layerControl = L.control.layers(,).addTo(map);
// Fetch and parse the CSV data
Papa.parse("Volcano.csv", {
    download: true, // Set to true to fetch the file from a URL
    header: true,   // Set to true if your CSV file has headers
    complete: function(results) {
        processCSV(results.data);
    },
    error: function(error) {
        console.error('Error fetching CSV data:', error);
    }
});