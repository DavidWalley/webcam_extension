<?php // Chrome extension manifest. https:/ /developer.chrome.com/docs/extensions/mv3/manifest/
// (c)2022 David C. Walley. Released under version 3 of the GNU General Public License (GPLv3). 

//                      +----------------+                     +----------------+                       //> https://www.freecodecamp.org/news/chrome-extension-message-passing-essentials/
//                      |background.js***|                     |Chrome Extension|                       //>
//          +---------->|                |<-->---+ Read        | runs Inject    |                       //>
//          |           | long-running   |       v global      | Script for     |                       //>
//          |           +----------------+       | objects     | every tab?     |                       //>
// +-----------------+                           |             +----------------+       adds to DOM:    //>
// |   Runtime API   |                           |             |Inject Script***|----+ +----------+     //>
// |                 |                           |             |chrome.runtime  |    | |webcam.js |     //>
// | Content Script  |<--------------------------)-------------|postMessage     |    | |          |     //>
// +-----------------+                           |             +----------------+    | +----------+     //>
//                                              +-------------++----------------+    |                  //>
//                                              |             ||Web page        |<---+                  //>
//                                              |Popup Script ||                |                       //>
//                                              |             ||                |                       //>
//                                              +-------------++----------------+                       //>

// JavaScript code in Chrome extensions can be divided in the following groups:  https://stackoverflow.com/questions/9915311/chrome-extension-code-vs-content-scripts-vs-injected-scripts/9916089#9916089
// Extension code - Full access to all permitted chrome.* APIs.
//                  This includes the background page, and all pages which have direct access to it via chrome.extension.getBackgroundPage(), such as the browser pop-ups.
// 
// Content scripts (via the manifest file or chrome.tabs.executeScript) 
//                - Partial access to some of the chrome APIs
//              ??? full access to the page's DOM (not to any of the window objects, including frames)
//                - Content scripts run in a scope between the extension and the page.
//                - The global window object of a Content script is distinct from the page/extension's global namespace.
// 
// Injected scripts (via this method in a Content script) 
//                - Full access to all of the DOM??? properties??? in the page they are injected into. No access to any of the chrome.* APIs.
//                - Injected scripts behave as if they were included by the page itself, and are not connected to the extension in any way. 


//. {"name"                 : "First Plugin Testing"
//. ,"version"              : "1.0"
//. ,"manifest_version"     : 2
//. ,"description"          : "Trying hands on first extension"
//. ,"background"           : { "scripts"           : ["background.js","persistent":false] }            // ***
//. ,"content_scripts"      : [{"matches"           : ["http://*/*"]
//.                            ,"js"                : ["inject.js" ]                                    // *** Run (on load of every tab) as part of the web page's context.
//.                            }
//.                           ]
//. ,"web_accessible_resources":["inject.js"]
//. ,"browser_action"       : { "default_icon"      : "icon.png"        
//.                           , "default_popup"     : popup.html
//.                           , "default_title"     : "PerfWatch"
//.                           }
//. ,"permissions"          : [ "tabs","http://*/*","https://*/*" ]

//. ,"options_ui"           : {                                                                         https://developer.chrome.com/docs/extensions/mv3/options/
//.                             "page": "options.html",
//.                             "open_in_tab": false
//.                           }
//. }

function                                o($a){ echo $a ."\n"; }


o('{"manifest_version"'                 .':3'                                                        ); //> Required.
/*DEV*/ o(',"name"'                     .':"'. "DEV Virtual Webcam" .'"'                             ); //> Required. DEV version.
//*PRO*/o(',"name"'                     .':"Virtual Webcam - Slava Ukraini"'                         ); //> Required. Production version.
o(',"version"'                          .':"0.1.1"'                                                  ); //> Required.
o(',"description"'                      .':"'. "Virtual Webcam with Flag of Ukraine" .'"'            ); //> Recommended. A plain text description
//o(',"background"'                     .':{ "'.'service_worker'.'":"'. 'js/background.js' .'" }'    ); //> *** background.service_worker 
o(',"icons"'                            .':{"'.'16'             .'":"icon-16.png"'                   ); //>
o(                                        ',"'.'32'             .'":"icon-32.png"'                   ); //>
o(                                        ',"'.'48'             .'":"icon-48.png"'                   ); //>
o(                                        ',"'.'128'            .'":"icon-128.png"'                  ); //>
o(                                        '}'                                                        ); //>
o(',"minimum_chrome_version"'           .':"10.0"'                                                   ); //>
                                                                                                        //>
//o(',"options_page"'                   .':"options.html"'                                           ); //> deprecated
o(',"options_ui"'                       .':{"'.'open_in_tab'    .'":' .'true'                        ); //>
/*DEV*/ o(                                ',"'.'page'           .'":"'.'js/options.html'   .'"'      ); //>
//*PRO*/o(                                ',"'.'page'           .'":"'.'js/options.html'   .'"'      ); //>
o(                                        '}'                                                        ); //>
                                                                                                        //>
o(',"content_scripts"'                  .':[{"'.'matches'       .'":' .'["<all_urls>"]'              ); //> All URLs loaded in Chrome should have access to the virtual camera? All auto-run content scripts must specify match patterns.
/*DEV*/ o(                                 ',"'.'js'            .'":' .'["js/$_inject.js_php"]'      ); //> Code executed with each page loaded. Performs script addition into page's DOM (and run when ready).
//*PRO*/o(                                 ',"'.'js'            .'":' .'["js/inject.js"]'            ); //>
o(                                         ',"'.'run_at'        .'":"'.'document_start"'             ); //> Scripts are injected after any files from CSS, but before any other DOM is constructed or any other script is run.   https:/ /developer.chrome.com/docs/extensions/mv3/content_scripts/
o(                                         ',"'.'all_frames'    .'":' .'true'                        ); //> Allows the extension to specify if files should be injected into all frames matching the specified URL requirements (OR only into the topmost frame in a tab).
o(                                        '}]'                                                       ); //>
                                                                                                        //>
o(',"permissions"'                      .':["tabs","storage"]'                                       ); //> Gives your extension access to privileged fields of the Tab objects, an API to interact with the browser's tab system - need to keep track of what the user is doing.
o(',"web_accessible_resources"'         .':[{"resources"'       .':['.'"js/*"'          .']'         ); //> Explicit permissions: Files inside an extension that can be accessed by web pages or other extensions. Extensions typically use this feature to expose images or other assets that need to be loaded in web pages, but any asset included in an extension's bundle can be made web accessible.
o(                                      '   ,"matches"'         .':['.'"<all_urls>"'    .']'         ); //> Any URL
o(                                        '}]'                                                       ); //>
                                                                                                        //>
o('}'                                                                                                ); //>

//End of file.