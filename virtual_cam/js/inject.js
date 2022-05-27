"use strict";
const script = document.createElement("script");
script.setAttribute("type", "text/javascript");
/*PRO*/ script.setAttribute(
  "src",
  window["chrome"]["runtime"]["getURL"]("js/injected.js")
);
const head =
  document.head ||
  document.getElementsByTagName("head")[0] ||
  document.documentElement;
head.insertBefore(script, head.lastChild);
