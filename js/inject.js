(function(){var a = document.createElement("script");
a.setAttribute("type", "text/javascript");
a.setAttribute("src", window.chrome.runtime.getURL("js/injected.js"));
var b = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
b.insertBefore(a, b.lastChild);
})();
