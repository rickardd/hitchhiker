let map, markerCar, markerPassenger, infoWindow;
const markers = [];

function initMap() {
  addMap();

  addInfoWindow();

  map.addListener("click", mapOnClick);
}

function mapOnClick(mapsMouseEvent) {
  // infoWindow.close();

  // infoWindow = new google.maps.InfoWindow({
  //   position: mapsMouseEvent.latLng,
  // });
  // infoWindow.setContent(
  //   JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
  // );
  // infoWindow.open(map);

  const lat = mapsMouseEvent.latLng.lat();
  const lng = mapsMouseEvent.latLng.lng();
  settingsForm.populateCoordinates(lat, lng);
}

function addInfoWindow() {
  infoWindow = new google.maps.InfoWindow({
    content: "Click the map to get Lat/Lng!",
    position: { lat: -41.30857, lng: 174.806294 },
  });
}

function getImageUrl(type) {
  if (type === "car") {
    return "http://cstwiki.wtb.tue.nl/images/thumb/Cat.png/634px-Cat.png";
  }
  if (type === "passenger") {
    return "http://pngimg.com/uploads/dog/dog_PNG50348.png";
  }
  if (type === "destination") {
    return "https://image.pngaaa.com/496/1433496-middle.png";
  }
}

function addMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -41.292125, lng: 174.76207 },
    zoom: 13,
  });
}

function addMarker(type, lat, lng, data) {
  lat = parseFloat(lat);
  lng = parseFloat(lng);

  let imageSizeX = 50;
  let imageSizeY = 50;

  if (type === "destination") {
    imageSizeX = 512 / 10;
    imageSizeY = 384 / 10;
    lat = parseFloat(destLat);
    lng = parseFloat(destLong);
  }

  let marker = new google.maps.Marker({
    position: { lat, lng },
    map: map,
    icon: {
      url: getImageUrl(type),
      scaledSize: new google.maps.Size(imageSizeX, imageSizeY), // scaled size
    },
  });

  marker.data = data;
  markers.push(marker);
  bindMarkerEvents();
}

function getWindowContent(data) {
  if (data.userType === "car") {
    return `
        <p>
        <b>${user.name}'s</b> ${user.userType} has ${user.availableSeats} available seats to <b>${user.destAddress}</b>
        </p>
        <p>
          - ${user.message}
        </p>
        `;
  }

  if (data.userType === "passenger") {
    return `
        <p>
        <b>${user.name}</b> wants to go to <b>${user.destAddress}</b>
        </p>
        <p>
          - ${user.message}
        </p>
        `;
  }
}

function bindMarkerEvents() {
  markers.forEach((marker) => {
    marker.addListener("click", function () {
      infoWindow.setContent(getWindowContent(marker.data));
      infoWindow.open(map, marker);
    });
  });
}

function findMarkerByName(name) {
  return markers.find((m) => m.data.name === name);
}

function updateMarker(data) {
  marker = findMarkerByName(data.name);
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
    addMarker(data.userType, data.lat, data.long, data);

    if (data.destAddress && data.destLat && data.destLong) {
      addMarker("destination", data.destLat, data.destLong, data);
    }
    return;
  }
  // Else update marker position and other data.
  updateMarker(data);
}

function onSettingsMessage(data) {
  addOrUpdateMarker(data);
}

setTimeout(() => {
  initMap();
}, 1000);
