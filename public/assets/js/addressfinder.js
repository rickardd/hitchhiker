var destinationLat = null;
var destinationLng = null;
var destinationAddress = null;

(function () {
  var widget,
    initAddressFinder = function () {
      widget = new AddressFinder.Widget(
        document.getElementById("destination-address"),
        "ADDRESSFINDER_DEMO_KEY",
        "NZ",
        {
          address_params: {
            post_box: "0",
            region_code: "F",
          },
          show_locations: true,
          show_points_of_interest: true,
          show_nearby: true,
          empty_content:
            "No addresses were found. This could be a new address, or you may need to check the spelling. Learn more",
        }
      );

      widget.on("result:select", function (fullAddress, metaData) {
        document.getElementById("destination-address").value = fullAddress;
        settingsForm.populateDestination(
          metaData.postal_line_1,
          metaData.y,
          metaData.x
        );
      });
    };

  function downloadAddressFinder() {
    var script = document.createElement("script");
    script.src = "https://api.addressfinder.io/assets/v3/widget.js";
    script.async = true;
    script.onload = initAddressFinder;
    document.body.appendChild(script);
  }

  document.addEventListener("DOMContentLoaded", downloadAddressFinder);
})();
