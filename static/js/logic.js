// EARTHQUAKES LAYER
// ===================================================

// Store our API endpoint inside queryUrl
var quakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson";

function getColor(d) {
  return d > 90 ? '#d73027' :
          d > 70  ? '#fc8d59' :
          d > 50   ? '#fee08b' :
          d > 30   ? '#d9ef8b' :
          d > -10   ? '#91cf60' :
                    '#1a9850';
}

// Perform a GET request to the query URL
d3.json(quakeUrl).then(function (quakes) {
  // Once we get a response, send the data.features object to the createFeatures function

  createFeatures(quakes.features);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.place +
      "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {

    pointToLayer: function (feature, latlng) {
      return new L.CircleMarker(latlng, {
        weight: 1,
        color: '#000',
        fillOpacity: .5,
        fillColor: getColor(feature.geometry.coordinates[2]),
        radius: feature.properties.mag * 5,
      });
    },
    onEachFeature: onEachFeature
  });


  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}


function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
  });

  var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "outdoors-v11",
    accessToken: API_KEY
  });



  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Satellite": satellite,
    "Grayscale": grayscale,
    "Outdoors": outdoors
  };
  
  var plates = new L.LayerGroup();
  d3.json("static/data/plate_boundaries.geojson").then(function (data) {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
      color:'#d73027',
      weight: 1

    })
    
    .addTo(plates);
  });

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Earthquakes: earthquakes,
    'Tectonic Plates': plates
  };


  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      19.4326, -99.1332
    ],
    zoom: 3,
    layers: [satellite, earthquakes, plates]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Plug Legend in here (legend.onAdd)

  var legend = new L.control({position: 'bottomright'});

legend.onAdd = function (map) {

  var div = L.DomUtil.create('div', 'info legend'),
      grades = [0, 100, 200, 300, 400, 500, 600, 700],
      labels = [];


  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
          '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
  };

  legend.addTo(myMap);

};


