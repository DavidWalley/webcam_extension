//$_options.js_php - Javascript code with PHP macros, for testing Virtual Camera injection into list of available cameras.
// (c)2022 David C. Walley. Released under version 3 of the GNU General Public License (GPLv3). 

function                                restore_options(//////////////////////////////////////////////////> Restores select box and checkbox state using the preferences stored in chrome.storage.
){                                      //////////////////////////////////////////////////////////////////>
 chrome.storage.local.get( 'dZoom'    ,function(a){ console.log("restore_options: "+ a.dZoom    ); document.getElementById('inrangeGuiZoom'    ).value = a.dZoom    ; } );
 chrome.storage.local.get( 'dBright'  ,function(a){ console.log("restore_options: "+ a.dBright  ); document.getElementById('inrangeGuiBright'  ).value = a.dBright  ; } );
 chrome.storage.local.get( 'dContrast',function(a){ console.log("restore_options: "+ a.dContrast); document.getElementById('inrangeGuiContrast').value = a.dContrast; } );
}//restore_options////////////////////////////////////////////////////////////////////////////////////////>


function                                save_options(/////////////////////////////////////////////////////>  Saves options to chrome.storage.local
                                        a_sWhich                                                        //>
,                                       a_d0                                                            //>
){                                      //////////////////////////////////////////////////////////////////>
// var                                    dGuiZoom       = document.getElementById('inrangeGuiZoom'    ); //>
// var                                    dGuiBright     = document.getElementById('inrangeGuiBright'  ); //>
// var                                    dGuiContrast   = document.getElementById('inrangeGuiContrast'); //>
// switch( a_sWhich ){                                                                                    //>
// case       'Zoom'    : dGuiZoom     = a_d0;                                                            //>
// break;case 'Bright'  : dGuiBright   = a_d0;                                                            //>
// break;case 'Contrast': dGuiContrast = a_d0;                                                            //>
// }//switch                                                                                              //>
// console.log( "save_options: " + a_sWhich +' '+ a_d0 );                                                 //>
//
// chrome.storage.local.set( {dZoom : dGuiZoom} ,restore_options );                                       //> DEBUG - should get same value as just saved.

 switch( a_sWhich ){                                                                                    //>
 case       'Zoom'    : chrome.storage.local.set( {dZoom     : a_d0} ,restore_options );                                       //> DEBUG - should get same value as just saved.
 break;case 'Bright'  : chrome.storage.local.set( {dBright   : a_d0} ,restore_options );                                       //> DEBUG - should get same value as just saved.
 break;case 'Contrast': chrome.storage.local.set( {dContrast : a_d0} ,restore_options );                                       //> DEBUG - should get same value as just saved.
 }//switch                                                                                              //>

}//save_options///////////////////////////////////////////////////////////////////////////////////////////>


document.addEventListener('DOMContentLoaded' ,restore_options);
document.getElementById('inrangeGuiZoom'    ).oninput = function(){ console.log('Zoom'    + this.value); chrome.storage.local.set( {dZoom     : this.value} ,restore_options ); } //save_options('Zoom'    ,this.value); }
document.getElementById('inrangeGuiBright'  ).oninput = function(){ console.log('Bright'  + this.value); chrome.storage.local.set( {dBright   : this.value} ,restore_options ); } //save_options('Bright'  ,this.value); }
document.getElementById('inrangeGuiContrast').oninput = function(){ console.log('Contrast'+ this.value); chrome.storage.local.set( {dContrast : this.value} ,restore_options ); } //save_options('Contrast',this.value); }

//End of file.