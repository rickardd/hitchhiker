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
    lat,
    long,
    destAddress,
    userType,
    availableSeats,
    message,
  };
}
