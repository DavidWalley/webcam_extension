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
var $_sIDdIVcROP_CORNER_TL = "divCrop_CORNER_TL";
var $_sIDdIVcROP_CORNER_TR = "divCrop_CORNER_TR";
var $_sIDdIVcROP_CORNER_BR = "divCrop_CORNER_BR";
var $_sIDdIVcROP_CORNER_BL = "divCrop_CORNER_BL";
var $_sIDdIVcROP_CORNER_MD = "divCrop_CORNER_MD";
var $_sIDdIVcONFIRM = "divConfirm";
var $_sIDcANVAScONFIRM = "canvasConfirm";
var $_sIDbUTTONcONFIRMoK = "buttonConfirmOk";
var $_sIDbUTTONcONFIRMnO = "buttonConfirmNo";
var $_sIDdIVfLAGbEFORE = "divFlagBefore";
var $_sIDdIVfLAGnEXT = "divFlagNext";
var $_sMESSAGE_TEXT_T = "sMessage_text_T";
var $_sMESSAGE_TEXT_L = "sMessage_text_L";
var $_sMESSAGE_TEXT_R = "sMessage_text_R";
var $_sMESSAGE_TEXT_N = "sMessage_text_N";
var $_sIDiNtEXTeDGE_T = "intextEdge_T";
var $_sIDiNtEXTeDGE_L = "intextEdge_L";
var $_sIDiNtEXTeDGE_R = "intextEdge_R";
var $_sIDbUTTONsHOWeDGES = "buttonEdges";
var $_sIDiNtEXTnEWS = "intextNews";
var $_sIDbUTTONsHOWnEWS = "buttonNews";
var $_sIDdIVsHAREDtALK = "divEasyMeeting_SharedTalk";
var $_sATTRIBUTE_INSERTcODE2 = "g_attribute_insertcode2";
var $_sATTRIBUTE_GOoPTIONS = "g_attribute_gooptions";
var $_sRUNTIMEaCT_GOoPTIONS = "g_action_gooptions";
var $_sMESSAGE_TYPE_js_opts = "js_opts";
var $_sMESSAGE_TYPE_js_edge = "js_edge";
var $_sMESSAGE_TYPE_js_news = "js_news";
var $_sMESSAGE_TYPE_datau_B = "datau_B";
var $_sMESSAGE_TYPE_datau_F = "datau_F";

function InsertScript(a_sFile) { // Inject a script into the DOM of the 3rd-party page.
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

InsertScript("js/p_webcam1.js"); // Add the first part of our code to the 3rd-party page.
//# Add an invisible div to the 3rd-party page to enable transmission of data from this script to the injected scripts.
const body =
  document.body ||
  document.getElementsByTagName("body")[0] ||
  document.documentElement;
const g_eleDivInjectData = document.createElement("div");
g_eleDivInjectData.id = $_sIDdIVsHAREDtALK;
g_eleDivInjectData.style.display = "none";
g_eleDivInjectData.style.backgroundColor = "#FFCC80";
g_eleDivInjectData.innerText = "";
body.insertBefore(g_eleDivInjectData, body.lastChild);
window["chrome"]["runtime"]["onMessage"]["addListener"](
  // Listen for message from options page, transmit to injected code via invisible div.
  function (message, sender, sendResponse) {
    if (
      $_sMESSAGE_TYPE_js_opts === message.type ||
      $_sMESSAGE_TYPE_js_edge === message.type ||
      $_sMESSAGE_TYPE_js_news === message.type ||
      $_sMESSAGE_TYPE_datau_B === message.type ||
      $_sMESSAGE_TYPE_datau_F === message.type
    ) {
      var aattributes = g_eleDivInjectData.attributes;
      for (var i = aattributes.length; 0 < i; ) {
        i--;
        if ($_sATTRIBUTE_INSERTcODE2 === aattributes[i].name) {
          // Presence of this attribute name indicates that page is actively using video feed, and has loaded bulk of this extension's code.
          g_eleDivInjectData.innerText = message.type + "/" + message.data;
          break;
        }
      }
    }
  }
);
let g_bMoreLoaded = false;

function onMutatedDiv_Hark( // Message from background.js. Possibly open Options page, or, inject 2nd file of code into 3rd-party page. Callback function executed when mutations of invisible div are observed (indicating a message from the options page). ###message
  a_mutationList, // List of mutations given by MutationObserver.
  a_observer
) {
  for (const m of a_mutationList) {
    if (m.type === "attributes") {
      if ($_sATTRIBUTE_GOoPTIONS === m.attributeName) {
        try {
          window["chrome"]["runtime"]["sendMessage"]({
            action: $_sRUNTIMEaCT_GOoPTIONS,
          });
        } catch (e) {
          console.log("Unable to send message to background service worker.");
        }
      } else if ($_sATTRIBUTE_INSERTcODE2 === m.attributeName) {
        if (!g_bMoreLoaded) {
          g_bMoreLoaded = true;
          InsertScript("js/p_webcam2.js");
        }
      }
    }
  }
}

const observer = new MutationObserver(onMutatedDiv_Hark); // Create an observer instance linked to the callback function, which is passed a list of mutations.
observer.observe(g_eleDivInjectData, { attributes: true });
