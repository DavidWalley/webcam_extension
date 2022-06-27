//# Bulk of JS code script for running virtual webcam, changing incoming camera stream to editted outgoing stream.  (c)2022 David C. Walley.
'use strict';                                                                                           

function                                G_ele( // Code convenience.
a){ return document.getElementById(a); }                  

function                                G_nMOD( // Correction to JavaScript's so-called modulus operation (JS has negative remainders).
                                        a_n                                                              // Number.
,                                       a_nModulus                                                       // Modulus to use.
){                                      
return ( (a_n%a_nModulus) + a_nModulus )%a_nModulus;                                                    
}


                                                                                                        //# Globals shared among files and languages:
var                                 $_sTITLE                = "Easy Meeting Webcam Plus";           
var                                 $_sLINK                 = "davidwalley.ca/webcam";              
var                                 $_sIDrANGEzOOM          = 'inrangeZoom'                 ;       
var                                 $_sIDrANGEsIZE          = 'inrangeSize'                 ;       
var                                 $_sIDrANGEbRIGHT        = 'inrangeBright'               ;       
var                                 $_sIDrANGEcONTRAST      = 'inrangeContrast'             ;       
var                                 $_sOPTIONzOOM           = 'optZoom'                     ;       
var                                 $_sOPTIONsIZE           = 'optSize'                     ;       
var                                 $_sOPTIONbRIGHT         = 'optBright'                   ;       
var                                 $_sOPTIONcONTRAST       = 'optContrast'                 ;       
var                                 $_sOPTIONfLAG           = 'optFlag'                     ;       
var                                 $_sIDbUTTONgRABgO       = 'buttonGrabGo'                ;       
var                                 $_sIDbUTTONsANPsHOT_B   = 'buttonSnapshot_B'            ;       
var                                 $_sIDbUTTONsANPsHOT_F   = 'buttonSnapshot_F'            ;       
var                                 $_sIDdIVhOLD            = 'divHold'                     ;       
var                                 $_sIDvIDEOgRAB          = 'videoGrab'                   ;       
var                                 $_sIDdIVcROP_           = 'divCrop_'                    ;       
var                                 $_sIDdIVcONFIRM         =    'divConfirm'               ;       
var                                 $_sIDcANVAScONFIRM      = 'canvasConfirm'               ;       
var                                 $_sIDbUTTONcONFIRMoK    = 'buttonConfirmOk'             ;       
var                                 $_sIDbUTTONcONFIRMnO    = 'buttonConfirmNo'             ;       
var                                 $_sIDdIVfLAGbEFORE      = 'divFlagBefore'               ;       
var                                 $_sIDdIVfLAGnEXT        = 'divFlagNext'                 ;       
var                                 $_sIDiNtEXTeDGE_T       = 'intextEdge_T'                ;       
var                                 $_sIDiNtEXTeDGE_L       = 'intextEdge_L'                ;       
var                                 $_sIDiNtEXTeDGE_R       = 'intextEdge_R'                ;       
var                                 $_sIDbUTTONsHOWeDGES    = 'buttonEdges'                 ;       
var                                 $_sIDiNtEXTnEWS         = 'intextNews'                  ;       
var                                 $_sIDbUTTONsHOWnEWS     = 'buttonNews'                  ;       
var                                 $_sELEvIDEOiN           = 'g_eleVideoIn'                ;       
var                                 $_sELEcANVASoUT         = 'g_eleCanvasOut'              ;       
var                                 $_sCONTEXT2DoUT         = 'g_context2dOut'              ;       
var                                 $_sIDdIVfLAGdATA        = 'divEasyMeetingVirtual_data'  ;       
var                                 $_sATTRIBUTE_OPTIONS    = 'g_optionsmessage'            ;       
var                                 $_sATTRIBUTE_OPEN       = 'g_optionsopen'               ;       
var                                     g_bStopTick      = g_bStopTick    || window[ 'g_bStopTick'   ];  // Flag to halt periodic processing.
                                                                                                        //# Video element and related objects are global for optimization - reducing garbage collection:
var                                     g_eleVideoIn     = g_eleVideoIn   || window[ $_sELEvIDEOiN   ];  // Use global DOM video element to accept camera input stream.
var                                       g_bVideoReady  = g_bVideoReady  || window[ 'g_bVideoReady' ];  // Flag that video input has started.
let                                       g_nVideoInW           = 800  ;                                 // Video Input and Canvas Output width and
let                                       g_nVideoInH           = 600  ;                                 // height.
                                                                                                        //# Canvas output element and related objects are global for optimization - reducing garbage collection:
var                                     g_eleCanvasOut   = g_eleCanvasOut || window[ $_sELEcANVASoUT ];  // Use the global offscreen canvas object for output.
var                                     g_context2dOut          = null;                                  // Set up output by drawing background + video frame in quick operations.
var                                     g_imagedataOut          = null;                                  // We need this intermediate result for changing pixel data of the whole output canvas at the end.
var                                            g_abOut          = null;                                  // Pixel color data array of the imageData object
let                                       g_nCanvasOutW         = 800  ;                                 // Video Input and Canvas Output width and
let                                       g_nCanvasOutH         = 600  ;                                 // height.
let                                     g_eleCanvasBack         = null ;                                 // Background image - gradient + latest screen capture snapshot.
let                                     g_context2dBack         = null ;                                
let                                     g_imagedataBack         = null ;                                
let                                            g_abBack         = null ;                                
let                                     g_eleCanvas1Flag        = null ;                                 // Image to insert into corner - normally a flag.
let                                     g_context2d1Flag        = null ;                                
let                                     g_imagedata1Flag        = null ;                                
let                                            g_ab1Flag        = null ;                                
const                                   g_dFLAGsIZE_1           =   0.35;                                // Amount of width or height of output used by flag.
let                                     g_eleCanvasAllFlags     = null ;                                 // To be created canvas, holding an image of 8 selectable flags, initialized from a data URI text string.
let                                     g_iFlag                 =   1  ;                                 // Index to current flag image.
let                                     g_d1_Zoom               =   1  ;                                 // Inverse zoom factor of video, 1 to 1/3.
let                                     g_dInlay                =   1  ;                                 // Size of video output area by width of output canvas.
let                                     g_dBright               =   0  ;                                 // Video brightness adjustment.
let                                     g_dContrast             =   0  ;                                 // Video contrast adjustment.
let                                     g_abAdjust              = []   ;                                 // A table for quick conversions of color levels.
let                                     g_sHeadlineText_T       = ""   ;                                 // Headline text, at top of background.
let                                     g_sHeadlineText_L       = ""   ;                                 // Text on left side of background.
let                                     g_sHeadlineText_R       = ""   ;                                 // Text on right side of background.
let                                     g_sScrollText           = ""   ;                                 // Message to scroll across screen,
let                                     g_whenScrollText_ms     =   0  ;                                 // Time to start scrolling.
let                                     g_whenGo_ms             = null ;                                 // Start time of periodic routine.

function                                EdgeText(
                                        a_context2d                                                     
){                                      
 var                                    dY                      = Math.floor(0.1 * g_nCanvasOutH);      
 a_context2d.lineWidth   = Math.floor(0.005*g_nCanvasOutH);                                             
 a_context2d.strokeStyle = 'rgba(255,255,255 ,1)';                                                      
 a_context2d.fillStyle   = 'rgba(  0,  0,  0 ,1)';                                                      
 a_context2d.font        = '100px sans-serif';                                                          
 var                                    d       = a_context2d.measureText(g_sHeadlineText_T).width;     
 var                                    dMax    = g_nCanvasOutH*0.15;                                   
 d = 82*g_nCanvasOutW/(d+0.001);                                                                        
 if( dMax < d ){ d = dMax; }                                                                            
 a_context2d.font        = Math.floor(d) +'px sans-serif';                                              
 d = a_context2d.measureText(g_sHeadlineText_T).width;                                                  
 d = ( g_nCanvasOutW - d )/2;                                                                           
 a_context2d.strokeText(    g_sHeadlineText_T  ,d  ,  g_nCanvasOutH*0.13   );                           
 a_context2d.fillText(      g_sHeadlineText_T  ,d  ,  g_nCanvasOutH*0.13   );                           
 a_context2d.font        = '100px sans-serif';                                                          
 d = a_context2d.measureText(g_sHeadlineText_L).width;                                                  
 d = 95*g_nCanvasOutH/(d+0.001);                                                                        
 if( dMax < d ){ d = dMax; }                                                                            
 a_context2d.font        = Math.floor(d) +'px sans-serif';                                              
 d = a_context2d.measureText(g_sHeadlineText_L).width;                                                  
 d = ( g_nCanvasOutH - d )/2;                                                                           
 a_context2d.rotate( Math.PI/2 );                                                                       
  a_context2d.strokeText(    g_sHeadlineText_L  ,d  , -g_nCanvasOutW*0.03   );                          
  a_context2d.fillText(      g_sHeadlineText_L  ,d  , -g_nCanvasOutW*0.03   );                          
 a_context2d['resetTransform']();                                                                       
 a_context2d.font        = '100px sans-serif';                                                          
 d = a_context2d.measureText(g_sHeadlineText_R).width;                                                  
 d = 95*g_nCanvasOutH/(d+0.001);                                                                        
 if( dMax < d ){ d = dMax; }                                                                            
 a_context2d.font        = Math.floor(d) +'px sans-serif';                                              
 d = a_context2d.measureText(g_sHeadlineText_R).width;                                                  
 d = ( g_nCanvasOutH - d )/2;                                                                           
 a_context2d.rotate( Math.PI/2 );                                                                       
  a_context2d.strokeText(    g_sHeadlineText_R  ,d  , -g_nCanvasOutW*0.93   );                          
  a_context2d.fillText(      g_sHeadlineText_R  ,d  , -g_nCanvasOutW*0.93   );                          
 a_context2d['resetTransform']();                                                                       
}



function                                BackFill( // Fill the background canvas with a gradient.
){                                      
 g_context2dBack = g_eleCanvasBack.getContext('2d');                                                    
 g_context2dBack.globalAlpha = 1.0;                                                                     
 var                                    lineargradient          = g_context2dBack.createLinearGradient( 
                                                                      0          ,   0                  
                                                                  ,g_nCanvasOutW ,g_nCanvasOutH         
                                                                  );                                    
 lineargradient.addColorStop( 0 ,'rgba(  0 ,188 ,212 ,1)' );                                            
 lineargradient.addColorStop( 1 ,'rgba(238 ,218 ,130 ,1)' );                                            
 g_context2dBack.fillStyle = lineargradient;                                                            
 g_context2dBack.fillRect(    0,0   ,g_nCanvasOutW ,g_nCanvasOutH );                                    
 g_imagedataBack = g_context2dBack.getImageData( 0 ,0 ,g_nCanvasOutW ,g_nCanvasOutH );                  
        g_abBack = g_imagedataBack.data;                                                                
}


let                                     g_imageFromOptions      = null;                                  // Background image.

function                                OnLoadImageFromOptions_Back( // Draw background image onto global background canvas.
){                                      
 if( !g_imageFromOptions ){                                                                     return;}
 var                                    nSourceW                = g_imageFromOptions.width ;            
 var                                    nSourceH                = g_imageFromOptions.height;            
 var                                    dDestinationL           = 0;                                    
 var                                    dDestinationW           = g_nCanvasOutW;                        
 var                                    dDestinationH           = g_nCanvasOutH;                        
 if( nSourceW/nSourceH < dDestinationW/dDestinationH ){                                                 
  dDestinationW = Math.floor(    dDestinationH*nSourceW/nSourceH +0.5   );                              
  dDestinationL = Math.floor(   (g_nCanvasOutW - dDestinationW)/2       );                              
 }else{                                                                                                 
  dDestinationH = Math.floor(    dDestinationW*nSourceH/nSourceW +0.5   );                              
 }
 g_context2dBack.globalAlpha = 1.0;                                                                     
 var                                    lineargradient          = g_context2dBack.createLinearGradient( 
                                                                      0          ,   0                  
                                                                  ,g_nCanvasOutW ,g_nCanvasOutH         
                                                                  );                                    
 lineargradient.addColorStop( 0 ,'rgba(  0 ,188 ,212 ,1)' );                                            
 lineargradient.addColorStop( 1 ,'rgba(238 ,218 ,130 ,1)' );                                            
 g_context2dBack.fillStyle = lineargradient;                                                            
 g_context2dBack.fillRect(    0,0   ,g_nCanvasOutW ,g_nCanvasOutH );                                    
 g_context2dBack.drawImage( g_imageFromOptions                                                          
 ,  0           ,0   ,nSourceW      ,nSourceH                                                           
 ,dDestinationL ,0   ,dDestinationW ,dDestinationH                                                      
 );                                                                                                     
 g_imagedataBack = g_context2dBack.getImageData( 0 ,0 ,g_nCanvasOutW ,g_nCanvasOutH );                  
        g_abBack = g_imagedataBack.data;                                                                
}



function                                Set1FlagFromFlags( // Draw copy of a flag into special canvas (to be inserted into image pixel-by-pixel).
){                                      
 if( !g_eleCanvasAllFlags ){                                                                    return;}
 if( !g_eleCanvas1Flag    ){ g_eleCanvas1Flag = document.createElement('canvas'); }                     
 var                                    nW                 = Math.floor( g_nCanvasOutW*g_dFLAGsIZE_1 ); 
 var                                    nH                 = Math.floor( g_nCanvasOutH*g_dFLAGsIZE_1 ); 
 if( nW < 1.667*nH ){ nH = Math.floor( nW/1.667 ); }                                                    
 else               { nW = Math.floor( nH*1.667 ); }                                                    
 g_eleCanvas1Flag.width  = nW;                                                                          
 g_eleCanvas1Flag.height = nH;                                                                          
 g_iFlag = window.G_nMOD( g_iFlag ,21 );                                                                
 if( g_iFlag <= 0 ){   g_ab1Flag = null;                                                        return;}
 var                                    i                       = ([0                                   
                                                                   ,1                                   
                                                                   ,2                                   
                                                                   ,7                                   
                                                                   ,6                                   
                                                                   ,10                                  
                                                                   ,9                                   
                                                                   ,8                                   
                                                                   ,3                                   
                                                                   ,5                                   
                                                                   ,11                                  
                                                                   ,4                                   
                                                                   ,12                                  
                                                                   ,13                                  
                                                                   ,14                                  
                                                                   ,15                                  
                                                                   ,16                                  
                                                                   ,18                                  
                                                                   ,17                                  
                                                                   ,19                                  
                                                                  ])[g_iFlag - 1];                      
 var                                    g_context2d1Flag  = g_eleCanvas1Flag.getContext('2d');          
 var                                    iSL               = Math.floor( i/5                          ); 
 var                                    iST               = Math.floor( i%5                          ); 
 var                                    nSW               = Math.floor( g_eleCanvasAllFlags.width /4 ); 
 var                                    nSH               = Math.floor( g_eleCanvasAllFlags.height/5 ); 
 g_context2d1Flag.drawImage( g_eleCanvasAllFlags                                                        
 ,iSL*nSW    ,iST*nSH                                                                                   
 ,    nSW    ,    nSH                                                                                   
 ,0 ,0   ,nW ,nH                                                                                        
 );                                                                                                     
 g_imagedata1Flag = g_context2d1Flag.getImageData( 0,0 ,nW,nH );                                        
 g_ab1Flag        = g_imagedata1Flag.data;                                                              
}



function                                GoAdjust( // Construct a table for quick conversions of color levels.
                                        a_dBright                                                       
,                                       a_dContrast                                                     
){                                      
 var                                    dF                      = 259*(255 + a_dContrast)               
                                                                 /255/(259 - a_dContrast);              
 for( var i = 0; i <= 255; i++ ){                                                                       
  g_abAdjust[i] = Math.floor( 128 + dF*(i-128) + a_dBright );                                           
  if( g_abAdjust[i] < 0                  ){ g_abAdjust[i] =   0; }                                      
  if(                255 < g_abAdjust[i] ){ g_abAdjust[i] = 255; }                                      
 }
}



function                                OnLoadImageFromOptions_Flag( // Draw flag image onto global flag canvas.
){                                      
 var                                    g_context2d1Flag        = g_eleCanvas1Flag.getContext('2d');    
 if( !g_imageFromOptions ){                                                                     return;}
 g_context2d1Flag.drawImage( g_imageFromOptions                                                         
 ,0 ,0                                                                                                  
 ,g_imageFromOptions.width                                                                              
 ,g_imageFromOptions.height                                                                             
 ,0 ,0                                                                                                  
 ,g_eleCanvas1Flag.width                                                                                
 ,g_eleCanvas1Flag.height                                                                               
 );                                                                                                     
 g_imagedata1Flag = g_context2d1Flag.getImageData(0,0,g_eleCanvas1Flag.width,g_eleCanvas1Flag.height);  
 g_ab1Flag        = g_imagedata1Flag.data;                                                              
}



function                                Tick_DataFromOptions( // Get possible data from the messaging DOM element (between injected script and options page).
){                                      
 var                                    eleDivInjectData = document.getElementById( $_sIDdIVfLAGdATA ); 
 if( !eleDivInjectData ){                                                                       return;}
 var                                    sData                   = eleDivInjectData.innerText.trim();    
 if( '' === sData ){                                                                            return;}
 var                                    sType                   = sData.slice(0,7);                     
 sData = sData.slice(8);                                                                                
 var                                    ob                      = null;                                 
 if(   'js_opts' === sType                                                                              
  ||   'js_edge' === sType                                                                              
   ||  'js_news' === sType                                                                              
 ){                                                                                                     
  try{                                                                                                  
   ob = JSON.parse(sData);                                                                              
  }catch(e){   
return;                                                                                                 
 }}
 switch( sType ){                                                                                       
 case       'js_edge':                                                                                  
  g_sHeadlineText_T =     ( ob['sText_T'] )      ;                                                      
  g_sHeadlineText_T = g_sHeadlineText_T.split('~1').join(' ');                                          
  g_sHeadlineText_T = g_sHeadlineText_T.split('~0').join('~');                                          
  g_sHeadlineText_L = (   ( ob['sText_L'] )     );                                                      
  g_sHeadlineText_L = g_sHeadlineText_L.split('~1').join(' ');                                          
  g_sHeadlineText_L = g_sHeadlineText_L.split('~0').join('~');                                          
  g_sHeadlineText_R = (   ( ob['sText_R'] )     );                                                      
  g_sHeadlineText_R = g_sHeadlineText_R.split('~1').join(' ');                                          
  g_sHeadlineText_R = g_sHeadlineText_R.split('~0').join('~');                                          
 break;case 'js_news':                                                                                  
  g_sScrollText     = (   ( ob['sText'  ] ).split('~1').join(' ')   ).split('~0').join('~');            
  g_whenScrollText_ms = Date.now();                                                                     
 break;case 'js_opts':                                                                                  
   if( ob[$_sOPTIONzOOM    ] ){ g_d1_Zoom  =Math.pow( 3,-parseFloat(ob[$_sOPTIONzOOM    ])*0.01    ); } 
   if( ob[$_sOPTIONsIZE    ] ){ g_dInlay   =         1 - parseFloat(ob[$_sOPTIONsIZE    ])*0.01     ; } 
   if( ob[$_sOPTIONbRIGHT  ] ){ g_dBright  =             parseFloat(ob[$_sOPTIONbRIGHT  ])*2. -100  ; } 
   if( ob[$_sOPTIONcONTRAST] ){ g_dContrast=3*(          parseFloat(ob[$_sOPTIONcONTRAST])    - 50 ); } 
   GoAdjust( g_dBright ,g_dContrast );                                                                  
   var                                  g_dFlagWas              = g_iFlag;                              
   if( ob[$_sOPTIONfLAG    ] ){ g_iFlag    =     G_nMOD( parseInt(  ob[$_sOPTIONfLAG],10) ,21      ); } 
   if( g_dFlagWas !== g_iFlag ){ Set1FlagFromFlags(); }                                                 
 break;case 'datau_B': case 'datau_F':                                                                  
  if( 'data:' !== sData.slice(0,5) ){                                                                   
 break;                                                                                                 
  }
  g_imageFromOptions        = new Image();                                                              
  g_imageFromOptions.onload = function(){                                                               
                               if(      'datau_B' === sType ){ OnLoadImageFromOptions_Back(); }         
                               else if( 'datau_F' === sType ){ OnLoadImageFromOptions_Flag(); }         
                              }
  g_imageFromOptions.src    = sData;                                                                    
 break;default:                                                                                         
 }
 eleDivInjectData.innerText = '';                                                                       
}



function                                GoFlagData( // Initialize flag image pixel data.
){                                      
 g_ab1Flag = null;                                                                                      
 if( g_eleCanvas1Flag   &&   0 < g_iFlag ){                                                             
  g_context2d1Flag = g_eleCanvas1Flag.getContext('2d');                                                 
  g_imagedata1Flag = g_context2d1Flag.getImageData(                                                     
                      0,0                                                                               
                     ,g_context2d1Flag.canvas.width                                                     
                     ,g_context2d1Flag.canvas.height                                                    
                     );                                                                                 
  g_ab1Flag        = g_imagedata1Flag.data;                                                             
 }
}



function                                Tick_PixelEdit( // Periodic direct manipulation of pixel data.
                                        a_nDL                                                           
,                                       a_nDT                                                           
,                                       a_nDW                                                           
,                                       a_nDH                                                           
){                                      
 g_imagedataOut = g_context2dOut.getImageData(0,0,g_nCanvasOutW,g_nCanvasOutH);                         
 g_abOut        = g_imagedataOut.data;                                                                  
 var                                    nDR                     = a_nDL + a_nDW;                        
 var                                    r                       =               0  ;                    
 var                                    g                       =               0  ;                    
 var                                    b                       =               0  ;                    
 var                                    k                       =               0  ;                    
 var                                    kFlag                   =              -1  ;                    
 var                                    nFlagW               =                 g_eleCanvas1Flag.width ; 
 var                                    nFlagT               = g_nCanvasOutH - g_eleCanvas1Flag.height; 
 const                                  nROW                    = 4  *g_nCanvasOutW;                    
 var                                    iRow                    =               0  ;                    
 var                                    iCell                   =               0  ;                    
 var                                    bCellInVideo            =             false;                    
 var                                    bCellInFlag             =             false;                    
 var                                    whenNow_ms              = Date.now() - g_whenGo_ms;             
 for(  iCell = 0; iCell < g_nCanvasOutW; iCell++ ){                                                     
  k = 4*iCell;                                                                                          
  bCellInVideo = (       a_nDL <= iCell   &&   iCell < nDR      );                                      
  bCellInFlag  = (   null !== g_ab1Flag   &&   iCell < nFlagW   );                                      
  var                                   dCell                   = iCell/g_nCanvasOutW/g_dFLAGsIZE_1;    
  var                            nFlutter = iCell*( 0.015*Math.sin(  2.2*(dCell - 0.00017*whenNow_ms) ) 
                                                  + 0.010*Math.sin(  7.0*(dCell - 0.00013*whenNow_ms) ) 
                                                  + 0.008*Math.sin( 10.0*(dCell - 0.00022*whenNow_ms) ) 
                                                  );                                                    
  var                                   nSun               = Math.floor( 5000*nFlutter/g_nCanvasOutH ); 
  nFlutter = Math.floor( 3*nFlutter + nFlagT );                                                         
  for( iRow  = 0; iRow < g_nCanvasOutH; iRow++ ){                                                       
   if( bCellInVideo   &&   (a_nDT <= iRow) ){                                                           
    r = g_abAdjust[   g_abOut[k    ]   ];                                                               
    g = g_abAdjust[   g_abOut[k + 1]   ];                                                               
    b = g_abAdjust[   g_abOut[k + 2]   ];                                                               
   }else{                                                                                               
    r =              g_abBack[k    ];                                                                   
    g =              g_abBack[k + 1];                                                                   
    b =              g_abBack[k + 2];                                                                   
   }
   if( bCellInFlag   &&   (nFlutter <= iRow) ){                                                         
    kFlag = ( (iRow - nFlutter)*nFlagW + iCell )*4;                                                     
    if( g_ab1Flag.length < kFlag ){                                                                     
     bCellInFlag = false;                                                                               
    }else{                                                                                              
     r = r*0.3 + g_ab1Flag[kFlag    ]*0.7 - nSun;                                                       
     g = g*0.3 + g_ab1Flag[kFlag + 1]*0.7 - nSun;                                                       
     b = b*0.3 + g_ab1Flag[kFlag + 2]*0.7 - nSun;                                                       
   }}
   g_abOut[ k     ] = ( r <= 0 )?0   :(   ( 255 <= r )?255 :Math.floor( r )   );                        
   g_abOut[ k + 1 ] = ( g <= 0 )?0   :(   ( 255 <= g )?255 :Math.floor( g )   );                        
   g_abOut[ k + 2 ] = ( b <= 0 )?0   :(   ( 255 <= b )?255 :Math.floor( b )   );                        
   g_abOut[ k + 3 ] =                                  255;                                             
   k += nROW;                                                                                           
 }}
 g_context2dOut.putImageData( g_imagedataOut ,0 ,0 );                                                   
}


let                                     g_whenWas_ms            =  -1;                                   // Time of previous run of periodic routine.
let                                     g_tookTickDecay_ms      = 100;                                   // Decaying running average of time periodic routine took to run once.
let                                     g_tookEndDecay_ms       = 100;                                   // 
let                                     g_nTicks                =   0;                                   // 

function                                Tick( // Main periodic routine.
){                                      
 if(  g_bStopTick      ){ Go_Tick();                                                            return;}
 if( !g_eleCanvasOut   ){                      requestAnimationFrame(Tick);                     return;}
 if( !g_eleCanvas1Flag ){ Set1FlagFromFlags(); requestAnimationFrame(Tick);                     return;}
 var                                    whenNow_ms              = Date.now();                           
 g_nTicks++;                                                                                            
 Tick_DataFromOptions();                                                                                
 if( null === g_context2dOut ){                                                                         
  g_context2dOut = g_eleCanvasOut.getContext('2d');                                                     
  g_imagedataOut = g_context2dOut.getImageData(0,0,g_nCanvasOutW,g_nCanvasOutH);                        
  g_abOut        = g_imagedataOut.data;                                                                 
 }
 g_context2dOut.globalAlpha = 1.0;                                                                      
 if( g_bVideoReady   &&   0 < g_dInlay ){                                                               
  var                                   nSW                     =  g_nVideoInW * g_d1_Zoom;             
  var                                   nSH                     =  g_nVideoInH * g_d1_Zoom;             
  var                                   nSL                     = (g_nVideoInW - nSW)/2   ;             
  var                                   nST                     = (g_nVideoInH - nSH)/2   ;             
  var                                   nDW                     =  g_nCanvasOutW*g_dInlay         ;     
  var                                   nDH                     =  nDW * g_nVideoInH / g_nVideoInW;     
  var                                   nDT                     =  g_nCanvasOutH - nDH            ;     
  var                                   nDL                     = (g_nCanvasOutW - nDW)/2         ;     
  if( nDL + nDW < 0.875*g_nCanvasOutW ){   nDL = 0.875*g_nCanvasOutW - nDW;   }                         
  g_context2dOut.drawImage( g_eleVideoIn                                                                
  ,Math.floor( nSL +0.5 ) ,Math.floor( nST +0.5 )   ,Math.floor( nSW +0.5 ) ,Math.floor( nSH +0.5 )     
  ,Math.floor( nDL +0.5 ) ,Math.floor( nDT +0.5 )   ,Math.floor( nDW +0.5 ) ,Math.floor( nDH +0.5 )     
  );                                                                                                    
 }
 Tick_PixelEdit( nDL ,nDT ,nDW ,nDH );                                                                  
 EdgeText( g_context2dOut );                                                                            
 var                                    dX                      = whenNow_ms - g_whenScrollText_ms;     
 if( 0 <= dX ){                                                                                         
  var                                   dY                      = Math.floor(0.17 * g_nCanvasOutH);     
  g_context2dOut.font         = Math.floor(0.1*g_nCanvasOutH) +'px serif';                              
  if( '' === g_sScrollText ){                                                                           
   dX = g_nCanvasOutW*(1 - dX*0.015);                                                                   
   var                                  nTextW     = g_context2dOut.measureText( g_sScrollText ).width; 
   if( dX + nTextW < 0 ){ g_whenScrollText_ms = whenNow_ms + 30000; }                                   
   g_context2dOut.lineWidth   = Math.floor(0.005*g_nCanvasOutH);                                        
   g_context2dOut.strokeStyle = 'rgba(255,255,255 ,0.4)';                                               
   g_context2dOut.fillStyle   = 'rgba(  0,  0,  0 ,0.4)';                                               
   g_context2dOut.strokeText(   $_sLINK , dX, dY );                                                     
   g_context2dOut.fillText(     $_sLINK , dX, dY );                                                     
  }else{                                                                                                
   dX = g_nCanvasOutW*(1 - dX*0.001);                                                                     
   var                                  nTextW     = g_context2dOut.measureText( g_sScrollText ).width; 
   if( dX + nTextW < 0 ){ g_whenScrollText_ms = whenNow_ms + 30000; g_sScrollText = ''; }               
   g_context2dOut.lineWidth   = Math.floor(0.005*g_nCanvasOutH);                                        
   g_context2dOut.strokeStyle = 'rgba(255,255,255 ,1)';                                                 
   g_context2dOut.fillStyle   = 'rgba(  0,  0,  0 ,1)';                                                 
   g_context2dOut.strokeText(   g_sScrollText, dX, dY );                                                
   g_context2dOut.fillText(     g_sScrollText, dX, dY );                                                
 }}
 var                                    tookTick_ms             = whenNow_ms - g_whenWas_ms;            
 g_tookTickDecay_ms = (g_tookTickDecay_ms*19 + tookTick_ms)*0.05;                                       
 if( 1000 < g_tookTickDecay_ms ){ g_tookTickDecay_ms = 1000; }                                          
 g_whenWas_ms       = whenNow_ms                                  ;                                     
 var                                    whenEnd_ms              = Date.now();                           
 g_tookEndDecay_ms = (g_tookEndDecay_ms*19 + whenEnd_ms - whenNow_ms)*0.05;                             
 if( 1000 < g_tookEndDecay_ms ){ g_tookEndDecay_ms = 1000; }                                            
 requestAnimationFrame( Tick );                                                                         
}



function                                Go_Tick( // Wait before starting the main periodic routine.
){                                      
 if( !g_eleCanvasOut ){ requestAnimationFrame( Go_Tick );                                       return;}
 if( !g_eleVideoIn   ){ requestAnimationFrame( Go_Tick );                                       return;}
 if( !g_bVideoReady  ){ requestAnimationFrame( Go_Tick );                                       return;}
 g_nVideoInW            = g_eleVideoIn.videoWidth         ;                                             
 g_nVideoInH            = g_eleVideoIn.videoHeight        ;                                             
 g_nCanvasOutW          = g_eleCanvasOut.width ;                                                        
 g_nCanvasOutH          = g_eleCanvasOut.height;                                                        
 g_eleCanvasBack        = document.createElement('canvas');                                             
 g_eleCanvasBack.width  = g_nCanvasOutW                   ;                                             
 g_eleCanvasBack.height = g_nCanvasOutH                   ;                                             
 BackFill();                                                                                            
 OnLoadImageFromOptions_Back();                                                                         
 Set1FlagFromFlags();                                                                                   
 document.getElementById( $_sIDdIVfLAGdATA ).setAttribute($_sATTRIBUTE_OPEN ,'1');                      
 g_whenGo_ms            = Date.now()  ;                                                                 
 g_whenScrollText_ms    = g_whenGo_ms ;                                                                 
 g_bStopTick            = false       ;                                                                 
 Tick();                                                                                                
}



function                                Go_ImageFlags( // Load image with all predefined flags, and initialize the background image.
){                                      
 g_eleCanvasAllFlags = document.createElement('canvas');                                                
 let                                    g_imageFlags            = new Image();                          
 g_imageFlags.onload = function(){                                                                      
                        let             context2dFlags          = g_eleCanvasAllFlags.getContext('2d'); 
                        g_eleCanvasAllFlags.width  = g_imageFlags.width ;                               
                        g_eleCanvasAllFlags.height = g_imageFlags.height;                               
                        context2dFlags.drawImage(    g_imageFlags ,0 ,0 );                              
                        Set1FlagFromFlags();                                                            
                       };
 g_imageFlags.src    = g_sDATAuRIFLAGS;                                                                 
}



async function                          Go( // Main execution starts here.
){                                      
 Go_ImageFlags();                                                                                       
 GoAdjust( g_dBright ,g_dContrast );                                                                    
 Set1FlagFromFlags();                                                                                   
 Go_Tick();                                                                                             
}


//# Flags as one image encoded as a data uri text string.
// prettier-ignore
const                                   g_sDATAuRIFLAGS         =
'data:image/png;base64,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
Go();                                                                                                    // Start execution of the code above.
