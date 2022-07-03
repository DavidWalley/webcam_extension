"use strict";
chrome.runtime.onMessage.addListener(function (message) {
  if ("g_action_gooptions" !== message.action) {
    return;
  }
  chrome.windows.getAll({ populate: true }, function (a_aWindows) {
    chrome.runtime.openOptionsPage();
  });
});
