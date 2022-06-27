// background service worker for Chrome Extension

'use strict';

chrome.runtime.onMessage.addListener(
 function(message){
  if( 'openOptionsPage' === message.action ){   chrome.runtime.openOptionsPage();   }
 }
);


//End of file.