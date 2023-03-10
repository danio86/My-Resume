
function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: {
            lat: 46.619261,
            lng: -33.134766
        }
    });

var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

var locations = [
    /* 48.19287707855574, 16.360284090587925 */
    /* 48.21451901859873, 16.413065648018794 */
    /* 47.27939382362871, 11.396529626500817 */
    {lat: 48.21325, lng: 16.41339},
    {lat: 48.192501, lng: 16.360455},
    {lat: 47.27939382362871, lng: 11.396529626500817}
];
/* a list with objects */
var markers = locations.map(function(location, i) {
    /* this a js - map method. Its like a forEach function*/
    /* i is the current index of the locations array */
    return new google.maps.Marker({
        position: location,
        label: labels[i  % labels.length]
        /* The reason for using the %operator is so that if we have more than 26 locations, then it will 
        loop around to the start of our string again and go from Z back to A, instead of throwing an error.
        It can jaus be A, B, or C in this case */
    })
});
    // Add a marker clusterer to manage the markers.
var markerCluster = new MarkerClusterer(map, markers, 
{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
/* the cluster link below */
}