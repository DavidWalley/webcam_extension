"use strict";
const script0 = document.createElement("script");
script0.setAttribute("type", "text/javascript");
script0.setAttribute(
  "src",
  window["chrome"]["runtime"]["getURL"]("js/data.js")
);
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
head.insertBefore(script0, head.lastChild);
head.insertBefore(script1, head.lastChild);
