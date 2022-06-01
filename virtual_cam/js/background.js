console.log("hello from daves background");

chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    switch (request.greeting) {
    case "maprender"):
      alert("reached here sendin resp"+request.name);
      Addr_details.place = request.name;
      sendResponse({farewell: "goodbye"});
      break;
    case "retrieveAddr":
      sendResponse({addr: Addr_details});   

    default:
      sendResponse({}); // snub them.
  });
});

//End of file.