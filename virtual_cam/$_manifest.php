<?php // Chrome extension manifest. https:/ /developer.chrome.com/docs/extensions/mv3/manifest/
//(c)2022 David C. Walley

echo '{"manifest_version"'              .':3'                                                   ."\n";  //> Required.
/*DEV*/ echo ',"name"'                  .':"DEV Virtual Webcam"'                                ."\n";  //> Required. DEV version.
//*PRO*/echo ',"name"'                  .':"Slava Ukraini Virtual Webcam"'                      ."\n";  //> Required. Production version.
echo ',"version"'                       .':"0.1.0"'                                             ."\n";  //> Required.
echo ',"description"'                   .':"Virtual Webcam with Flag of Ukraine"'               ."\n";  //> Recommended. A plain text description
echo ',"icons"'                         .':{"16"'               .':"icon-16.png"'               ."\n";  //>
echo                                      ',"48"'               .':"icon-48.png"'               ."\n";  //>
echo                                      ',"128"'              .':"icon-128.png"'              ."\n";  //>
echo                                      '}'                                                   ."\n";  //>
echo ',"minimum_chrome_version"'        .':"10.0"'                                              ."\n";  //>
echo ',"content_scripts"'               .':[{"matches"'         .':["<all_urls>"]'              ."\n";  //> All URLs loaded in Chrome should have access to the virtual camera? All auto-run content scripts must specify match patterns.
/*DEV*/ echo                               ',"js"'              .':["js/$_inject.js_php"]'      ."\n";  //> Code to inject into pages (and run when that page is loaded?).
//*PRO*/echo                               ',"js"'              .':["js/inject.js"]'            ."\n";  //>
echo                                       ',"run_at"'          .':"document_start"'            ."\n";  //> Scripts are injected after any files from CSS, but before any other DOM is constructed or any other script is run.   https:/ /developer.chrome.com/docs/extensions/mv3/content_scripts/
echo                                       ',"all_frames"'      .':true'                        ."\n";  //> Allows the extension to specify if files should be injected into all frames matching the specified URL requirements (OR only into the topmost frame in a tab).
echo                                      '}]'                                                  ."\n";  //>

 "background"     : { "scripts" : [    "./background.js"] }                                             //> https://youtu.be/-dhMbVEreII
,"options_page"   :                    "./options.html"
,"browser_action" : { "default_popup" :    "popup.html"   }

echo ',"permissions"'                   .':["tabs"]'                                            ."\n";  //> Gives your extension access to privileged fields of the Tab objects, an API to interact with the browser's tab system.
echo ',"web_accessible_resources"'      .':[{"resources"'       .':["js/*"]'                    ."\n";  //> Files inside an extension that can be accessed by web pages or other extensions. Extensions typically use this feature to expose images or other assets that need to be loaded in web pages, but any asset included in an extension's bundle can be made web accessible.
echo                                       ',"matches"'         .':["<all_urls>"]'              ."\n";  //>
echo                                      '}]'                                                  ."\n";  //>
echo '}';                                                                                               //>

//End of file.