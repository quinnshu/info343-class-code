/*
    script file for index.html
    dependencies: leaflet, jquery

    Open Street Maps tile layer URL template:
    http://{s}.tile.osm.org/{z}/{x}/{y}.png

    attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
*/

$(function() {
'use strict'


    function createMap(loc, zoom) {
        var map = L.map('map').setView(loc, zoom);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.circleMarker(loc).addTo(map).bindPopup('<h2>Hello!</h2>');

    }

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(pos) {
            createMap([pos.coords.latitude, pos.coords.longitude], 17);
        });
    } else {
        createMap([47.6550252, -122.3087066], 17);
    }
});

//use json get camera data
//iterate over array, create object, add marker per camera
//adjust color by camera property
// bindpopup can be any html, and can style it, img tag with picture requested from server
// animations