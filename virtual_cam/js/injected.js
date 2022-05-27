const                                   N                       = "\n";                                 
const                                   sCodeVertexShader       =                                       
 'attribute vec4 '                      +'attributePosition;'                                        +N 
+'void '                                +'main('
+'){'+N                                 
+ 'gl_Position = attributePosition;'                                                                 +N 
+'}'+N
;                                                                                                       
const                                   dFLAGSIZEX              = 0.6 ;                                 
const                                   dFLAGSIZEY              = 0.35;                                 
const                                   dOPACITY                = 0.6 ;                                 
const                                   sCodeFragmentShader     =                                       
 'precision lowp float;'                                                                             +N 
+'uniform vec2 '                        +'uniformvec2CanvasSize;'                                    +N 
+'uniform float '                       +'uniformfNow_ms;'                                           +N 
+'uniform sampler2D '                   +'uniformsampler2d0;'                                        +N 
+'uniform sampler2D '                   +'uniformsampler2d1;'                                        +N 
+'void '                                +'main('
+'){'+N                                 
+ 'float '                              +'u0 = gl_FragCoord.x/uniformvec2CanvasSize.x;'              +N 
+ 'float '                              +'v0 = gl_FragCoord.y/uniformvec2CanvasSize.y;'              +N 
+ 'float '                              +'u1 = 0.0;'                                                 +N 
+ 'float '                              +'v1 = 0.0;'                                                 +N 
+ 'float '                              +'r0 = texture2D( uniformsampler2d0 ,vec2(u0 ,v0) ).r;'      +N 
+ 'float '                              +'g0 = texture2D( uniformsampler2d0 ,vec2(u0 ,v0) ).g;'      +N 
+ 'float '                              +'b0 = texture2D( uniformsampler2d0 ,vec2(u0 ,v0) ).b;'      +N 
+ 'float '                              +'r1 = 0.0;'                                                 +N 
+ 'float '                              +'g1 = 0.0;'                                                 +N 
+ 'float '                              +'b1 = 0.0;'                                                 +N 
+ 'float '                              +'dFlutter  = (1.0-u0)*(0.06 *sin( 11.0*(u0 + 0.4*uniformfNow_ms) )'   
+                                                      '+0.037*sin( 15.3*(u0 + 0.9*uniformfNow_ms) )'   
+                                                      '+0.029*sin( 22.3*(u0 + 1.3*uniformfNow_ms) )'   
+                                                      ');'                                          +N 
+ 'float '                              +'dSun = 3.0*dFlutter;'                                         
+ 'if(  '+          dFLAGSIZEX +' < u0 ){'                                                           +N 
+  'if( v0  < '+    dFLAGSIZEY +' + dFlutter ){'                                                     +N 
+   'u1 = ( u0 - '+ dFLAGSIZEX +' )*'+   ( 1/(1 - dFLAGSIZEX) ).toFixed(5)   +';'                    +N 
+   'v1 = ( v0 - dFlutter         )*'+   ( 1/     dFLAGSIZEY  ).toFixed(5)   +';'                    +N 
+   'r1 = texture2D( uniformsampler2d1 ,vec2(u1 ,v1) ).r;'                                           +N 
+   'g1 = texture2D( uniformsampler2d1 ,vec2(u1 ,v1) ).g;'                                           +N 
+   'b1 = texture2D( uniformsampler2d1 ,vec2(u1 ,v1) ).b;'                                           +N 
+   'gl_FragColor = vec4(r1*'+ dOPACITY.toFixed(5) +' + r0*'+ (1 - dOPACITY).toFixed(5) +' + dSun'      
+                      ',g1*'+ dOPACITY.toFixed(5) +' + g0*'+ (1 - dOPACITY).toFixed(5) +' + dSun'      
+                      ',b1*'+ dOPACITY.toFixed(5) +' + b0*'+ (1 - dOPACITY).toFixed(5) +' + dSun'      
+                      ',1.0'                                                                           
+                      ');'                                                                          +N 
+'return;'                                                                                           +N 
+ '}}'                                                                                               +N 
+ 'gl_FragColor = vec4(r0 ,g0 ,b0 ,1.0);'                                                            +N 
+'}'+N
;                                                                                                       
class                                   ShaderRenderer // 
{
                                        constructor( // Create instance of ShaderRenderer - the connection to the GPU.
                                        a_eleCanvasOut                                                   // Given a canvas DOM element (for output of GPU?), and
 ,                                      a_eleVideoIn                                                     // video DOM element (for input data?)
 ,                                      a_sFlagIn                                                        // 
 ){                                      // 
  const                                 me                      = this;                                 
       this._eleCanvasOut            = a_eleCanvasOut;                                                  
       this._eleVideoIn              = a_eleVideoIn  ;                                                  
       this._eleFlagIn               = new Image();                                                     
       this._eleFlagIn.src           = a_sFlagIn;                                                       
       this._g                       = me._eleCanvasOut.getContext( 'webgl'                          ); 
       this._program                 = me.createProgram(       sCodeVertexShader,sCodeFragmentShader ); 
       this._textureVideoIn          = me._g.createTexture(                                          ); 
       this._textureFlagIn           = me._g.createTexture(                                          ); 
       this._uniformsampler2d0       = me._g.getUniformLocation( me._program, 'uniformsampler2d0'    ); 
       this._uniformsampler2d1       = me._g.getUniformLocation( me._program, 'uniformsampler2d1'    ); 
       this._location_vec2CanvasSize = me._g.getUniformLocation( me._program ,'uniformvec2CanvasSize'); 
       this._location_ufNow_ms       = me._g.getUniformLocation( me._program ,'uniformfNow_ms'       ); 
       this._bufferPosition          = me._g.createBuffer(                                           ); 
       this._attriblocationPosition  = me._g.getAttribLocation(  me._program ,'attributePosition'    ); 
  me._g.bindBuffer(                  me._g.ARRAY_BUFFER        ,me._bufferPosition                   ); 
  me._g.bufferData(                  me._g.ARRAY_BUFFER                                                 
  ,                                  new Float32Array( [-1, -1                                          
                                                       , 1, -1                                          
                                                       ,-1,  1                                          
                                                       ,-1,  1                                          
                                                       , 1, -1                                          
                                                       , 1,  1                                          
                                     ]                 )                                                
  ,                                  me._g.STATIC_DRAW                                                  
  );                                                                                                    
 }
                                        render( // 
                                        a_whenNow_ms                                                     // 
 ){                                      // 
  const                                 me                      = this;                                 
  const                                 g                       = me._g;                                
  g.enableVertexAttribArray( me._attriblocationPosition                                              ); 
  g.bindBuffer(              g.ARRAY_BUFFER         ,me._bufferPosition                              ); 
  g.vertexAttribPointer(     me._attriblocationPosition ,2 ,g.FLOAT ,false ,0 ,0                     ); 
  g.activeTexture(           g.TEXTURE0                                                              ); 
  g.pixelStorei(             g.UNPACK_FLIP_Y_WEBGL  ,true                                            ); 
  g.bindTexture(             g.TEXTURE_2D           ,me._textureVideoIn                              ); 
  g.texImage2D(              g.TEXTURE_2D,0    ,g.RGBA,g.RGBA ,g.UNSIGNED_BYTE   ,me._eleVideoIn     ); 
  g.texParameteri(           g.TEXTURE_2D           ,g.TEXTURE_MAG_FILTER    ,g.LINEAR               ); 
  g.texParameteri(           g.TEXTURE_2D           ,g.TEXTURE_MIN_FILTER    ,g.LINEAR               ); 
  g.texParameteri(           g.TEXTURE_2D           ,g.TEXTURE_WRAP_S        ,g.CLAMP_TO_EDGE        ); 
  g.texParameteri(           g.TEXTURE_2D           ,g.TEXTURE_WRAP_T        ,g.CLAMP_TO_EDGE        ); 
  g.activeTexture(           g.TEXTURE1                                                              ); 
  g.pixelStorei(             g.UNPACK_FLIP_Y_WEBGL  ,true                                            ); 
  g.bindTexture(             g.TEXTURE_2D           ,me._textureFlagIn                               ); 
  g.texImage2D(              g.TEXTURE_2D                                                               
  ,                          0                                                                          
  ,                          g.RGBA                                                                     
  ,                          g.RGBA                                                                     
  ,                          g.UNSIGNED_BYTE                                                            
  ,                          me._eleFlagIn                                                              
  );                                                                                                    
  g.texParameteri(           g.TEXTURE_2D           ,g.TEXTURE_MAG_FILTER    ,g.LINEAR               ); 
  g.texParameteri(           g.TEXTURE_2D           ,g.TEXTURE_MIN_FILTER    ,g.LINEAR               ); 
  g.texParameteri(           g.TEXTURE_2D           ,g.TEXTURE_WRAP_S        ,g.CLAMP_TO_EDGE        ); 
  g.texParameteri(           g.TEXTURE_2D           ,g.TEXTURE_WRAP_T        ,g.CLAMP_TO_EDGE        ); 
  g.useProgram(              me._program                                                             ); 
  g.uniform1i(               me._uniformsampler2d0 ,0 );                                                
  g.uniform1i(               me._uniformsampler2d1 ,1 );                                                
  g.uniform1f(               me._location_ufNow_ms                                                      
  ,                          ( Date.now()%100000 )*0.0001                                               
  );                                                                                                    
  g.uniform2f(               me._location_vec2CanvasSize                                                
  ,                          g.canvas.width                                                             
  ,                          g.canvas.height                                                            
  );                                                                                                    
  g.drawArrays(              g.TRIANGLES ,0 ,6                                                       ); 
 }
                                        CompileShader( // 
                                        a_sCode                                                          // GSLS code to be compiled.
 ,                                      type                                                             // Vertex or Fragment.
 ){                                      // 
  const                                 me                      = this;                                 
  const                                 r_shader                = me._g.createShader(type);             
  me._g.shaderSource(           r_shader ,a_sCode               );                                      
  me._g.compileShader(          r_shader                        );                                      
  if( me._g.getShaderParameter( r_shader ,me._g.COMPILE_STATUS) ){                     return r_shader;}
  var                                   info                    = me._g.getShaderInfoLog(r_shader);     
 }
                                        createProgram( // 
                                        a_sShaderVertex                                                  // 
 ,                                      a_sShaderFragment                                                // 
 ){                                      // 
  const                                 me                      = this;                                 
  const                   vertexShader   = me.CompileShader( a_sShaderVertex   ,me._g.VERTEX_SHADER  ); 
  const                   fragmentShader = me.CompileShader( a_sShaderFragment ,me._g.FRAGMENT_SHADER); 
  var                     program        = me._g.createProgram();                                       
  me._g.attachShader( program ,vertexShader   );                                                        
  me._g.attachShader( program ,fragmentShader );                                                        
  me._g.linkProgram(  program                 );                                                        
  var                                   success                 = me._g.getProgramParameter(            
                                                                   program                              
                                                                  ,me._g.LINK_STATUS                    
                                                                  );                                    
  if( success ){                                                                        return program;}
  me._g.deleteProgram( program );                                                                       
 }
                                        setSize( // 
                                        a_nW                                                             // 
 ,                                      a_nH                                                             // 
 ){                                      // 
  const                                 me                      = this;                                 
  me._eleCanvasOut.width  = a_nW;                                                                       
  me._eleCanvasOut.height = a_nH;                                                                       
  me._g.viewport(0 ,0  ,a_nW ,a_nH);                                                                    
 }
}
let                                     g_shaderrenderer        = null;                                 

function                                Tick( // Periodic routine.
){                                       // 
 g_shaderrenderer.render();                                                                             
 requestAnimationFrame(   function(){ Tick(); }   );                                                    
}

async function                          ModifyMediaFunctions( // 
){                                       // 
 const                                  enumerateDevicesWas  = MediaDevices.prototype.enumerateDevices; 
 MediaDevices['prototype']            ['enumerateDevices'] = async function( // Redefine this system function locally, to include the virtual camera.
 ){                                      // 
  const                                result = await enumerateDevicesWas.call(navigator.mediaDevices); 
  const                                x                = {'deviceId' : 'virtual'                       
                                                          ,'groupID'  : 'uh'                            
                                                          ,'kind'     : 'videoinput'                    
/*PRO*/                                                  ,'label'    : 'Slavi Ukraini Virtual Webcam'  
                                                          }                                             
  result.push( /** @type {!MediaDeviceInfo|!undefined} */ (x) );                                        
 return result;                                                                                         
 };
 const                                  getUserMediaWas         = MediaDevices.prototype.getUserMedia;  
 MediaDevices['prototype']            ['getUserMedia'] = async function( // Redefine this system function locally, to include the virtual camera.
 ){                                      // 
  const                                 args                    = arguments;                            
  if(   args.length   &&   args[0].video   &&   args[0].video.deviceId   ){                             
   if( 'virtual' === args[0].video.deviceId                                                             
    || 'virtual' === args[0].video.deviceId.exact                                                       
   ){                                                                                                   
    const                               usermedia = await getUserMediaWas.call(                         
                                                           navigator.mediaDevices                       
                                                          ,{video : {facingMode: args[0].facingMode     
                                                                    ,advanced  : args[0].video.advanced 
                                                                    ,width     : args[0].video.width    
                                                                    ,height    : args[0].video.height   
                                                                    }                                   
                                                           ,audio : false                               
                                                          });                                           
    if( usermedia ){                                                                                    
     const                              eleCanvas            = document.createElement( 'canvas' );      
     const                              eleVideo             = document.createElement( 'video'  );      
     const                              sFlag                =                                          
                        /*Ukraine flag with davidwalley.ca*/   'data:image/png;base64,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AAQDECEAAAoBgBCAAAUIwABAAAKEYAAgAAFCMAAQAAihGAAAAAxQhAAACAYgQgAABAMQIQAACgGAEIAABQjAAEAAAoRgACAAAUIwABAACKEYAAAADFCEAAAIBiBCAAAEAxAhAAAKAYAQgAAFCMAAQAAChGAAIAABQjAAEAAIoRgAAAAMUIQAAAgGIEIAAAQDECEAAAoBgBCAAAUIwABAAAKEYAAgAAFCMAAQAAihGAAAAAxQhAAACAYgQgAABAMQIQAACgGAEIAABQjAAEAAAoRgACAAAUIwABAACKEYAAAADFCEAAAIBiBCAAAEAxAhAAAKAYAQgAAFCMAAQAAChGAAIAABQjAAEAAIoRgAAAAMUIQAAAgGIEIAAAQDECEAAAoBgBCAAAUIwABAAAKEYAAgAAFCMAAQAAihGAAAAAxQhAAACAYgQgAABAMQIQAACgGAEIAABQjAAEAAAoRgACAAAUIwABAACKEYAAAADFCEAAAIBiBCAAAEAxAhAAAKAYAQgAAFCMAAQAAChGAAIAABQjAAEAAIoRgAAAAMUIQAAAgGIEIAAAQDECEAAAoBgBCAAAUIwABAAAKEYAAgAAFFJV/x+7O26jelRwRAAAAABJRU5ErkJggg==';
     eleVideo.srcObject = usermedia;                                                                    
     eleVideo.autoplay  = true;                                                                         
                                     g_shaderrenderer = new ShaderRenderer(eleCanvas ,eleVideo ,sFlag); 
     eleVideo.addEventListener('playing'                                                                
     ,                         function(){                                                              
                                g_shaderrenderer.setSize( eleVideo.videoWidth ,eleVideo.videoHeight );  
                                Tick();                                                                 
     }                         );                                                                       
 return eleCanvas.captureStream();                                                                      
    }
  }}
  const                            fullfilledpromiseMediaStream = await getUserMediaWas.call(           
                                                                   navigator.mediaDevices               
                                                                  ,...arguments                         
                                                                  );                                    
 return fullfilledpromiseMediaStream;                                                                   
 };
}
ModifyMediaFunctions();                                                                                 
