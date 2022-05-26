<?php // $_index.php - Test page for Flag virtual webcam.

echo '<!DOCTYPE html>';
echo '<html lang="en">';
echo  '<head>';
echo   '<meta charset="UTF-8">';
echo   '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
echo   '<meta http-equiv="X-UA-Compatible" content="ie=edge">';
echo   '<title>Camera selection</title>';
echo  '</head>';
echo  '<body>';
echo   'Camera selection example page';
echo   '<br><button id="button0">1) Initialize List'     .'</button>';
echo   '<br><label for="select0">2) Choose video source:'.'</label>' ;
echo       '<select id="select0" name="select0">'        .'</select>';
echo   '<br><button id="button1">3) Start Camera'        .'</button>';
echo   '<br><video  id="video0" autoplay playsinline>'   .'</video>' ;

/*DEV*/  echo '<script src="./$_main.js_php" type="application/javascript"></script>';                  //> Main application source money code.
//*PRO*/ echo '<script src="./main.js" type="application/javascript"></script>';                        //> Main application compiled code.

echo  '</body>';
echo '</html>';

//End of file.