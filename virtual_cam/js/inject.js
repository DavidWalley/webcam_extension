"use strict";
const script1 = document.createElement("script");
script1.setAttribute("type", "text/javascript");
/*PRO*/ script1.setAttribute(
  "src",
  window["chrome"]["runtime"]["getURL"]("js/injected.js")
);
const head =
  document.head ||
  document.getElementsByTagName("head")[0] ||
  document.documentElement;
head.insertBefore(script1, head.lastChild);
window["chrome"]["runtime.onMessage"]["addListener"](function (a) {
  console.log(a);
});
