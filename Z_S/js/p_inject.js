//# Inject a script into all pages running in Chrome (as in manifest.json extension file).   (c)2022 David C. Walley.
"use strict";

function G_ele(a) { // Code convenience.
  return document.getElementById(a);
}

function G_nMOD( // Correction to JavaScript's so-called modulus operation (JS has negative remainders).
  a_n, // Number.
  a_nModulus // Modulus to use.
) {
  return ((a_n % a_nModulus) + a_nModulus) % a_nModulus;
}

//# Globals shared among files and languages:
var $_sTITLE = "Easy Meeting Webcam Plus";
var $_sLINK = "davidwalley.ca/webcam";
var $_sIDrANGEzOOM = "inrangeZoom";
var $_sIDrANGEsIZE = "inrangeSize";
var $_sIDrANGEbRIGHT = "inrangeBright";
var $_sIDrANGEcONTRAST = "inrangeContrast";
var $_sOPTIONzOOM = "optZoom";
var $_sOPTIONsIZE = "optSize";
var $_sOPTIONbRIGHT = "optBright";
var $_sOPTIONcONTRAST = "optContrast";
var $_sOPTIONfLAG = "optFlag";
var $_sIDbUTTONgRABgO = "buttonGrabGo";
var $_sIDbUTTONsANPsHOT_B = "buttonSnapshot_B";
var $_sIDbUTTONsANPsHOT_F = "buttonSnapshot_F";
var $_sIDdIVhOLD = "divHold";
var $_sIDvIDEOgRAB = "videoGrab";
var $_sIDdIVcROP_ = "divCrop_";
var $_sIDdIVcONFIRM = "divConfirm";
var $_sIDcANVAScONFIRM = "canvasConfirm";
var $_sIDbUTTONcONFIRMoK = "buttonConfirmOk";
var $_sIDbUTTONcONFIRMnO = "buttonConfirmNo";
var $_sIDdIVfLAGbEFORE = "divFlagBefore";
var $_sIDdIVfLAGnEXT = "divFlagNext";
var $_sIDiNtEXTeDGE_T = "intextEdge_T";
var $_sIDiNtEXTeDGE_L = "intextEdge_L";
var $_sIDiNtEXTeDGE_R = "intextEdge_R";
var $_sIDbUTTONsHOWeDGES = "buttonEdges";
var $_sIDiNtEXTnEWS = "intextNews";
var $_sIDbUTTONsHOWnEWS = "buttonNews";
var $_sELEvIDEOiN = "g_eleVideoIn";
var $_sELEcANVASoUT = "g_eleCanvasOut";
var $_sCONTEXT2DoUT = "g_context2dOut";
var $_sIDdIVfLAGdATA = "divEasyMeetingVirtual_data";
var $_sATTRIBUTE_OPTIONS = "g_optionsmessage";
var $_sATTRIBUTE_OPEN = "g_optionsopen";

function AddScript(a_sFile) { // Inject a script into the DOM of the 3rd-party page.
  const scriptWebcam = document.createElement("script");
  scriptWebcam.setAttribute("type", "text/javascript");
  scriptWebcam.setAttribute(
    "src",
    window["chrome"]["runtime"]["getURL"](a_sFile)
  );
  const head =
    document.head ||
    document.getElementsByTagName("head")[0] ||
    document.documentElement;
  head.insertBefore(scriptWebcam, head.lastChild);
}

AddScript("js/p_webcam1.js"); // Add the first part of our code to the 3rd-party page.
//# Add an invisible div to the 3rd-party page to enable transmission of data from this script to the injected scripts.
const body =
  document.body ||
  document.getElementsByTagName("body")[0] ||
  document.documentElement;
const g_eleDivInjectData = document.createElement("div");
g_eleDivInjectData.id = $_sIDdIVfLAGdATA;
g_eleDivInjectData.style.display = "none";
g_eleDivInjectData.style.backgroundColor = "#FFCC80";
g_eleDivInjectData.innerText = "";
body.insertBefore(g_eleDivInjectData, body.lastChild);
window["chrome"]["runtime"]["onMessage"]["addListener"](
  // Listen for message from options page, transmit to injected code via invisible div.
  function (message, sender, sendResponse) {
    if (
      "js_opts" === message.type ||
      "js_edge" === message.type ||
      "js_news" === message.type ||
      "datau_B" === message.type ||
      "datau_F" === message.type
    ) {
      var aattributes = g_eleDivInjectData.attributes;
      for (var i = aattributes.length; 0 < i; ) {
        i--;
        if ($_sATTRIBUTE_OPTIONS === aattributes[i].name) {
          // Presence of this attribute name indicates that page is actively using video feed, and has loaded bulk of this extension's code.
          g_eleDivInjectData.innerText = message.type + "/" + message.data;
          break;
        }
      }
    }
  }
);
let g_bMoreLoaded = false;

function onMutatedDivDataFromOptions( // Callback function executed when mutations of invisible div are observed (indicating a message from the options page).
  a_mutationList, // List of mutations given by MutationObserver.
  a_observer
) {
  for (const m of a_mutationList) {
    if (m.type === "attributes") {
      if ($_sATTRIBUTE_OPEN === m.attributeName) {
        window["chrome"]["runtime"]["sendMessage"]({
          action: "openOptionsPage",
        });
      } else if ($_sATTRIBUTE_OPTIONS === m.attributeName) {
        if (!g_bMoreLoaded) {
          g_bMoreLoaded = true;
          AddScript("js/p_webcam2.js");
        }
      }
    }
  }
}

const observer = new MutationObserver(onMutatedDivDataFromOptions); // Create an observer instance linked to the callback function, which is passed a list of mutations.
observer.observe(g_eleDivInjectData, { attributes: true });
