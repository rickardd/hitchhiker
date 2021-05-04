let user = {}; // could be a class

settingsForm = (function () {
  // could be a class
  const settingsWrapper = qs(".settings-wrapper");
  const settingsForm = qs("#settings-form");
  const settingsCloseBtn = qs(".settings-close-btn");

  const nameEl = qs("#settings-input-name");
  const latEl = qs("#settings-input-current-location-lat");
  const longEl = qs("#settings-input-current-location-long");
  const destAddressEl = qs("#settings-input-destination-address");
  const availableSeatsEl = qs("#settings-input-available-seats");
  const messageEl = qs("#settings-input-message");

  function bind() {
    settingsForm.addEventListener("submit", onSubmit);
    settingsCloseBtn.addEventListener("click", onClose);
  }

  function onClose(e) {
    e.preventDefault();
    settingsWrapper.classList.add("is-closed");
  }

  function getValues() {
    return {
      name: nameEl.value,
      lat: latEl.value,
      long: longEl.value,
      destAddress: destAddressEl.value,
      userType: getRadioValue("user-type"),
      availableSeats: availableSeatsEl.value,
      message: messageEl.value,
    };
  }

  function onSubmit(e) {
    e.preventDefault();
    user = getValues();
    submitSettings();
  }

  const getRadioValue = (name) => {
    const type = selectorByName(name);
    const checked = [...type].find((item) => item.checked);
    return checked ? checked.value : false;
  };

  const submitSettings = () => {
    console.log(user);

    wsSend(
      {
        handle: "settings",
        values: [
          user.name,
          user.lat,
          user.long,
          user.destAddress,
          user.userType,
          user.availableSeats,
          user.message,
        ],
      },
      false
    );
  };

  function _populateCoordinates(lat, lng) {
    latEl.value = lat;
    longEl.value = lng;
  }

  if (settingsForm) {
    bind();
  }

  return {
    populateCoordinates: function (lat, lng) {
      _populateCoordinates(lat, lng);
    },
  };
})();
