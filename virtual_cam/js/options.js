//$_options.js_php - Javascript code with PHP macros, for testing Virtual Camera injection into list of available cameras.
// (c)2022 David C. Walley. Released under version 3 of the GNU General Public License (GPLv3). 

// Saves options to chrome.storage
function                                save_options(/////////////////////////////////////////////////////>
                                        a_d0                                                            //>
){                                      //////////////////////////////////////////////////////////////////>
// chrome.storage.local.set(                                                                              //>
//  {'dZoom' : ''+ a_d0                                                                              //>
//  }                                                                                                     //>
// ,function(){                                                                                           //> Update status to let user know options were saved.
//   console.log("Options saved. "+ a_d0);                                                                //>
//
//   restore_options();
//
//  }                                                                                                     //>
// );//set                                                                                                //>

// var                                    randm                   = Math.floor( Math.random()*1000 );     //>
// randm = a_d0
 console.log( "save: " + a_d0 );                                                                        //>
 chrome.storage.local.set(   {dZoom : a_d0}                                                                //>
 ,function(){                                                                                           //>
   restore_options();
  }//function                                                                                           //>
 );                                                                                                     //>
}//save_options///////////////////////////////////////////////////////////////////////////////////////////>


function                                restore_options(//////////////////////////////////////////////////> Restores select box and checkbox state using the preferences stored in chrome.storage.
){                                      //////////////////////////////////////////////////////////////////>
 chrome.storage.local.get( 'dZoom'                                                                        //>
 ,function(a){                                                                                         //>
   console.log("got: "+  a.dZoom);                                                              //>
   document.getElementById('inrangeGuiZoom').value = a.dZoom;                                       //> Set the slider to the given
  }                                                                                                     //>
 );                                                                                                     //>
}//restore_options////////////////////////////////////////////////////////////////////////////////////////>

document.addEventListener('DOMContentLoaded' ,restore_options);
//document.getElementById('save'              ).addEventListener( 'click' ,save_options );

document.getElementById('inrangeGuiZoom'    ).oninput = function(){ console.log(this.value); save_options(this.value); }
document.getElementById('inrangeGuiBright'  ).oninput = function(){ console.log(this.value); }
document.getElementById('inrangeGuiContrast').oninput = function(){ console.log(this.value); }

//End of file.