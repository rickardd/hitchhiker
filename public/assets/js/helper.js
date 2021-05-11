function convertSettingDataToObject(data) {
  let = [
    name,
    lat,
    long,
    destAddress,
    destLat,
    destLong,
    userType,
    availableSeats,
    message,
  ] = data.values;

  return {
    name,
    lat: parseFloat(lat),
    long: parseFloat(long),
    destAddress,
    destLat: parseFloat(destLat),
    destLong: parseFloat(destLong),
    userType,
    availableSeats,
    message,
  };
}
