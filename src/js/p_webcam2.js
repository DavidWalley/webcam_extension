//# Bulk of JS code script for running virtual webcam, changing incoming camera stream to editted outgoing stream.  (c)2022 David C. Walley.
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
var g_bStopTick = g_bStopTick || window["g_bStopTick"]; // Flag to halt periodic processing.
//# Video element and related objects are global for optimization - reducing garbage collection:
var g_eleVideoIn = g_eleVideoIn || window["g_eleVideoIn"]; // Use global DOM video element to accept camera input stream.
var g_bVideoInPlaying = g_bVideoInPlaying || window["g_bVideoInPlaying"]; // Flag that video input has started.
let g_nVideoInW = 800; // Video Input and Canvas Output width and
let g_nVideoInH = 600; // height.
//# Canvas output element and related objects are global for optimization - reducing garbage collection:
var g_eleCanvasOut = g_eleCanvasOut || window["g_eleCanvasOut"]; // Use the global offscreen canvas object for output.
var g_context2dOut = null; // Set up output by drawing background + video frame in quick operations.
var g_imagedataOut = null; // We need this intermediate result for changing pixel data of the whole output canvas at the end.
var g_abOut = null; // Pixel color data array of the imageData object
let g_nCanvasOutW = 800; // Video Input and Canvas Output width and
let g_nCanvasOutH = 600; // height.
let g_eleCanvasBack = null; // Background image - gradient + latest screen capture snapshot.
let g_context2dBack = null;
let g_imagedataBack = null;
let g_abBack = null;
let g_eleCanvas1Flag = null; // Image to insert into corner - normally a flag.
let g_context2d1Flag = null;
let g_imagedata1Flag = null;
let g_ab1Flag = null;
const g_dFLAGsIZE_1 = 0.3; // Amount of width or height of output used by flag.
let g_d1_Zoom = 1; // Inverse zoom factor of video, 1 to 1/3.
let g_dInlay = 1; // Size of video output area by width of output canvas.
let g_dBright = 0; // Video brightness adjustment.
let g_dContrast = 0; // Video contrast adjustment.
let g_abAdjust = []; // A table for quick conversions of color levels.
let g_sHeadlineText_T = ""; // Headline text, at top of background.
let g_sHeadlineText_L = ""; // Text on left side of background.
let g_sHeadlineText_R = ""; // Text on right side of background.
let g_sHeadlineText_N = ""; // Message to scroll across screen,
let g_whenScrollText_ms = 0; // Time to start scrolling.
let g_whenGo_ms = null; // Start time of periodic routine.

function EdgeText(a_context2d) { // Draw text along edges of canvas.
  var dY = Math.floor(0.1 * g_nCanvasOutH);
  a_context2d.lineWidth = Math.floor(0.005 * g_nCanvasOutH);
  a_context2d.strokeStyle = "rgba(255,255,255 ,1)";
  a_context2d.fillStyle = "rgba(  0,  0,  0 ,1)";
  a_context2d.font = "100px sans-serif";
  var d = a_context2d.measureText(g_sHeadlineText_T).width;
  var dMax = g_nCanvasOutH * 0.15;
  d = (82 * g_nCanvasOutW) / (d + 0.001);
  if (dMax < d) {
    d = dMax;
  }
  a_context2d.font = Math.floor(d) + "px sans-serif";
  d = a_context2d.measureText(g_sHeadlineText_T).width;
  d = (g_nCanvasOutW - d) / 2;
  a_context2d.strokeText(g_sHeadlineText_T, d, g_nCanvasOutH * 0.13);
  a_context2d.fillText(g_sHeadlineText_T, d, g_nCanvasOutH * 0.13);
  a_context2d.font = "100px sans-serif";
  d = a_context2d.measureText(g_sHeadlineText_L).width;
  d = (95 * g_nCanvasOutH) / (d + 0.001);
  if (dMax < d) {
    d = dMax;
  }
  a_context2d.font = Math.floor(d) + "px sans-serif";
  d = a_context2d.measureText(g_sHeadlineText_L).width;
  d = (g_nCanvasOutH - d) / 2;
  a_context2d.rotate(Math.PI / 2);
  a_context2d.strokeText(g_sHeadlineText_L, d, -g_nCanvasOutW * 0.03);
  a_context2d.fillText(g_sHeadlineText_L, d, -g_nCanvasOutW * 0.03);
  a_context2d["resetTransform"]();
  a_context2d.font = "100px sans-serif";
  d = a_context2d.measureText(g_sHeadlineText_R).width;
  d = (95 * g_nCanvasOutH) / (d + 0.001);
  if (dMax < d) {
    d = dMax;
  }
  a_context2d.font = Math.floor(d) + "px sans-serif";
  d = a_context2d.measureText(g_sHeadlineText_R).width;
  d = (g_nCanvasOutH - d) / 2;
  a_context2d.rotate(Math.PI / 2);
  a_context2d.strokeText(g_sHeadlineText_R, d, -g_nCanvasOutW * 0.93);
  a_context2d.fillText(g_sHeadlineText_R, d, -g_nCanvasOutW * 0.93);
  a_context2d["resetTransform"]();
}

function BackFill() { // Fill the background canvas with a gradient and the background image.
  g_context2dBack = g_eleCanvasBack.getContext("2d");
  g_context2dBack.globalAlpha = 1.0;
  var lineargradient = g_context2dBack.createLinearGradient(
    0,
    0,
    g_nCanvasOutW,
    g_nCanvasOutH
  );
  lineargradient.addColorStop(0, "rgba(  0 ,188 ,212 ,1)");
  lineargradient.addColorStop(1, "rgba(238 ,218 ,130 ,1)");
  g_context2dBack.fillStyle = lineargradient;
  g_context2dBack.fillRect(0, 0, g_nCanvasOutW, g_nCanvasOutH);
  g_imagedataBack = g_context2dBack.getImageData(
    0,
    0,
    g_nCanvasOutW,
    g_nCanvasOutH
  );
  g_abBack = g_imagedataBack.data;
}

let g_imageFromOptions = null; // Background image (passed in as data URI from Options page).

function OnLoadImageFromOptions_Back() { // Draw background image onto global background canvas.
  if (!g_imageFromOptions) {
    return;
  }
  var nSourceW = g_imageFromOptions.width;
  var nSourceH = g_imageFromOptions.height;
  var dDestinationL = 0;
  var dDestinationW = g_nCanvasOutW;
  var dDestinationH = g_nCanvasOutH;
  if (nSourceW / nSourceH < dDestinationW / dDestinationH) {
    dDestinationW = Math.floor((dDestinationH * nSourceW) / nSourceH + 0.5);
    dDestinationL = Math.floor((g_nCanvasOutW - dDestinationW) / 2);
  } else {
    dDestinationH = Math.floor((dDestinationW * nSourceH) / nSourceW + 0.5);
  }
  g_context2dBack.globalAlpha = 1.0;
  var lineargradient = g_context2dBack.createLinearGradient(
    0,
    0,
    g_nCanvasOutW,
    g_nCanvasOutH
  );
  lineargradient.addColorStop(0, "rgba(  0 ,188 ,212 ,1)");
  lineargradient.addColorStop(1, "rgba(238 ,218 ,130 ,1)");
  g_context2dBack.fillStyle = lineargradient;
  g_context2dBack.fillRect(0, 0, g_nCanvasOutW, g_nCanvasOutH);
  g_context2dBack.drawImage(
    g_imageFromOptions,
    0,
    0,
    nSourceW,
    nSourceH,
    dDestinationL,
    0,
    dDestinationW,
    dDestinationH
  );
  g_imagedataBack = g_context2dBack.getImageData(
    0,
    0,
    g_nCanvasOutW,
    g_nCanvasOutH
  );
  g_abBack = g_imagedataBack.data;
}

function GoAdjust(a_dBright, a_dContrast) { // Construct a table for quick conversions of color levels.
  var dF = (259 * (255 + a_dContrast)) / 255 / (259 - a_dContrast);
  for (var i = 0; i <= 255; i++) {
    g_abAdjust[i] = Math.floor(128 + dF * (i - 128) + a_dBright);
    if (g_abAdjust[i] < 0) {
      g_abAdjust[i] = 0;
    }
    if (255 < g_abAdjust[i]) {
      g_abAdjust[i] = 255;
    }
  }
}

function OnLoadImageFromOptions_Flag() { // Draw flag image onto global flag canvas.
  var g_context2d1Flag = g_eleCanvas1Flag.getContext("2d");
  if (!g_imageFromOptions) {
    return;
  }
  g_context2d1Flag.drawImage(
    g_imageFromOptions,
    0,
    0,
    g_imageFromOptions.width,
    g_imageFromOptions.height,
    0,
    0,
    g_eleCanvas1Flag.width,
    g_eleCanvas1Flag.height
  );
  g_imagedata1Flag = g_context2d1Flag.getImageData(
    0,
    0,
    g_eleCanvas1Flag.width,
    g_eleCanvas1Flag.height
  );
  g_ab1Flag = g_imagedata1Flag.data;
}

function sDecode(a) {
  return a.split("~1").join(" ").split("~0").join("~");
}

function Tick_DataFromOptions() { // Get possible data from the messaging DOM element (between injected script and options page).
  var eleDivSharedTalk = document.getElementById($_sIDdIVsHAREDtALK);
  if (!eleDivSharedTalk) {
    return;
  }
  var sData = eleDivSharedTalk.innerText.trim();
  if ("" === sData) {
    return;
  }
  var sType = sData.slice(0, 7);
  sData = sData.slice(8);
  var ob = null;
  if (
    $_sMESSAGE_TYPE_js_opts === sType ||
    $_sMESSAGE_TYPE_js_edge === sType ||
    $_sMESSAGE_TYPE_js_news === sType
  ) {
    try {
      ob = JSON.parse(sData);
    } catch (e) {
      return;
    }
  }
  switch (sType) {
    case $_sMESSAGE_TYPE_js_edge:
      g_sHeadlineText_T = sDecode(ob[$_sMESSAGE_TEXT_T]);
      g_sHeadlineText_L = sDecode(ob[$_sMESSAGE_TEXT_L]);
      g_sHeadlineText_R = sDecode(ob[$_sMESSAGE_TEXT_R]);
      break;
    case $_sMESSAGE_TYPE_js_news:
      g_sHeadlineText_N = sDecode(ob[$_sMESSAGE_TEXT_N]);
      g_whenScrollText_ms = Date.now();
      break;
    case $_sMESSAGE_TYPE_js_opts:
      if (ob[$_sOPTIONzOOM]) {
        g_d1_Zoom = Math.pow(3, -parseFloat(ob[$_sOPTIONzOOM]) * 0.01);
      }
      if (ob[$_sOPTIONsIZE]) {
        g_dInlay = 1 - parseFloat(ob[$_sOPTIONsIZE]) * 0.01;
      }
      if (ob[$_sOPTIONbRIGHT]) {
        g_dBright = parseFloat(ob[$_sOPTIONbRIGHT]) * 2 - 100;
      }
      if (ob[$_sOPTIONcONTRAST]) {
        g_dContrast = 3 * (parseFloat(ob[$_sOPTIONcONTRAST]) - 50);
      }
      GoAdjust(g_dBright, g_dContrast);
      break;
    case $_sMESSAGE_TYPE_datau_B:
    case $_sMESSAGE_TYPE_datau_F:
      if ("" === sData) {
        g_ab1Flag = null;
        break;
      }
      if ("data:" !== sData.slice(0, 5)) {
        break;
      }
      g_imageFromOptions = new Image();
      g_imageFromOptions.onload = function () {
        if ($_sMESSAGE_TYPE_datau_B === sType) {
          OnLoadImageFromOptions_Back();
        } else if ($_sMESSAGE_TYPE_datau_F === sType) {
          OnLoadImageFromOptions_Flag();
        }
      };
      g_imageFromOptions.src = sData;
      break;
    default:
  }
  eleDivSharedTalk.innerText = "";
}

function Tick_PixelEdit(a_nDL, a_nDT, a_nDW, a_nDH) { // Periodic direct manipulation of pixel data.
  g_imagedataOut = g_context2dOut.getImageData(
    0,
    0,
    g_nCanvasOutW,
    g_nCanvasOutH
  );
  g_abOut = g_imagedataOut.data;
  var nDR = a_nDL + a_nDW;
  var r = 0;
  var g = 0;
  var b = 0;
  var k = 0;
  var kFlag = -1;
  var nFlagW = g_eleCanvas1Flag.width;
  var nFlagT = g_nCanvasOutH - g_eleCanvas1Flag.height;
  const nROW = 4 * g_nCanvasOutW;
  var iRow = 0;
  var iCell = 0;
  var bCellInVideo = false;
  var bCellInFlag = false;
  var whenNow_ms = Date.now() - g_whenGo_ms;
  for (iCell = 0; iCell < g_nCanvasOutW; iCell++) {
    k = 4 * iCell;
    bCellInVideo = a_nDL <= iCell && iCell < nDR;
    bCellInFlag = null !== g_ab1Flag && iCell < nFlagW;
    var dCell = iCell / g_nCanvasOutW / g_dFLAGsIZE_1;
    var nFlutter =
      iCell *
      (0.015 * Math.sin(2.2 * (dCell - 0.00017 * whenNow_ms)) +
        0.01 * Math.sin(7.0 * (dCell - 0.00013 * whenNow_ms)) +
        0.008 * Math.sin(10.0 * (dCell - 0.00022 * whenNow_ms)));
    var nSun = Math.floor((5000 * nFlutter) / g_nCanvasOutH);
    nFlutter = Math.floor(3 * nFlutter + nFlagT);
    for (iRow = 0; iRow < g_nCanvasOutH; iRow++) {
      if (bCellInVideo && a_nDT <= iRow) {
        r = g_abAdjust[g_abOut[k]];
        g = g_abAdjust[g_abOut[k + 1]];
        b = g_abAdjust[g_abOut[k + 2]];
      } else {
        r = g_abBack[k];
        g = g_abBack[k + 1];
        b = g_abBack[k + 2];
      }
      if (bCellInFlag && nFlutter <= iRow) {
        kFlag = ((iRow - nFlutter) * nFlagW + iCell) * 4;
        if (g_ab1Flag.length < kFlag) {
          bCellInFlag = false;
        } else {
          r = r * 0.3 + g_ab1Flag[kFlag] * 0.7 - nSun;
          g = g * 0.3 + g_ab1Flag[kFlag + 1] * 0.7 - nSun;
          b = b * 0.3 + g_ab1Flag[kFlag + 2] * 0.7 - nSun;
        }
      }
      g_abOut[k] = r <= 0 ? 0 : 255 <= r ? 255 : Math.floor(r);
      g_abOut[k + 1] = g <= 0 ? 0 : 255 <= g ? 255 : Math.floor(g);
      g_abOut[k + 2] = b <= 0 ? 0 : 255 <= b ? 255 : Math.floor(b);
      g_abOut[k + 3] = 255;
      k += nROW;
    }
  }
  g_context2dOut.putImageData(g_imagedataOut, 0, 0);
}

let g_whenWas_ms = -1; // Time of previous run of periodic routine.
let g_tookTickDecay_ms = 100; // Decaying running average of time periodic routine took to run once.
let g_tookEndDecay_ms = 100; //

function Tick() { // Main periodic routine.
  if (g_bStopTick) {
    Go_Tick();
    return;
  }
  if (!g_eleCanvasOut) {
    requestAnimationFrame(Tick);
    return;
  }
  var whenNow_ms = Date.now();
  Tick_DataFromOptions();
  if (null === g_context2dOut) {
    g_context2dOut = g_eleCanvasOut.getContext("2d");
    g_imagedataOut = g_context2dOut.getImageData(
      0,
      0,
      g_nCanvasOutW,
      g_nCanvasOutH
    );
    g_abOut = g_imagedataOut.data;
  }
  g_context2dOut.globalAlpha = 1.0;
  if (g_bVideoInPlaying && 0 < g_dInlay) {
    var nSW = g_nVideoInW * g_d1_Zoom;
    var nSH = g_nVideoInH * g_d1_Zoom;
    var nSL = (g_nVideoInW - nSW) / 2;
    var nST = (g_nVideoInH - nSH) / 2;
    var nDW = g_nCanvasOutW * g_dInlay;
    var nDH = (nDW * g_nVideoInH) / g_nVideoInW;
    var nDT = g_nCanvasOutH - nDH;
    var nDL = (g_nCanvasOutW - nDW) / 2;
    if (nDL + nDW < 0.875 * g_nCanvasOutW) {
      nDL = 0.875 * g_nCanvasOutW - nDW;
    }
    g_context2dOut.drawImage(
      g_eleVideoIn,
      Math.floor(nSL + 0.5),
      Math.floor(nST + 0.5),
      Math.floor(nSW + 0.5),
      Math.floor(nSH + 0.5),
      Math.floor(nDL + 0.5),
      Math.floor(nDT + 0.5),
      Math.floor(nDW + 0.5),
      Math.floor(nDH + 0.5)
    );
  }
  Tick_PixelEdit(nDL, nDT, nDW, nDH);
  EdgeText(g_context2dOut);
  var took_ms = whenNow_ms - g_whenScrollText_ms;
  var dX = 0;
  var dY = 0;
  if (0 <= took_ms) {
    dY = Math.floor(0.17 * g_nCanvasOutH);
    var nTextW = g_context2dOut.measureText(g_sHeadlineText_N).width;
    g_context2dOut.font = Math.floor(0.1 * g_nCanvasOutH) + "px serif";
    if ("" === g_sHeadlineText_N) {
      dX = g_nCanvasOutW * (1 - took_ms * 0.00005);
      if (dX + nTextW < 0) {
        g_whenScrollText_ms = whenNow_ms + 30000;
      }
      g_context2dOut.lineWidth = Math.floor(0.005 * g_nCanvasOutH);
      g_context2dOut.strokeStyle = "rgba(255,255,255 ,0.4)";
      g_context2dOut.fillStyle = "rgba(  0,  0,  0 ,0.4)";
      g_context2dOut.strokeText($_sLINK, dX, dY);
      g_context2dOut.fillText($_sLINK, dX, dY);
    } else {
      dX = g_nCanvasOutW * (1 - took_ms * 0.0001);
      if (dX + nTextW < 0) {
        g_whenScrollText_ms = whenNow_ms + 30000;
        g_sHeadlineText_N = "";
      }
      g_context2dOut.lineWidth = Math.floor(0.005 * g_nCanvasOutH);
      g_context2dOut.strokeStyle = "rgba(255,255,255 ,1)";
      g_context2dOut.fillStyle = "rgba(  0,  0,  0 ,1)";
      g_context2dOut.strokeText(g_sHeadlineText_N, dX, dY);
      g_context2dOut.fillText(g_sHeadlineText_N, dX, dY);
    }
  }
  var tookTick_ms = whenNow_ms - g_whenWas_ms;
  g_tookTickDecay_ms = (g_tookTickDecay_ms * 19 + tookTick_ms) * 0.05;
  if (1000 < g_tookTickDecay_ms) {
    g_tookTickDecay_ms = 1000;
  }
  g_whenWas_ms = whenNow_ms;
  var whenEnd_ms = Date.now();
  g_tookEndDecay_ms = (g_tookEndDecay_ms * 19 + whenEnd_ms - whenNow_ms) * 0.05;
  if (1000 < g_tookEndDecay_ms) {
    g_tookEndDecay_ms = 1000;
  }
  requestAnimationFrame(Tick);
}

function Go_Tick() { // Wait before starting the main periodic routine.
  if (!g_eleCanvasOut) {
    requestAnimationFrame(Go_Tick);
    return;
  }
  if (!g_eleVideoIn) {
    requestAnimationFrame(Go_Tick);
    return;
  }
  if (!g_bVideoInPlaying) {
    requestAnimationFrame(Go_Tick);
    return;
  }
  if (!g_eleCanvas1Flag) {
    g_eleCanvas1Flag = document.createElement("canvas");
  }
  var nW = Math.floor(g_nCanvasOutW * g_dFLAGsIZE_1);
  var nH = Math.floor(g_nCanvasOutH * g_dFLAGsIZE_1);
  if (nW < 1.667 * nH) {
    nH = Math.floor(nW / 1.667);
  } else {
    nW = Math.floor(nH * 1.667);
  }
  //# Initialize flag image pixel data.
  g_ab1Flag = null;
  if (g_eleCanvas1Flag) {
    g_eleCanvas1Flag.width = nW;
    g_eleCanvas1Flag.height = nH;
    g_context2d1Flag = g_eleCanvas1Flag.getContext("2d");
    g_context2d1Flag.fillStyle = "#2277FF";
    g_context2d1Flag.fillRect(0, 0, nW, Math.floor(nH / 2 + 1));
    g_context2d1Flag.fillStyle = "#F0E000";
    g_context2d1Flag.fillRect(0, Math.floor(nH / 2), nW, Math.floor(nH / 2));
    g_imagedata1Flag = g_context2d1Flag.getImageData(0, 0, nW, nH);
    g_ab1Flag = g_imagedata1Flag.data;
  }
  g_nVideoInW = g_eleVideoIn.videoWidth;
  g_nVideoInH = g_eleVideoIn.videoHeight;
  g_nCanvasOutW = g_eleCanvasOut.width;
  g_nCanvasOutH = g_eleCanvasOut.height;
  g_eleCanvasBack = document.createElement("canvas");
  g_eleCanvasBack.width = g_nCanvasOutW;
  g_eleCanvasBack.height = g_nCanvasOutH;
  BackFill();
  OnLoadImageFromOptions_Back();
  document
    .getElementById($_sIDdIVsHAREDtALK)
    .setAttribute($_sATTRIBUTE_GOoPTIONS, "1");
  g_whenGo_ms = Date.now();
  g_whenScrollText_ms = g_whenGo_ms;
  g_bStopTick = false;
  Tick();
}

async function Go() { // Main execution starts here.
  GoAdjust(g_dBright, g_dContrast);
  Go_Tick();
}

Go(); // Start execution of the code above.
