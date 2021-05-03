$("#input-form").on("submit", function (event) {
  event.preventDefault();
  var name = $("#input-handle")[0].value;
  var text = $("#input-text")[0].value;
  // ws.send(JSON.stringify({ handle: handle, text: text }));
  wsSend({ handle: name, text });
  $("#input-text")[0].value = "";
});

function onChatMessage(data) {
  $("#chat-text").prepend(
    "<div class='panel panel-default'><div class='panel-heading'>" +
      data.handle +
      "</div><div class='panel-body'>" +
      data.text +
      "</div></div>"
  );

  $("#chat-text").stop().animate(
    {
      scrollTop: 0,
    },
    800
  );
}
