let map;
const myLatLng = { lat: 34.063380, lng: -118.358080 }

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: myLatLng,
    zoom: 8,
  });
  createMarker();
}

const createMarker = () => {
  new google.maps.Marker({
    position: myLatLng,
    map
  });
}