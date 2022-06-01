//$_options.js_php - Javascript code with PHP macros, for testing Virtual Camera injection into list of available cameras.
// (c)2022 David C. Walley. Released under version 3 of the GNU General Public License (GPLv3). 

function                                restore_options(//////////////////////////////////////////////////> Restores select box and checkbox state using the preferences stored in chrome.storage.
){                                      //////////////////////////////////////////////////////////////////>
 chrome.storage.local.get( 'dZoom'    ,function(a){ document.getElementById('inrangeZoom'    ).value = a.dZoom    ; } ); //>
 chrome.storage.local.get( 'dBright'  ,function(a){ document.getElementById('inrangeBright'  ).value = a.dBright  ; } ); //>
 chrome.storage.local.get( 'dContrast',function(a){ document.getElementById('inrangeContrast').value = a.dContrast; } ); //>
}//restore_options////////////////////////////////////////////////////////////////////////////////////////>


function                                Send_ToTabs(//////////////////////////////////////////////////////>
                                        a_tabs                                                          //> List of all open tabs in Chrome.
,                                       a_sData                                                         //> Usually JSON formatted data.
){                                      //////////////////////////////////////////////////////////////////>
 console.log(a_tabs);                                                                                   //>
 for( let tab of a_tabs) {                                                                              //>
  chrome.tabs.sendMessage(                                                                              //> ###message
   tab.id                                                                                               //>
  ,{data : a_sData}                                                                                     //> This works!
  ).then(    function(a){ console.log("From content script:"); console.log(a); }                        //>
  ).catch(   function(e){}   );                                                                         //>
 }//for                                                                                                 //>
}//Send_ToTabs////////////////////////////////////////////////////////////////////////////////////////////>


function                                Send(/////////////////////////////////////////////////////////////>
){                                      //////////////////////////////////////////////////////////////////>
 console.log( 'Send' );                                                                                 //>
 chrome.tabs.query(                                                                                     //> https://developer.chrome.com/docs/extensions/reference/tabs/
  {//active        : true                                                                               //>
//,currentWindow : true                                                                                 //>
  }                                                                                                     //>
 ).then(  function(a_tab){// // // // // // // // // // // // // // // // // // // // // // // // // // //>
           Send_ToTabs( a_tab                                                                           //>
           ,JSON.stringify(                                                                             //>
             {'inrangeZoom'     : document.getElementById('inrangeZoom'    ).value                //>
             ,'inrangeBright'   : document.getElementById('inrangeBright'  ).value                //>
             ,'inrangeContrast' : document.getElementById('inrangeContrast').value                //>
             }                                                                                          //>
            )                                                                                           //>
           );                                                                                           //>
          }// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // //>
 ).catch( function(e){ console.log("Err: "+ e); }                                                       //> Error: Error: Could not establish connection. Receiving end does not exist.
 );                                                                                                     //>
}//Send///////////////////////////////////////////////////////////////////////////////////////////////////>


document.addEventListener('DOMContentLoaded' ,restore_options);                                         //>
document.getElementById('inrangeZoom'    ).oninput = function(){ Send(); chrome.storage.local.set( {dZoom     : this.value} ,restore_options ); } //>
document.getElementById('inrangeBright'  ).oninput = function(){ Send(); chrome.storage.local.set( {dBright   : this.value} ,restore_options ); } //>
document.getElementById('inrangeContrast').oninput = function(){ Send(); chrome.storage.local.set( {dContrast : this.value} ,restore_options ); } //>

//End of file.