//popup.js

var ele = document.getElementById('buttonPopup');

ele.addEventListener('click', myFunction);

function                                myFunction(////////////////////////////
){                                      //////////////////////////////
 alert('Send');   

//. console.log(   window.chrome                                                          );
//. console.log(   window.chrome.extension                                                );
//. console.log(   window.chrome.storage                                                  );
//. console.log(   window.chrome.storage.local                                            );
//. console.log(   window.chrome.storage.local.set( {'webcam_extension_1': "what up"} )   );

chrome.storage.local.set( {'webcam_extension_1': "HOWDY?"} );


chrome.tabs.sendMessage( tabs[0].id ,{'newClass' : "howdee"} ); //?



["blue","orange","grey"].forEach(addListenerFor);      //> https://stackoverflow.com/questions/37622345/how-to-have-chrome-extension-button-communicate-with-injected-js#37634207

//. function addListenerFor(color) {
//.   document.getElementById(color)
//.     .addEventListener(click,turnPage.bind(undefined,color);
//. }
//. 
//. function turnPage(color) {
//.   chrome.tabs.query({"active": true, "currentWindow": true}, function(tabs) {
//.     chrome.tabs.sendMessage(tabs[0].id, {"newClass": "mdl-color--"+color});
//.   });
//. }


//. chrome.storage.local.get(['webcam_extension_1']
//. ,function(data) {
//.   console.log( data );
//. //  h1.textContent   = data.user_name
//. //  timerInput.value = data.break_time
//. //  urlInput.value   = data.redirect_url
//. //  phoneInput.value = data.phone_number
//. //
//. //  if (!data.isPaused) {
//. //    updateCountdown();
//. //    countdownInterval = setInterval(updateCountdown, 100);
//. //    isNotPausedDisplay();
//. //  } else {
//. //    chrome.storage.local.get('pausedCount', function(data) {
//. //      counterElement.innerHTML = secToMin(data.pausedCount);
//. //    });
//. //    isPausedDisplay();
//. //  }
//.   
//.  }//function
//. );

// setTimeout(
//  function() {
//   document.dispatchEvent(
//    new CustomEvent('RW759_connectExtension', {  detail: "heyhhey" } )
//   );
//  }
// ,0
// );
 alert('SENT');   
}//my///////////////////////////////////////

//End of file