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
var g_eleVideoIn = g_eleVideoIn || window["g_eleVideoIn"];
g_eleVideoIn = null;
var g_eleCanvasOut = g_eleCanvasOut || window["g_eleCanvasOut"];
g_eleCanvasOut = null;
var g_bStopTick = g_bStopTick || window["g_bStopTick"];
g_bStopTick = false;
var g_bVideoInPlaying = g_bVideoInPlaying || window["g_bVideoInPlaying"];
g_bVideoInPlaying = false;
let g_enumerateDevicesWas = null;
let g_getUserMediaWas = null;
const g_sVIRTUAL0 = "virtual0";
const g_sVIRTUAL1 = "virtual1";
const g_sVIRTUAL2 = "virtual2";

async function Go_ModifyMediaDevices_EnumerateDevices() { // Locally redefine system function to get list of media devices (cameras and microphones).
  if ("undefined" === typeof MediaDevices) {
    console.log("what 1");
    return [];
  }
  if (null !== g_enumerateDevicesWas) {
    return await g_enumerateDevicesWas.call(navigator.mediaDevices);
  }
  g_enumerateDevicesWas = MediaDevices["prototype"]["enumerateDevices"];
  MediaDevices["prototype"][
    "enumerateDevices"
  ] = async function () // Redefine this system function locally, to include the virtual camera.
  {
    document
      .getElementById($_sIDdIVsHAREDtALK)
      .setAttribute($_sATTRIBUTE_INSERTcODE2, "dummy1");
    const r = await g_enumerateDevicesWas.call(navigator.mediaDevices);
    r.push(
      /** @type {!MediaDeviceInfo|!undefined} */ ({
        deviceId: g_sVIRTUAL0,
        groupID: "v0",
        kind: "videoinput",
        label: $_sTITLE + " Lo-res",
      })
    );
    r.push(
      /** @type {!MediaDeviceInfo|!undefined} */ ({
        deviceId: g_sVIRTUAL1,
        groupID: "v0",
        kind: "videoinput",
        label: $_sTITLE + " Mid-res",
      })
    );
    r.push(
      /** @type {!MediaDeviceInfo|!undefined} */ ({
        deviceId: g_sVIRTUAL2,
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
    console.log("undefined MediaDevices");
    return [];
  }
  if (null === g_getUserMediaWas) {
    g_getUserMediaWas = MediaDevices.prototype.getUserMedia;
  }
  MediaDevices["prototype"][
    "getUserMedia"
  ] = async function () // Redefine this system function locally, to include the virtual camera.
  {
    document
      .getElementById($_sIDdIVsHAREDtALK)
      .setAttribute($_sATTRIBUTE_INSERTcODE2, "dummy2");
    var sId = "";
    const obArguments = arguments;
    if (obArguments.length && obArguments[0].video) {
      var v = obArguments[0].video.deviceId;
      if (v) {
        if (g_sVIRTUAL0 === v || g_sVIRTUAL0 === v.exact) {
          sId = g_sVIRTUAL0;
        } else if (g_sVIRTUAL1 === v || g_sVIRTUAL1 === v.exact) {
          sId = g_sVIRTUAL1;
        } else if (g_sVIRTUAL2 === v || g_sVIRTUAL2 === v.exact) {
          sId = g_sVIRTUAL2;
        }
      }
    }
    if ("" === sId) {
      return await g_getUserMediaWas.call(navigator.mediaDevices, ...arguments);
    }
    const usermediaCamera = await g_getUserMediaWas.call(
      navigator.mediaDevices,
      { video: { deviceId: sId }, audio: false }
    );
    if (usermediaCamera) {
      g_bVideoInPlaying = false;
      if (!g_eleVideoIn) {
        g_eleVideoIn = document.createElement("video");
      }
      g_eleVideoIn.autoplay = true;
      g_eleVideoIn.addEventListener("playing", function () {
        g_bVideoInPlaying = true;
      });
      g_eleVideoIn.srcObject = usermediaCamera;
    }
    g_bStopTick = true;
    if (!g_eleCanvasOut) {
      g_eleCanvasOut = document.createElement("canvas");
    }
    switch (sId) {
      case g_sVIRTUAL1:
        g_eleCanvasOut.width = 1280;
        g_eleCanvasOut.height = 720;
        break;
      case g_sVIRTUAL2:
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
