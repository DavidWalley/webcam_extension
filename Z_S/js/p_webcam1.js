//# First (minimal) script loaded for selecting a camera, possibly leading to loading of bulk of JS scropt. (c)2022 David C. Walley.
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
var g_eleVideoIn = g_eleVideoIn || window[$_sELEvIDEOiN];
g_eleVideoIn = null;
var g_eleCanvasOut = g_eleCanvasOut || window[$_sELEcANVASoUT];
g_eleCanvasOut = null;
var g_bStopTick = g_bStopTick || window["g_bStopTick"];
g_bStopTick = false;
var g_bVideoReady = g_bVideoReady || window["g_bVideoReady"];
g_bVideoReady = false;

async function Go_ModifyMediaDevices_EnumerateDevices() { // Locally redefine system function to get list of media devices (cameras and microphones).
  if ("undefined" === typeof MediaDevices) {
    console.log("what 1");
    return [];
  }
  const enumerateDevicesWas = MediaDevices["prototype"]["enumerateDevices"];
  MediaDevices["prototype"][
    "enumerateDevices"
  ] = async function () // Redefine this system function locally, to include the virtual camera.
  {
    document
      .getElementById($_sIDdIVfLAGdATA)
      .setAttribute($_sATTRIBUTE_OPTIONS, "1");
    const r = await enumerateDevicesWas.call(navigator.mediaDevices);
    r.push(
      /** @type {!MediaDeviceInfo|!undefined} */ ({
        deviceId: "virtual0",
        groupID: "v0",
        kind: "videoinput",
        label: $_sTITLE + " Lo-res",
      })
    );
    r.push(
      /** @type {!MediaDeviceInfo|!undefined} */ ({
        deviceId: "virtual1",
        groupID: "v0",
        kind: "videoinput",
        label: $_sTITLE + " Mid-res",
      })
    );
    r.push(
      /** @type {!MediaDeviceInfo|!undefined} */ ({
        deviceId: "virtual2",
        groupID: "v0",
        kind: "videoinput",
        label: $_sTITLE + " Hi-res",
      })
    );
    return r;
  };
}

async function Go_ModifyMediaDevices_GetUserMedia() { // Locally redefine system function to get handle to a camera.
  if ("undefined" === typeof MediaDevices) {
    console.log("what? 2");
    return [];
  }
  const getUserMediaWas = MediaDevices.prototype.getUserMedia;
  MediaDevices["prototype"][
    "getUserMedia"
  ] = async function () // Redefine this system function locally, to include the virtual camera.
  {
    document
      .getElementById($_sIDdIVfLAGdATA)
      .setAttribute($_sATTRIBUTE_OPTIONS, "2");
    var sId = "";
    const obArguments = arguments;
    if (
      obArguments.length &&
      obArguments[0].video &&
      obArguments[0].video.deviceId
    ) {
      if ("virtual0" === obArguments[0].video.deviceId) {
        sId = "virtual0";
      } else if ("virtual0" === obArguments[0].video.deviceId.exact) {
        sId = "virtual0";
      } else if ("virtual1" === obArguments[0].video.deviceId) {
        sId = "virtual1";
      } else if ("virtual1" === obArguments[0].video.deviceId.exact) {
        sId = "virtual1";
      } else if ("virtual2" === obArguments[0].video.deviceId) {
        sId = "virtual2";
      } else if ("virtual2" === obArguments[0].video.deviceId.exact) {
        sId = "virtual2";
      }
    }
    if ("" === sId) {
      return await getUserMediaWas.call(navigator.mediaDevices, ...arguments);
    }
    const usermediaCamera = await getUserMediaWas.call(navigator.mediaDevices, {
      video: { deviceId: sId },
      audio: false,
    });
    if (usermediaCamera) {
      g_eleVideoIn = document.createElement("video");
      g_eleVideoIn.autoplay = true;
      g_eleVideoIn.addEventListener("playing", function () {
        g_bVideoReady = true;
      });
      g_eleVideoIn.srcObject = usermediaCamera;
    }
    g_eleCanvasOut = document.createElement("canvas");
    g_bStopTick = true;
    switch (sId) {
      case "virtual1":
        g_eleCanvasOut.width = 1280;
        g_eleCanvasOut.height = 720;
        break;
      case "virtual2":
        g_eleCanvasOut.width = 1920;
        g_eleCanvasOut.height = 1080;
        break;
      default:
        g_eleCanvasOut.width = 640;
        g_eleCanvasOut.height = 360;
    }
    return g_eleCanvasOut.captureStream();
  };
}

Go_ModifyMediaDevices_EnumerateDevices();
Go_ModifyMediaDevices_GetUserMedia();
