"use strict";
const scriptWebcam = document.createElement("script");
scriptWebcam.setAttribute("type", "text/javascript");
/*PRO*/ scriptWebcam.setAttribute(
  "src",
  window["chrome"]["runtime"]["getURL"]("js/webcam.js")
);
const head =
  document.head ||
  document.getElementsByTagName("head")[0] ||
  document.documentElement;
head.insertBefore(scriptWebcam, head.lastChild);
window["chrome"]["runtime"]["onMessage"]["addListener"](function (a) {
  console.log(a);
});
window["chrome"]["runtime"]["openOptionsPage"]();
