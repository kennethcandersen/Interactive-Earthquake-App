# Interactive Earthquake App Using Leaflet

<a href="https://github.com/kennethcandersen/leaflet-challenge/blob/main/app_screenshot2.png" target="_blank"><img width="900" alt="Final Graphic Screenshot" src="https://github.com/kennethcandersen/leaflet-challenge/blob/main/app_screenshot2.png"></a>

**EXECUTIVE SUMMARY**

This map allows users to see earthquakes detected in the last 7 days by the USGS. 

See it live [here](hhttps://kennethcandersen.github.io/leaflet-challenge/): https://kennethcandersen.github.io/leaflet-challenge/

**REPOSITORY NAVIGATION**

* [*Index file with HTML code*](https://github.com/kennethcandersen/leaflet-challenge/blob/main/index.html) sets up the map's structure online. 
* [*JS file with Javascript code*](https://github.com/kennethcandersen/leaflet-challenge/blob/main/static/js/logic.js) retrieves geojson data, processes it, creates data visualization plot with multiple axes using D3 and Leaflet, and inserts the plots into the HTML code (see Steps section below for more detail). 

**OBJECTIVE**

Create an interactive map that users to dynamically explore the latest earthquake data and the visual correlation with plate tectonic fault lines.


**STEPS, TOOLS & LANGUAGES USED**

1. Create the structure in HTML.
2. Create and test the JS file that does the following:
  - Accesses geojson data from the USGS website at [http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).  
  - Uses D3 to set up the map and create event listeners to display data when the mouse clicks on a data label. 
  - Uses Leaflet to format the markers, multiple layers, overlays, legend and control menu.


=======


