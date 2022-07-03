//# For running GUI for Easy Meeting Virtual Webcam Chrome Extension (c)2022 David C. Walley.
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

function G_eleTAP($a, $f) {
  document.getElementById($a).addEventListener("click", $f);
}

function G_eleIN($a, $f) {
  document.getElementById($a).addEventListener("input", $f);
}

const g_eleVideoGrab = G_ele($_sIDvIDEOgRAB);

function Sender_Tabs( // Send Chrome tabs, each of which may have a listener set up in its inject.js
  a_tabs, // List of all open tabs in Chrome.
  a_sType, // Type may be $_sMESSAGE_TYPE_js_opts JSON data, or, 'datau_?' image data as text.
  a_sData // Data package.
) {
  for (let tab of a_tabs) {
    window["chrome"]["tabs"]
      ["sendMessage"](tab.id, { type: a_sType, data: a_sData })
      .then(function (a) {})
      .catch(function (e) {});
  }
}

async function Sender( // Get a list of all open Chrome tabs, and send them a message.
  a_sType, // Type may be $_sMESSAGE_TYPE_js_opts JSON data, or, $_sMESSAGE_TYPE_datau_B image data as text for background or flag.
  a_sData // Data package.
) {
  window["chrome"]["tabs"]
    ["query"]({})
    .then(function (a_tabs) {
      Sender_Tabs(a_tabs, a_sType, a_sData);
    })
    .catch(function (e) {
      console.log("Err: " + e);
    });
}

let g_iFlag = 1;

function sEleEncode(a) {
  return G_ele(a).value.split("~").join("~0").split(" ").join("~1");
}

function UpdateEdgesText() { // Send message with latest edge message text values.
  Sender(
    $_sMESSAGE_TYPE_js_edge,
    '{"' +
      $_sMESSAGE_TEXT_T +
      '":"' +
      sEleEncode($_sIDiNtEXTeDGE_T) +
      '"' +
      ',"' +
      $_sMESSAGE_TEXT_L +
      '":"' +
      sEleEncode($_sIDiNtEXTeDGE_L) +
      '"' +
      ',"' +
      $_sMESSAGE_TEXT_R +
      '":"' +
      sEleEncode($_sIDiNtEXTeDGE_R) +
      '"' +
      "}"
  );
}

function SendNews() { // Send message with latest scrolling message text value.
  Sender(
    $_sMESSAGE_TYPE_js_news,
    '{"' + $_sMESSAGE_TEXT_N + '":"' + sEleEncode($_sIDiNtEXTnEWS) + '"}'
  );
}

function SendAndSaveOptions() { // On any change to an input, send a message to all Chrome tabs (because they may be listening).
  Sender(
    $_sMESSAGE_TYPE_js_opts,
    '{"' +
      $_sOPTIONzOOM +
      '":"' +
      G_ele($_sIDrANGEzOOM).value +
      '"' +
      ',"' +
      $_sOPTIONsIZE +
      '":"' +
      G_ele($_sIDrANGEsIZE).value +
      '"' +
      ',"' +
      $_sOPTIONbRIGHT +
      '":"' +
      G_ele($_sIDrANGEbRIGHT).value +
      '"' +
      ',"' +
      $_sOPTIONcONTRAST +
      '":"' +
      G_ele($_sIDrANGEcONTRAST).value +
      '"' +
      ',"' +
      $_sOPTIONfLAG +
      '":"' +
      g_iFlag +
      '"' +
      "}"
  );
}

function RestoreOptions() { // Restores options using the preferences stored in window['chrome']['storage']. !!!Not working?
  window["chrome"]["storage"]["local"]["get"]("options", function (a_ob) {
    if (a_ob["options"]) {
      G_ele($_sIDrANGEzOOM).value = "" + a_ob["options"][$_sOPTIONzOOM];
      G_ele($_sIDrANGEsIZE).value = "" + a_ob["options"][$_sOPTIONsIZE];
      G_ele($_sIDrANGEbRIGHT).value = "" + a_ob["options"][$_sOPTIONbRIGHT];
      G_ele($_sIDrANGEcONTRAST).value = "" + a_ob["options"][$_sOPTIONcONTRAST];
      if (a_ob["options"][$_sOPTIONfLAG]) {
        g_iFlag = parseInt(a_ob["options"][$_sOPTIONfLAG], 10);
      }
    }
  });
}

let g_nEleVideoW = 0; // Size
let g_nEleVideoH = 0; // of video element containing the possibly smaller moving image.
let g_nVideoImageInEleL = 0; // Left border between video element's top, and the top of the video's actual playing image.
let g_nVideoImageInEleT = 0; // Top border between video element's top, and the top of the video's actual playing image.
let g_nVideoImageW = -1; // Width of video's actual playing image.
let g_nVideoImageH = -1; // Height of video's actual playing image.
let g_nVideoGrabW = 1; // Original size of screen capture video stream
let g_nVideoGrabH = 1; // .
let g_isCroppingClicks = 0; // Flags special behaviour for first click - assigns default width and height.
let g_nCropInHolder0X = -1; // Previous click co-
let g_nCropInHolder0Y = -1; // ordinates, within the video element entire screen area rectangle.
let g_nCropInHolder1X = -1; // Previous click co-
let g_nCropInHolder1Y = -1; // ordinates, within the video element entire screen area rectangle.

function anCropInHolderLTWH() { // Put 2 click points in order, reporting them as Left, Top, Width and Height components.
  var w = Math.floor(g_nCropInHolder1X - g_nCropInHolder0X);
  var h = Math.floor(g_nCropInHolder1Y - g_nCropInHolder0Y);
  var l;
  if (w < 0) {
    w = -w;
    l = Math.floor(g_nCropInHolder1X);
  } else {
    l = Math.floor(g_nCropInHolder0X);
  }
  var t;
  if (h < 0) {
    h = -h;
    t = Math.floor(g_nCropInHolder1Y);
  } else {
    t = Math.floor(g_nCropInHolder0Y);
  }
  return [l, t, w, h];
}

function MoveCroppingDivs() { // Arrange 4 mask divs to cover area other than central rectangular hole, and border div for the hole.
  const P = "px";
  var X = g_nVideoImageInEleL;
  var Y = g_nVideoImageInEleT;
  var U = g_nVideoImageW;
  var V = g_nVideoImageH;
  var a_anLtwh = anCropInHolderLTWH();
  var L = a_anLtwh[0] - g_nVideoImageInEleL;
  var T = a_anLtwh[1] - g_nVideoImageInEleT;
  var R = a_anLtwh[2] + L;
  var B = a_anLtwh[3] + T;
  var e = G_ele($_sIDdIVcROP_CORNER_TL).style;
  e.left = X + P;
  e.top = Y + P;
  e.width = R + P;
  e.height = T + P;
  e = G_ele($_sIDdIVcROP_CORNER_TR).style;
  e.left = X + R + P;
  e.top = Y + P;
  e.width = U - R + P;
  e.height = B + P;
  e = G_ele($_sIDdIVcROP_CORNER_BR).style;
  e.left = X + L + P;
  e.top = Y + B + P;
  e.width = U - L + P;
  e.height = V - B + P;
  e = G_ele($_sIDdIVcROP_CORNER_BL).style;
  e.left = X + P;
  e.top = Y + T + P;
  e.width = L + P;
  e.height = V - T + P;
  e = G_ele($_sIDdIVcROP_CORNER_MD).style;
  e.left = X + L - 1 + P;
  e.top = Y + T - 1 + P;
  e.width = R - L - 2 + P;
  e.height = B - T - 2 + P;
}

function ChangeVideoElementCrop( // Change corner points of crop area - the central rectangular hole.
  a_event // Given details of the click event.
) {
  const eleHold = G_ele($_sIDdIVhOLD);
  const nHoldX_px = eleHold.offsetLeft;
  const nHoldY_px = eleHold.offsetTop;
  var scrollL = Math.floor(
    window.pageXOffset ||
      (document.documentElement || document.body.parentNode || document.body)
        .scrollLeft
  );
  var scrollT = Math.floor(
    window.pageYOffset ||
      (document.documentElement || document.body.parentNode || document.body)
        .scrollTop
  );
  var nX = a_event.clientX - nHoldX_px + scrollL;
  var nY = a_event.clientY - nHoldY_px + scrollT;
  var sBorder = "rgba(255,255,0,1)";
  if (g_isCroppingClicks <= 0) {
    g_isCroppingClicks++;
    g_nCropInHolder0X = nX;
    g_nCropInHolder0Y = nY;
    g_nCropInHolder1X = nX + 640 / g_nShrink;
    g_nCropInHolder1Y = nY + 480 / g_nShrink;
  } else {
    g_nCropInHolder1X = g_nCropInHolder0X;
    g_nCropInHolder1Y = g_nCropInHolder0Y;
    g_nCropInHolder0X = nX;
    g_nCropInHolder0Y = nY;
    if (
      g_nCropInHolder1X < g_nCropInHolder0X &&
      g_nCropInHolder1Y < g_nCropInHolder0Y
    ) {
      var nW = g_nCropInHolder0X - g_nCropInHolder1X;
      var nH = g_nCropInHolder0Y - g_nCropInHolder1Y;
      var dAspect = nW / nH;
      if (3.5 / 3 < dAspect && dAspect < 4.5 / 3) {
        nW = (nH * 4) / 3;
        sBorder = "rgba(0,0,255,1)";
      } else if (15 / 9 < dAspect && dAspect < 17 / 9) {
        nW = (nH * 16) / 9;
        sBorder = "rgba(0,255,0,1)";
      }
      g_nCropInHolder0X = g_nCropInHolder1X + nW;
      g_nCropInHolder0Y = g_nCropInHolder1Y + nH;
    }
  }
  MoveCroppingDivs();
  G_ele($_sIDdIVcROP_CORNER_MD).style.border = "2px solid " + sBorder;
}

function ScreenGrabGo_ready() { // Get data about video after it has been initialized, arrange cropping divs.
  if (g_eleVideoGrab.readyState < 2) {
    return;
  }
  var nEleW = g_eleVideoGrab.offsetWidth;
  var nEleH = g_eleVideoGrab.offsetHeight;
  g_nVideoGrabW = g_eleVideoGrab.videoWidth;
  g_nVideoGrabH = g_eleVideoGrab.videoHeight;
  if (g_nVideoGrabW * nEleH < nEleW * g_nVideoGrabH) {
    g_nVideoImageW = Math.floor((nEleH * g_nVideoGrabW) / g_nVideoGrabH);
    g_nVideoImageH = nEleH;
  } else {
    g_nVideoImageW = nEleW;
    g_nVideoImageH = Math.floor((nEleW * g_nVideoGrabH) / g_nVideoGrabW);
  }
  g_nVideoImageInEleL = Math.floor((g_nEleVideoW - g_nVideoImageW) / 2);
  g_nVideoImageInEleT = Math.floor((g_nEleVideoH - g_nVideoImageH) / 2);
  g_nCropInHolder0X = Math.floor(g_nVideoImageW / 2 - 40);
  g_nCropInHolder0Y = Math.floor(g_nVideoImageH / 2 - 30);
  g_nCropInHolder1X = Math.floor(g_nVideoImageW / 2 + 40);
  g_nCropInHolder1Y = Math.floor(g_nVideoImageH / 2 + 30);
  MoveCroppingDivs();
}

let g_nShrink = 3; // Inverse shrink factor, from screen capture stream to (at most half-size) user display. //> Find how much stream needs to shrink to fit within 640 pixels.

async function ScreenGrabGo() { // Request access to, and begin capturing, displayed screen contents.
  try {
    if (null == g_eleVideoGrab.srcObject) {
      g_eleVideoGrab.srcObject = await navigator.mediaDevices.getDisplayMedia({
        video: { cursor: "always" },
        audio: false,
      });
      G_ele($_sIDbUTTONgRABgO).innerText = "End Capture";
      const videoTrack = g_eleVideoGrab.srcObject.getVideoTracks()[0];
      const settingsTrack = videoTrack.getSettings();
      g_nShrink = Math.floor(settingsTrack.width / 640);
      if (g_nShrink < 4) {
        g_nShrink = 4;
      }
      g_nVideoImageInEleT = 0;
      g_nVideoImageInEleL = 0;
      g_eleVideoGrab.width = g_nEleVideoW = Math.floor(
        settingsTrack.width / g_nShrink + 0.5
      );
      g_eleVideoGrab.height = g_nEleVideoH = Math.floor(
        settingsTrack.height / g_nShrink + 0.5
      );
      g_eleVideoGrab.addEventListener("loadeddata", ScreenGrabGo_ready);
    } else {
      let tracks = g_eleVideoGrab.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      g_eleVideoGrab.srcObject = null;
      G_ele($_sIDbUTTONgRABgO).innerText = "Start Capture";
    }
  } catch (err) {
    console.log("Error: " + err);
  }
}

let g_eleCanvasConfirm = G_ele($_sIDcANVAScONFIRM); // Canvas displayed to user in confirmation dialog - its size it what is sent to injected code in 3rd party pages.

function ScreenGrabSnapShot() { // Take a snapshot of the video screen capture.
  var a_anLtwh = anCropInHolderLTWH();
  var dCropInHolderL = a_anLtwh[0];
  var dCropInHolderT = a_anLtwh[1];
  var dCropW = a_anLtwh[2];
  var dCropH = a_anLtwh[3];
  var dInImageCropX = dCropInHolderL - g_nVideoImageInEleL;
  var dInImageCropY = dCropInHolderT - g_nVideoImageInEleT;
  if (dInImageCropX < 0) {
    dInImageCropX = 0;
  }
  if (dInImageCropY < 0) {
    dInImageCropY = 0;
  }
  if (g_nVideoImageW < dInImageCropX) {
    dInImageCropX = g_nVideoImageW;
  }
  if (g_nVideoImageH < dInImageCropY) {
    dInImageCropY = g_nVideoImageH;
  }
  var dSx = Math.floor((dInImageCropX * g_nVideoGrabW) / g_nVideoImageW);
  var dSy = Math.floor((dInImageCropY * g_nVideoGrabH) / g_nVideoImageH);
  var dSw = Math.floor((dCropW * g_nVideoGrabW) / g_nVideoImageW);
  var dSh = Math.floor((dCropH * g_nVideoGrabH) / g_nVideoImageH);
  var dShrink = 1 + Math.floor(dSw / 1281);
  var dShrinkY = 1 + Math.floor(dSh / 711);
  if (dShrink < dShrinkY) {
    dShrink = dShrinkY;
  }
  var dDw = Math.floor(dSw / dShrink);
  var dDh = Math.floor(dSh / dShrink);
  g_eleCanvasConfirm.width = dDw;
  g_eleCanvasConfirm.height = dDh;
  let context2dConfirm = g_eleCanvasConfirm.getContext("2d");
  context2dConfirm.drawImage(
    g_eleVideoGrab,
    dSx,
    dSy,
    dSw,
    dSh,
    0,
    0,
    dDw,
    dDh
  );
  var eleConfirm = G_ele($_sIDdIVcONFIRM);
  eleConfirm.style.width = dDw + 20 + "px";
  eleConfirm.style.height = dDh + 200 + "px";
  eleConfirm.style.visibility = "visible";
}

let g_sTarget = "B"; // Remember which button user selected, and which target this snapshot is intended for - B for background, F for flag.

function SnapshotOk() { // Send snapshot to the virtual cam (webcam2.js).
  Sender("datau_" + g_sTarget, g_eleCanvasConfirm.toDataURL());
  G_ele($_sIDdIVcONFIRM).style.visibility = "hidden";
}

async function GoOptions() { // Set up listeners for loading and clicks.
  document.addEventListener("DOMContentLoaded", RestoreOptions);
  G_eleTAP($_sIDdIVfLAGbEFORE, function () {
    g_iFlag--;
    SendAndSaveOptions();
  });
  G_eleTAP($_sIDdIVfLAGnEXT, function () {
    g_iFlag++;
    SendAndSaveOptions();
  });
  G_eleTAP($_sIDbUTTONsHOWeDGES, UpdateEdgesText);
  G_eleTAP($_sIDbUTTONsHOWnEWS, SendNews);
  G_eleIN($_sIDrANGEzOOM, SendAndSaveOptions);
  G_eleIN($_sIDrANGEsIZE, SendAndSaveOptions);
  G_eleIN($_sIDrANGEbRIGHT, SendAndSaveOptions);
  G_eleIN($_sIDrANGEcONTRAST, SendAndSaveOptions);
  G_eleTAP($_sIDbUTTONgRABgO, ScreenGrabGo);
  G_eleTAP($_sIDbUTTONsANPsHOT_B, function () {
    g_sTarget = "B";
    ScreenGrabSnapShot();
  });
  G_eleTAP($_sIDbUTTONsANPsHOT_F, function () {
    g_sTarget = "F";
    ScreenGrabSnapShot();
  });
  G_eleTAP($_sIDvIDEOgRAB, ChangeVideoElementCrop);
  G_eleTAP($_sIDbUTTONcONFIRMoK, SnapshotOk);
  G_eleTAP($_sIDbUTTONcONFIRMnO, function () {
    G_ele($_sIDdIVcONFIRM).style.visibility = "hidden";
  });
}

GoOptions(); // Start execution of options page code.
