import { MAP_LAT, MAP_LNG, USER_MARKER_LAT, USER_MARKER_LNG, USER_MARKER_SETTING, ZOOM_MAP } from './constants.js';
import { formFilters, announcementForm, inputAddress, toggleVisibleForm } from './validation.js';

const enableFormParameter = false;


const setStartingLocation = (lat, lng) => `${lat}, ${lng}`;

inputAddress.value = setStartingLocation(USER_MARKER_LAT, USER_MARKER_LNG);
const myMap = L.map('mapid')
  .on('load', () => {
    toggleVisibleForm(announcementForm, enableFormParameter);
    toggleVisibleForm(formFilters, enableFormParameter);
  })
  .setView([MAP_LAT, MAP_LNG], ZOOM_MAP);
L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWthbHlnaG5paSIsImEiOiJja3BtaGdyYzIwZmh5Mm9tZXVuamZ6cGJvIn0.BCZrDM9bJwrbOYzVqxDZjw', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 12,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'your.mapbox.access.token',
}).addTo(myMap);

const userMarkerIcon = L.icon({
  iconUrl: USER_MARKER_SETTING.url,
  iconSize: USER_MARKER_SETTING.size,
  iconAnchor: USER_MARKER_SETTING.anchor,
});

const userMarker = L.marker([USER_MARKER_LAT, USER_MARKER_LNG], {icon: userMarkerIcon, draggable: true}).addTo(myMap);

userMarker.on('moveend', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  inputAddress.value = setStartingLocation(lat, lng);
});

export {myMap, userMarker, setStartingLocation};
