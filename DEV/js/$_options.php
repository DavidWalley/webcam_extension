<?php //$_options.php
//(c)2022 David C. Walley

function o($a){ echo $a."\n"; }

o('<!DOCTYPE html>'                                                                             );      //>
o('<html lang="en">'                                                                            );      //>
o( '<head><title>'. "Virtual Webcam Options" .'</title></head>'                                 );      //>
o( '<body>'                                                                                     );      //>
o(  "Virtual Webcam Options"                                                                    );      //>
o(  '<span id="'. 'divWebcam_Extension_FlagBefore'      .'"'                                            //>
.   ' style="'                          .'cursor'               .':pointer'                             //>
.                                       ';width'                .':4rem'                                //>
.                                       ';font-size'            .':2em'                                 //>
.                                       ';font-weight'          .':bold'                                //>
.   '">'                                                                                                //>
.    " < "                                                                                              //>
.   '</span>');                                                                                         //>
o(  '<span id="'. 'divWebcam_Extension_FlagNext'        .'"'                                            //>
.   ' style="'                          .'cursor'               .':pointer'                             //>
.                                       ';width'                .':4rem'                                //>
.                                       ';font-size'            .':2em'                                 //>
.                                       ';font-weight'          .':bold'                                //>
.   '">'                                                                                                //>
.    " > "                                                                                              //>
.   '</span>');                                                                                         //>
o(  '<br>'                                                                                      );      //>
o(  '<div>'                                                                                     );      //>
o(   '<input type="range"'                                                                              //>
.    ' id="'.        'inrangeZoom'           .'"'                                                       //>
.    ' name="'.      'inrangeZoom'           .'"'                                                       //>
.    ' min="0" max="100"'                                                                               //>
.    '><label for="'.'inrangeZoom'           .'">'   ."Zoom"         .'</label>'                );      //>
o(   '<br>'                                                                                     );      //>
o(   '<input type="range"'                                                                              //>
.    ' id="'.        'inrangeBright'         .'"'                                                       //>
.    ' name="'.      'inrangeBright'         .'"'                                                       //>
.    ' min="0" max="100"'                                                                               //>
.    '><label for="'.'inrangeBright'         .'">'   ."Brightness"   .'</label>'                );      //>
o(   '<br>'                                                                                     );      //>
o(   '<input type="range"'                                                                              //>
.    ' id="'.        'inrangeContrast'       .'"'                                               );      //>
o(   ' name="'.      'inrangeContrast'       .'"'                                               );      //>
o(   ' min="0" max="100"'                                                                               //>
.    '><label for="'.'inrangeContrast'       .'">'   ."Contrast"     .'</label>'                );      //>
o(  '</div>'                                                                                    );      //>
o(  '<script src="options.js" type="application/javascript"></script>'                          );      //> Main application source money code.
o( '</body>'                                                                                    );      //>
o('</html>'                                                                                     );      //>

//End of file