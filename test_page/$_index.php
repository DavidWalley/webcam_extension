<?php // test_page/$_index.php - Localhost test page for Flag virtual webcam.
// (c)2022 David C. Walley. Released under version 3 of the GNU General Public License (GPLv3). 

echo '<!DOCTYPE html>';                                                                                 //>
echo '<html lang="en">';                                                                                //>
echo  '<head>';                                                                                         //>
echo   '<meta charset="UTF-8">';                                                                        //>
echo   '<meta name="viewport" content="width=device-width, initial-scale=1.0">';                        //>
echo   '<meta http-equiv="X-UA-Compatible" content="ie=edge">';                                         //>
echo   '<title>Camera selection</title>';                                                               //>
echo  '</head>';                                                                                        //>
echo  '<body>';                                                                                         //>
echo   "Camera selection localhost test page";                                                          //>
echo   '<br><button id="buttonGoList">'.                    "1) Initialize List"      .'</button>';     //>
echo   '<br><label for="selectSource">'.                    "2) Choose video source:" .'</label>' ;     //>
echo       '<select id="selectSource" name="selectSource">'                           .'</select>';     //>
echo   '<br><button id="buttonCamera">'.                    "3) Start Camera"         .'</button>';     //>
echo   '<br><video  id="videoExample" autoplay playsinline>'                          .'</video>' ;     //> Example of video element that might be found on someone's website.
                                                                                                        //>
/*DEV*/  echo '<script src="./$_main.js_php" type="application/javascript"></script>';                  //> Main application source money code.
//*PRO*/ echo '<script src="./main.js" type="application/javascript"></script>';                        //> Main application compiled code.
                                                                                                        //>
echo  '</body>';                                                                                        //>
echo '</html>';                                                                                         //>
                                                                                                        //>
//End of file.