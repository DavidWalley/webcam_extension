//$_options.js_php - Javascript code with PHP macros, for testing Virtual Camera injection into list of available cameras.
// (c)2022 David C. Walley. Released under version 3 of the GNU General Public License (GPLv3). 

function                                restore_options(//////////////////////////////////////////////////> Restores select box and checkbox state using the preferences stored in chrome.storage.
){                                      //////////////////////////////////////////////////////////////////>
 chrome.storage.local.get( 'dZoom'    ,function(a){ document.getElementById('inrangeGuiZoom'    ).value = a.dZoom    ; } ); //>
 chrome.storage.local.get( 'dBright'  ,function(a){ document.getElementById('inrangeGuiBright'  ).value = a.dBright  ; } ); //>
 chrome.storage.local.get( 'dContrast',function(a){ document.getElementById('inrangeGuiContrast').value = a.dContrast; } ); //>
}//restore_options////////////////////////////////////////////////////////////////////////////////////////>


function                                Send_ToTabs(////////////////////////////////////////////////>
                                        a_tabs                                                          //>
,                                       a_s
){                                      //////////////////////////////////////////////////////////////////>
console.log(a_tabs);                                                                                    //>
 for( let tab of a_tabs) {                                                                              //>
  chrome.tabs.sendMessage(                                                                              //> ###
   tab.id                                                                                               //>
  ,{greeting : "Data is... "+ a_s}                                                                      //>
  ).then(    function(a){ console.log("From content script:"); console.log(a); }         //>
  ).catch(   function(e){ console.error('Error: '+ e); }   );                                           //>
 }//for                                                                                                 //>
}//Send_ToTabs//////////////////////////////////////////////////////////////////////////////////////>


function                                Send(/////////////////////////////////////////////////////////////>
                                        a_s                                                             //>
){                                      //////////////////////////////////////////////////////////////////>
 console.log( a_s );                                                                                    //>
 console.log( 'vvvvvvvvvvvvvv' );                                                                       //>
 chrome.tabs.query(                                                                                     //> https://developer.chrome.com/docs/extensions/reference/tabs/
  {//active        : true                                                                               //>
//,currentWindow : true                                                                                 //>
  }                                                                                                     //>
 ).then(  function(a){ Send_ToTabs(a ,a_s);     }                                                                             //>
 ).catch( function(e){ console.log("Err: "+ e); }                                                       //> Error: Error: Could not establish connection. Receiving end does not exist.
 );                                                                                                     //>
}//Send///////////////////////////////////////////////////////////////////////////////////////////////////>


document.addEventListener('DOMContentLoaded' ,restore_options);                                         //>
document.getElementById('inrangeGuiZoom'    ).oninput = function(){ Send('Z:'+ this.value); chrome.storage.local.set( {dZoom     : this.value} ,restore_options ); } //>
document.getElementById('inrangeGuiBright'  ).oninput = function(){ Send('B:'+ this.value); chrome.storage.local.set( {dBright   : this.value} ,restore_options ); } //>
document.getElementById('inrangeGuiContrast').oninput = function(){ Send('C:'+ this.value); chrome.storage.local.set( {dContrast : this.value} ,restore_options ); } //>

//End of file.