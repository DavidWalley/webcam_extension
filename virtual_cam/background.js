//executed as soon as Chrome Extension installed or refreshed
//.https://youtu.be/-dhMbVEreII
//.
//.manifest.json
//.background.js
//.foreground.js
//.popup.html
//.options.html

console.log('from background.'));

// https://developer.chrome.com/docs/extensions/mv3/migrating_to_service_workers/
// background pages provide extension authors with an environment that lives independent of any other window or tab. This allows extensions to observe and take action in response to events.
//  injected? XXX main.js                        https://stackoverflow.com/questions/25838804/gmail-extension-sendmessage-to-background-from-page-context/25847017#25847017
//                 ^  | window.postMessage();    window.addEventListener("message", callback, false);
//                 ?  V                                                                         ??? postMessage
//  inject.js?    content.js      window.addEventListener("message", callback, false);
//                 ^  |           chrome.runtime.sendMessage();                        \
//                 ?  V                                                                 \
//                                                                                       \ https://stackoverflow.com/questions/37622345/how-to-have-chrome-extension-button-communicate-with-injected-js#37634207
//                                                                                       /
//                background.js   chrome.runtime.onMessage.addListener(callback);       /
//                 ^              chrome.storage.local.get( ['webcam_extension_1']     /
//                 |                                                                  /
//                popup.js        GUI for simple settings   chrome.storage.local.get( ['webcam_extension_1']

chrome.runtime.onMessage.addListener(                                                                   //> Receives a name from a content script?   https://developer.chrome.com/docs/extensions/mv3/migrating_to_service_workers/
 ( { type ,name} ) => {if( type === 'set-name' ){
                        chrome.storage.local.set( { name } );
                       }//if
                      }
);


chrome.action.onClicked.addListener(
 (tab) => {
  chrome.storage.local.get( ['webcam_extension_1']                                                      //> Get this from popup.js
  ,( { name } ) => {   chrome.tabs.sendMessage( tab.id, { name } );   }
  );
 }
);

//End of file.