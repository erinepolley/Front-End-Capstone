import React, { Component } from 'react';
import L from 'leaflet';
import API from '../modules/data'

const dummyDataPath = [
  [36.134842046153565, -86.75954818725587],
  [36.1339408866672, -86.75899028778078],
  [36.13009351246281, -86.75499916076662],
  [36.12957358256369, -86.75461292266846]
];

export default class Map extends Component {
  map = null;

  componentDidMount() {
    // create map
    this.map = L.map('map').setView([36.161716102, -86.7780876], 13);
    // 36.161716102717804 -86.77808761596681
//mapbox://styles/erinepolley/ck3hi2fxk02l71ct4aubu0eeb

    // add basemap
    L.tileLayer(
			'https://api.mapbox.com/styles/v1/erinepolley/ck3ruko0s17fs1cnu0eg7hgqh/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZXJpbmVwb2xsZXkiLCJhIjoiY2szaGg5NXlxMDJkeDNjcG9lbWhhZ2lwcyJ9.OQHXLQXUggCqa_b4pqWyZQ', 
    {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'pk.eyJ1IjoiZXJpbmVwb2xsZXkiLCJhIjoiY2szaGg5NXlxMDJkeDNjcG9lbWhhZ2lwcyJ9.OQHXLQXUggCqa_b4pqWyZQ'
    }).addTo(this.map);

  
//get map locations from JSON
API.getAllRacks()
.then(racks => racks.forEach(rack => {
  // const latitude = rack.latitude
  // const longitude = rack.longitude
  console.log(rack)
L.marker([rack.latitude, rack.longitude])
.bindPopup(`Name: ${rack.name}`)
.addTo(this.map)
  
})
  //take each rack and add the information to a popup
)
    //   L.marker([coords.latitude, coords.longitude])
    //     .bindPopup('This is your current <strong>location</strong>')
    //     .addTo(this.map);


//Loop through the markers array
// for (var i=0; i<markers.length; i++) {
 
//   var lon = markers[i][0];
//   var lat = markers[i][1];
//   var popupText = markers[i][2];
  
//    var markerLocation = new L.LatLng(lat, lon);
//    var marker = new L.Marker(markerLocation);
//    map.addLayer(marker);

//    marker.bindPopup(popupText);

// }
    // navigator.geolocation.getCurrentPosition(position => {
    //   const coords = position.coords;
    //   this.map.setView([coords.latitude, coords.longitude], 16);

    //   L.marker([coords.latitude, coords.longitude])
    //     .bindPopup('This is your current <strong>location</strong>')
    //     .addTo(this.map);
    // });

    // log user clicks
    this.map.on('click', event => {
      const lat = event.latlng.lat
      const lng = event.latlng.lng;
      console.log(lat, lng);
    });

    L.polyline(dummyDataPath)
      .addTo(this.map);
  }

  render() {
    return (
      <React.Fragment>
        <div id="map"></div>
      </React.Fragment>
    )
  }
}