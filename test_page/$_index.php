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
echo   'Camera selection example';
echo   '<br>';
echo   '<button id="button0">Start Camera</button>';
echo   '<br>';
echo   '<select id="select0"></select>';
echo   '<br>';
echo   '<video id="video0" autoplay playsinline></video>';
/*DEV*/  echo '<script src="./$_main.js_php" type="application/javascript"></script>';                  //> Main application source money code.
//*PRO*/ echo '<script src="./main.js" type="application/javascript"></script>';                        //> Main application compiled code.
echo  '</body>';
echo '</html>';

//End of file.