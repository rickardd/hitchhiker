// MAP

let map, markerCar, markerPassenger;
const markers = [];

function initMap() {
  addMap();
  // addMarker("passenger", -41.329084, 174.775516);
  // addMarker("car", -41.286173, 174.766383);
}

function getImageUrl(type) {
  if (type === "car") {
    return "http://cstwiki.wtb.tue.nl/images/thumb/Cat.png/634px-Cat.png";
  }
  if (type === "passenger") {
    return "http://pngimg.com/uploads/dog/dog_PNG50348.png";
  }
}

function addMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -41.292125, lng: 174.76207 },
    zoom: 13,
  });
}

function addMarker(type, lat, lng, data) {
  let marker = new google.maps.Marker({
    position: { lat, lng },
    map: map,
    icon: {
      url: getImageUrl(type),
      scaledSize: new google.maps.Size(50, 50), // scaled size
    },
  });

  marker.data = data;
  markers.push(marker);

  console.log(markers);
}

function findMarkerByName(name) {
  return markers.find((m) => m.data.name === name);
}

function updateMarker(data) {
  marker = findMarkerByName(data.name);
  debugger;
  if (marker) {
    if (data.lat && data.long) {
      marker.setPosition(new google.maps.LatLng(data.lat, data.long));
      return;
    }
    console.warn("No lat long was given");
  }
}

function addOrUpdateMarker(data) {
  // Find maker with id = data.name
  const marker = findMarkerByName(data.name);
  // If no marker found add new
  if (!marker) {
    addMarker(data.userType, -41.322237, 174.766147, data);
    console.log("add marker");
    return;
  }
  // Else update marker position and other data.
  console.log("update marker");
  updateMarker(data);
}

function onSettingsMessage(data) {
  addOrUpdateMarker(data);
}

setTimeout(() => {
  initMap();
}, 1000);
