import React, { Component } from 'react';
import L from 'leaflet';
import API from '../../modules/Data'
import GovData from '../../modules/GovData'

const dummyDataPath = [
  [36.134842046153565, -86.75954818725587],
  [36.1339408866672, -86.75899028778078],
  [36.13009351246281, -86.75499916076662],
  [36.12957358256369, -86.75461292266846]
];


let customIcon= L.icon({
  iconUrl: 'custommarker.png',
  shadowUrl: 'marker-shadow.png',

  iconSize: [38, 95], // size of the icon
  shadowSize: [50, 64], // size of the shadow
  // iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  // shadowAnchor: [4, 62],  // the same for the shadow
  // popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
})
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
        console.log("RACK ON MAPS PAGE FROM GET ALL RACKS", rack)
        //take each rack and add the information to a popup
        //, {icon: customIcon} for custom icon
        L.marker([rack.latitude, rack.longitude])
          .bindPopup(
            `${rack.imageUrl}
            Name: ${rack.establishmentName}<br>
            Type: ${rack.establishmentType.establishmentType}<br>
            Address: ${rack.address} <br>
            Capacity: ${rack.capacity} <br>
            Comments: ${rack.comments}
  `
          )
          .addTo(this.map)
      })

      )//**BASE CODE FOR RENDERING TO MAP FROM LEAFLET
    //   L.marker([coords.latitude, coords.longitude])
    //     .bindPopup('This is your current <strong>location</strong>')
    //     .addTo(this.map);

    //Gets data from the external Nashville.gov API with all city-provided racks
    GovData.getData()
      .then(govRacks => govRacks.forEach(govRack => {
        // console.log(govRack)
        L.marker([govRack.the_geom.coordinates[1], govRack.the_geom.coordinates[0]])
          .bindPopup(
            `Name: ${govRack.location} <br>
        Address: ${govRack.detail_loc} <br>
        Capacity: ${govRack.capacity} <br>
        Comments: ${govRack.location}`
          )
          .addTo(this.map)
      })
      )

    //Loop through the markers array
    // for (var i=0; i<markers.length; i++) {


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