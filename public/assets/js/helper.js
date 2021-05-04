function convertSettingDataToObject(data) {
  let = [
    name,
    lat,
    long,
    destAddress,
    userType,
    availableSeats,
    message,
  ] = data.values;

  return {
    name,
    lat: parseFloat(lat),
    long: parseFloat(long),
    destAddress,
    userType,
    availableSeats,
    message,
  };
}
