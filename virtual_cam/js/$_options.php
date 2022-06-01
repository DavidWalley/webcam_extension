<?php //$_options.php
//(c)2022 David C. Walley

function o($a){ echo $a."\n"; }

o('<!DOCTYPE html>'                                                                             );      //>
o('<html lang="en">'                                                                            );      //>
o( '<head><title>'. "Virtual Webcam Options" .'</title></head>'                                 );      //>
o( '<body>'                                                                                     );      //>
o(  "Virtual Webcam Options"                                                                    );      //>
//. o(  '<br><button id="'. 'buttonGoList' .'">'.            "1) Initialize List"      .'</button>' );      //>
//. o(  '<br><label for="'. 'selectSource' .'">'.            "2) Choose video source:" .'</label>'  );      //>
//. o(      '<select id="'. 'selectSource' .'"'                                                             //>
//. .            ' name="'. 'selectSource' .'">'                                                            //>
//. .       '</select>'                                                                             );      //>
//. o(  '<br><button id="'. 'buttonCamera' .'">'.            "3) Start Camera"         .'</button>' );      //>
//. o(  '<br><video  id="'. 'videoExample' .'" autoplay playsinline>'                  .'</video>'  );      //> Example of video element that might be found on someone's website.

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
.    ' id="'.        'inrangeGuiZoom'           .'"'                                                    //>
.    ' name="'.      'inrangeGuiZoom'           .'"'                                                    //>
.    ' min="0" max="100"'                                                                               //>
.    '><label for="'.'inrangeGuiZoom'           .'">'   ."Zoom"         .'</label>'             );      //>
o(   '<br>'                                                                                     );      //>
o(   '<input type="range"'                                                                              //>
.    ' id="'.        'inrangeGuiBright'         .'"'                                                    //>
.    ' name="'.      'inrangeGuiBright'         .'"'                                                    //>
.    ' min="0" max="100"'                                                                               //>
.    '><label for="'.'inrangeGuiBright'         .'">'   ."Brightness"   .'</label>'             );      //>
o(   '<br>'                                                                                     );      //>
o(   '<input type="range"'                                                                              //>
.    ' id="'.        'inrangeGuiContrast'       .'"'                                            );      //>
o(   ' name="'.      'inrangeGuiContrast'       .'"'                                            );      //>
o(   ' min="0" max="100"'                                                                               //>
.    '><label for="'.'inrangeGuiContrast'       .'">'   ."Contrast"     .'</label>'             );      //>
o(  '</div>'                                                                                    );      //>
o(  '<script src="options.js" type="application/javascript"></script>'                          );      //> Main application source money code.
o( '</body>'                                                                                    );      //>
o('</html>'                                                                                     );      //>

//End of file