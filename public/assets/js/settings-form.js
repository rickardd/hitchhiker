// Settings

(function () {
  const settingsWrapper = qs(".settings-wrapper");
  const settingsForm = qs("#settings-form");
  const settingsCloseBtn = qs(".settings-close-btn");

  function bind() {
    settingsForm.addEventListener("submit", onSubmit);
    settingsCloseBtn.addEventListener("click", onClose);
  }

  function onClose(e) {
    e.preventDefault();
    settingsWrapper.classList.add("is-closed");
  }

  function onSubmit(e) {
    e.preventDefault();
    const name = qs("#settings-input-name").value;
    const lat = qs("#settings-input-current-location-lat").value;
    const long = qs("#settings-input-current-location-long").value;
    const destAddress = qs("#settings-input-destination-address").value;
    const userType = getRadioValue("user-type");
    const availableSeats = qs("#settings-input-available-seats").value;
    const message = qs("#settings-input-message").value;

    // saveSettings(
    //   name,
    //   lat,
    //   long,
    //   destAddress,
    //   car,
    //   passenger,
    //   availableSeats,
    //   message
    // );

    submitSettings(
      name,
      lat,
      long,
      destAddress,
      userType,
      availableSeats,
      message
    );
  }

  const getRadioValue = (name) => {
    const type = selectorByName(name);
    const checked = [...type].find((item) => item.checked);
    return checked ? checked.value : false;
  };

  // const saveSettings = () => {};

  const submitSettings = (...values) => {
    console.log(values);
    wsSend({ handle: "settings", values }, false);
  };

  if (settingsForm) {
    bind();
  }
})();
