<?php // Chrome extension manifest. https:/ /developer.chrome.com/docs/extensions/mv3/manifest/
// (c)2022 David C. Walley. Released under version 3 of the GNU General Public License (GPLv3). 

//                      +----------------+                     +----------------+                       //> https://www.freecodecamp.org/news/chrome-extension-message-passing-essentials/
//                      |background.js***|                     |Chrome Extension|                       //>
//          +---------->|                |<-->---+ Read        | runs Inject    |                       //>
//          |           |                |       v global      | Script for     |                       //>
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

echo '{"manifest_version"'              .':3'                                                   ."\n";  //> Required.
/*DEV*/ echo ',"name"'                  .':"'. "DEV Virtual Webcam" .'"'                        ."\n";  //> Required. DEV version.
//*PRO*/echo ',"name"'                  .':"Virtual Webcam - Slava Ukraini"'                    ."\n";  //> Required. Production version.
echo ',"version"'                       .':"0.1.1"'                                             ."\n";  //> Required.
echo ',"description"'                   .':"'. "Virtual Webcam with Flag of Ukraine" .'"'       ."\n";  //> Recommended. A plain text description
echo ',"icons"'                         .':{"'.'16'             .'":"icon-16.png"'              ."\n";  //>
echo                                      ',"'.'32'             .'":"icon-32.png"'              ."\n";  //>
echo                                      ',"'.'48'             .'":"icon-48.png"'              ."\n";  //>
echo                                      ',"'.'128'            .'":"icon-128.png"'             ."\n";  //>
echo                                      '}'                                                   ."\n";  //>
echo ',"minimum_chrome_version"'        .':"10.0"'                                              ."\n";  //>
                                                                                                        //>
//echo ',"options_page"'                .':"options.html"'                                      ."\n";  //> deprecated
echo ',"options_ui"'                    .':{"'.'open_in_tab'    .'":' .'true'                   ."\n"   //>
/*DEV*/  .                                ',"'.'page'           .'":"'.'js/options.html'   .'"' ."\n"   //>
//*PRO*/ .                                ',"'.'page'           .'":"'.'js/options.html'   .'"' ."\n"   //>
.                                         '}'                                                   ."\n";  //>
                                                                                                        //>
echo ',"content_scripts"'               .':[{"'.'matches'       .'":' .'["<all_urls>"]'         ."\n";  //> All URLs loaded in Chrome should have access to the virtual camera? All auto-run content scripts must specify match patterns.
/*DEV*/ echo                               ',"'.'js'            .'":' .'["js/$_inject.js_php"]' ."\n";  //> Code executed with each page loaded. Performs script addition into page's DOM (and run when ready).
//*PRO*/echo                               ',"'.'js'            .'":' .'["js/inject.js"]'       ."\n";  //>
echo                                       ',"'.'run_at'        .'":"'.'document_start"'        ."\n";  //> Scripts are injected after any files from CSS, but before any other DOM is constructed or any other script is run.   https:/ /developer.chrome.com/docs/extensions/mv3/content_scripts/
echo                                       ',"'.'all_frames'    .'":' .'true'                   ."\n";  //> Allows the extension to specify if files should be injected into all frames matching the specified URL requirements (OR only into the topmost frame in a tab).
echo                                      '}]'                                                  ."\n";  //>
                                                                                                        //>
echo ',"permissions"'                   .':["tabs","storage"]'                                  ."\n";  //> Gives your extension access to privileged fields of the Tab objects, an API to interact with the browser's tab system - need to keep track of what the user is doing.
echo ',"web_accessible_resources"'      .':[{"resources"'       .':['.'"js/*"'          .']'    ."\n";  //> Explicit permissions: Files inside an extension that can be accessed by web pages or other extensions. Extensions typically use this feature to expose images or other assets that need to be loaded in web pages, but any asset included in an extension's bundle can be made web accessible.
echo                                    '   ,"matches"'         .':['.'"<all_urls>"'    .']'    ."\n";  //> Any URL
echo                                      '}]'                                                  ."\n";  //>

echo '}';                                                                                               //>

//End of file.