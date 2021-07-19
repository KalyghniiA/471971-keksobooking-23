import { USER_MARKER_LAT, USER_MARKER_LNG, MAIN_MARKER_SETTING } from './constants.js';
import { inputAddress } from './validation.js';
const MAP_MAX_ZOOM = 12;
const MAP_LAYER = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWthbHlnaG5paSIsImEiOiJja3BtaGdyYzIwZmh5Mm9tZXVuamZ6cGJvIn0.BCZrDM9bJwrbOYzVqxDZjw';
const MAP_ATTRIBUTION = 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
const MAP_ID = 'mapbox/streets-v11';
const MAP_TILE_SIZE = 512;
const MAP_ZOOM_OFFSET = -1;
const MAP_ACCESS_TOKEN = 'your.mapbox.access.token';


const setStartingLocation = (lat, lng) => `${lat.toFixed(5)}, ${lng.toFixed(5)}`;

inputAddress.value = setStartingLocation(USER_MARKER_LAT, USER_MARKER_LNG);
const myMap = L.map('mapid');
L.tileLayer(MAP_LAYER, {
  attribution: MAP_ATTRIBUTION,
  maxZoom: MAP_MAX_ZOOM,
  id: MAP_ID,
  tileSize: MAP_TILE_SIZE,
  zoomOffset: MAP_ZOOM_OFFSET,
  accessToken: MAP_ACCESS_TOKEN,
}).addTo(myMap);

const userMarkerIcon = L.icon({
  iconUrl: MAIN_MARKER_SETTING.url,
  iconSize: MAIN_MARKER_SETTING.size,
  iconAnchor: MAIN_MARKER_SETTING.anchor,
});

const userMarker = L.marker([USER_MARKER_LAT, USER_MARKER_LNG], {icon: userMarkerIcon, draggable: true}).addTo(myMap);

userMarker.on('move', (evt) => {
  const {lat, lng} = evt.target.getLatLng();
  inputAddress.value = setStartingLocation(lat, lng);
});


export {myMap, userMarker, setStartingLocation};
