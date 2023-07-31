// set page opening map view to location
var map = L.map("map").setView([46.45236041353664, -63.302893192172775], 9);

// initialize control layers
var controlLayers = L.control.layers(null, null, { position: "topright", collapsed: false }).addTo(map);

// base map options   
var OpenStreetMap = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 18,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }
).addTo(map);
controlLayers.addBaseLayer(OpenStreetMap, "Basic");

var arcGIS = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    {
        maxZoom: 18,
        attribution: 'Tiles &copy; Esri',
    }
).addTo(map);
controlLayers.addBaseLayer(arcGIS, "ArcGIS");

var OpenTopoMap = L.tileLayer(
    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    {
        maxZoom: 18,
        attribution:
            'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
    }
);
controlLayers.addBaseLayer(OpenTopoMap, "Topographical");

var Esri_WorldImagery = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
        attribution:
            "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    }
);
controlLayers.addBaseLayer(Esri_WorldImagery, "Satellite");

// defines marker icon parameters
var LeafIcon = L.Icon.extend({
    options: {
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40]
    }
});

// creates different marker icons
function createLeafIcon(iconUrl) {
    return new LeafIcon({ iconUrl });
}


// number of markers
var markerCount = 0;
// assigns marker icons
var redIcon = createLeafIcon("https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png");
orangeIcon = createLeafIcon("https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png");
yellowIcon = createLeafIcon("https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png");
greenIcon = createLeafIcon("https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png");
blueIcon = createLeafIcon("https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png");
purpleIcon = createLeafIcon("https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png");
greyIcon = createLeafIcon("https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-grey.png");
blackIcon = createLeafIcon("https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-black.png");

// Read markers and popup data from CSV file
$.get('jobdata.csv', function (csvString) {
    // Use PapaParse to convert string to array of objects
    var data = Papa.parse(csvString, { header: true, dynamicTyping: true }).data;

    // crerates a marker for each row item and adds it to the map
    for (var i in data) {
        var row = data[i];
        var jobid = row["Job Number"];
        var client = row["Client"];
        var location = row["Location"];
        var road = row["Road"];
        var civic = row["Civic"];
        var pid = ["PID"];
        var longitude = row["Longitude"];
        var latitude = row["Latitude"];
        var created = ["Date Created"];
        var initialFieldwork = ["Initial Fieldwork"];
        var markersSet = ["Survey Markers Set"];
        var complete = ["Final Plan Submitted"];
        var marker = L.marker([row.latitude, row.longitude], {
            icon:
                initialFieldwork === "Y"
                    ? orangeIcon
                    : markersSet === "Y" || markersSet === "NA"
                        ? yellowIcon
                        : complete === "Y"
                            ? blueIcon
                            : redIcon
        }).bindPopup(
            "Job ID: " + jobid +
            "<br>Address: " + civic + " " + road + ", " + location +
            "<br>Date Created: " + created +
            "<br><br>Notes:",
            { removable: true, editable: true })
            .addTo(map)
    }
});

/*
row.
row.
row.
row.
row.
row.
row.
row.
row.
row.
row.
row.
row.
row.
row.
row.
row.
row.
row.
row.
row.
row.
*/