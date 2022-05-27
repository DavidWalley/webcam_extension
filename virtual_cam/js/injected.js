console.log("hers jo");
const N = "\n";
const g_sCodeVertexShader =
  "attribute vec4 " +
  "attributePosition;" +
  N +
  "void " +
  "main(" +
  "){" +
  N +
  "gl_Position = attributePosition;" +
  N +
  "}" +
  N;
const g_dFLAGSIZEX = 0.4;
const g_dFLAGSIZEY = 0.35;
const g_dOPACITY = 0.6;
const g_sCodeFragmentShader =
  "precision lowp float;" +
  N +
  "uniform vec2 " +
  "uniformvec2CanvasSize;" +
  N +
  "uniform float " +
  "uniformfNow_ms;" +
  N +
  "uniform sampler2D " +
  "uniformsampler2d0;" +
  N +
  "uniform sampler2D " +
  "uniformsampler2d1;" +
  N +
  "void " +
  "main(" +
  "){" +
  N +
  "float " +
  "u0 = gl_FragCoord.x/uniformvec2CanvasSize.x;" +
  N +
  "float " +
  "v0 = gl_FragCoord.y/uniformvec2CanvasSize.y;" +
  N +
  "float " +
  "u1 = 0.0;" +
  N +
  "float " +
  "v1 = 0.0;" +
  N +
  "float " +
  "r0 = texture2D( uniformsampler2d0 ,vec2(u0 ,v0) ).r;" +
  N +
  "float " +
  "g0 = texture2D( uniformsampler2d0 ,vec2(u0 ,v0) ).g;" +
  N +
  "float " +
  "b0 = texture2D( uniformsampler2d0 ,vec2(u0 ,v0) ).b;" +
  N +
  "float " +
  "r1 = 0.0;" +
  N +
  "float " +
  "g1 = 0.0;" +
  N +
  "float " +
  "b1 = 0.0;" +
  N +
  "float " +
  "dFlutter = 0.0;" +
  N +
  "float " +
  "dSun = 3.0*dFlutter;" +
  N +
  "bool " +
  "bSideL_NotR " +
  "= true;" +
  N +
  "bool " +
  "bFlip " +
  "= false;" +
  N +
  "if( bSideL_NotR ){" +
  N +
  "dFlutter = (0.06 *sin( 11.0*(u0 - 0.4*uniformfNow_ms) )" +
  "+0.037*sin( 15.3*(u0 - 0.9*uniformfNow_ms) )" +
  "+0.029*sin( 22.3*(u0 - 1.3*uniformfNow_ms) )" +
  ");" +
  N +
  "dFlutter *= -u0;" +
  "dSun = 3.0*dFlutter;" +
  N +
  "if(  u0 < " +
  g_dFLAGSIZEX +
  " ){" +
  N +
  "if( v0 < " +
  g_dFLAGSIZEY +
  " + dFlutter ){" +
  N +
  "u1 = ( u0 " +
  ")*" +
  (1 / g_dFLAGSIZEX).toFixed(5) +
  ";" +
  N +
  "v1 = ( v0 - dFlutter )*" +
  (1 / g_dFLAGSIZEY).toFixed(5) +
  ";" +
  N +
  "if( v1 < 0.0 ){ gl_FragColor = vec4(r0 ,g0 ,b0 ,1.0);" +
  "return;}" +
  N +
  "if( bFlip ){ u1 = 1.0 - u1; }" +
  N +
  "r1 = texture2D( uniformsampler2d1 ,vec2(u1 ,v1) ).r;" +
  N +
  "g1 = texture2D( uniformsampler2d1 ,vec2(u1 ,v1) ).g;" +
  N +
  "b1 = texture2D( uniformsampler2d1 ,vec2(u1 ,v1) ).b;" +
  N +
  "gl_FragColor = vec4(r1*" +
  g_dOPACITY.toFixed(5) +
  " + r0*" +
  (1 - g_dOPACITY).toFixed(5) +
  " + dSun" +
  ",g1*" +
  g_dOPACITY.toFixed(5) +
  " + g0*" +
  (1 - g_dOPACITY).toFixed(5) +
  " + dSun" +
  ",b1*" +
  g_dOPACITY.toFixed(5) +
  " + b0*" +
  (1 - g_dOPACITY).toFixed(5) +
  " + dSun" +
  ",1.0" +
  ");" +
  N +
  "return;" +
  N +
  "}}" +
  "}else{" +
  "dFlutter = (0.06 *sin( 11.0*(u0 + 0.4*uniformfNow_ms) )" +
  "+0.037*sin( 15.3*(u0 + 0.9*uniformfNow_ms) )" +
  "+0.029*sin( 22.3*(u0 + 1.3*uniformfNow_ms) )" +
  ");" +
  N +
  "dFlutter *= (1.0 - u0);" +
  "dSun = 3.0*dFlutter;" +
  N +
  "if( " +
  (1 - g_dFLAGSIZEX) +
  " < u0 ){" +
  N +
  "if( v0 < " +
  g_dFLAGSIZEY +
  " + dFlutter ){" +
  N +
  "u1 = ( u0 - " +
  (1 - g_dFLAGSIZEX) +
  " )*" +
  (1 / g_dFLAGSIZEX).toFixed(5) +
  ";" +
  N +
  "v1 = ( v0 - dFlutter" +
  " )*" +
  (1 / g_dFLAGSIZEY).toFixed(5) +
  ";" +
  N +
  "if( v1 < 0.0 ){ gl_FragColor = vec4(r0 ,g0 ,b0 ,1.0);" +
  "return;}" +
  N +
  "if( bFlip ){ u1 = 1.0 - u1; }" +
  N +
  "r1 = texture2D( uniformsampler2d1 ,vec2(u1 ,v1) ).r;" +
  N +
  "g1 = texture2D( uniformsampler2d1 ,vec2(u1 ,v1) ).g;" +
  N +
  "b1 = texture2D( uniformsampler2d1 ,vec2(u1 ,v1) ).b;" +
  N +
  "gl_FragColor = vec4(r1*" +
  g_dOPACITY.toFixed(5) +
  " + r0*" +
  (1 - g_dOPACITY).toFixed(5) +
  " + dSun" +
  ",g1*" +
  g_dOPACITY.toFixed(5) +
  " + g0*" +
  (1 - g_dOPACITY).toFixed(5) +
  " + dSun" +
  ",b1*" +
  g_dOPACITY.toFixed(5) +
  " + b0*" +
  (1 - g_dOPACITY).toFixed(5) +
  " + dSun" +
  ",1.0" +
  ");" +
  N +
  "return;" +
  N +
  "}}}" +
  N +
  "gl_FragColor = vec4(r0 ,g0 ,b0 ,1.0);" +
  N +
  "}" +
  N;
class ShaderRenderer {
  //
  NewImage(a_sFlagIn) {
    const me = this;
    me._eleFlagIn = null;
    me._eleFlagIn = new Image();
    me._eleFlagIn.src = a_sFlagIn;
  }
  constructor( // Create instance of ShaderRenderer - the connection to the GPU.
    a_eleCanvasOut, // Given a canvas DOM element (for output of GPU?), and
    a_eleVideoIn, // video DOM element (for input data?)
    a_sFlagIn //
  ) {
    //
    const me = this;
    this._eleCanvasOut = a_eleCanvasOut;
    this._eleVideoIn = a_eleVideoIn;
    this._eleFlagIn = null;
    me.NewImage(a_sFlagIn);
    this._g = me._eleCanvasOut.getContext("webgl");
    this._program = me.createProgram(
      g_sCodeVertexShader,
      g_sCodeFragmentShader
    );
    this._textureVideoIn = me._g.createTexture();
    this._textureFlagIn = me._g.createTexture();
    this._uniformsampler2d0 = me._g.getUniformLocation(
      me._program,
      "uniformsampler2d0"
    );
    this._uniformsampler2d1 = me._g.getUniformLocation(
      me._program,
      "uniformsampler2d1"
    );
    this._location_vec2CanvasSize = me._g.getUniformLocation(
      me._program,
      "uniformvec2CanvasSize"
    );
    this._location_ufNow_ms = me._g.getUniformLocation(
      me._program,
      "uniformfNow_ms"
    );
    this._bufferPosition = me._g.createBuffer();
    this._attriblocationPosition = me._g.getAttribLocation(
      me._program,
      "attributePosition"
    );
    me._g.bindBuffer(me._g.ARRAY_BUFFER, me._bufferPosition);
    me._g.bufferData(
      me._g.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      me._g.STATIC_DRAW
    );
  }
  render( //
    a_whenNow_ms //
  ) {
    //
    const me = this;
    const g = me._g;
    g.enableVertexAttribArray(me._attriblocationPosition);
    g.bindBuffer(g.ARRAY_BUFFER, me._bufferPosition);
    g.vertexAttribPointer(me._attriblocationPosition, 2, g.FLOAT, false, 0, 0);
    g.activeTexture(g.TEXTURE0);
    g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, true);
    g.bindTexture(g.TEXTURE_2D, me._textureVideoIn);
    g.texImage2D(
      g.TEXTURE_2D,
      0,
      g.RGBA,
      g.RGBA,
      g.UNSIGNED_BYTE,
      me._eleVideoIn
    );
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
    g.activeTexture(g.TEXTURE1);
    g.pixelStorei(g.UNPACK_FLIP_Y_WEBGL, true);
    g.bindTexture(g.TEXTURE_2D, me._textureFlagIn);
    g.texImage2D(
      g.TEXTURE_2D,
      0,
      g.RGBA,
      g.RGBA,
      g.UNSIGNED_BYTE,
      me._eleFlagIn
    );
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MAG_FILTER, g.LINEAR);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_MIN_FILTER, g.LINEAR);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_S, g.CLAMP_TO_EDGE);
    g.texParameteri(g.TEXTURE_2D, g.TEXTURE_WRAP_T, g.CLAMP_TO_EDGE);
    g.useProgram(me._program);
    g.uniform1i(me._uniformsampler2d0, 0);
    g.uniform1i(me._uniformsampler2d1, 1);
    g.uniform1f(me._location_ufNow_ms, (Date.now() % 100000) * 0.0001);
    g.uniform2f(me._location_vec2CanvasSize, g.canvas.width, g.canvas.height);
    g.drawArrays(g.TRIANGLES, 0, 6);
  }
  CompileShader( //
    a_sCode, // GSLS code to be compiled.
    type // Vertex or Fragment.
  ) {
    //
    const me = this;
    const r_shader = me._g.createShader(type);
    me._g.shaderSource(r_shader, a_sCode);
    me._g.compileShader(r_shader);
    if (me._g.getShaderParameter(r_shader, me._g.COMPILE_STATUS)) {
      return r_shader;
    }
    var info = me._g.getShaderInfoLog(r_shader);
  }
  createProgram( //
    a_sShaderVertex, //
    a_sShaderFragment //
  ) {
    //
    const me = this;
    const vertexShader = me.CompileShader(a_sShaderVertex, me._g.VERTEX_SHADER);
    const fragmentShader = me.CompileShader(
      a_sShaderFragment,
      me._g.FRAGMENT_SHADER
    );
    var program = me._g.createProgram();
    me._g.attachShader(program, vertexShader);
    me._g.attachShader(program, fragmentShader);
    me._g.linkProgram(program);
    var success = me._g.getProgramParameter(program, me._g.LINK_STATUS);
    if (success) {
      return program;
    }
    me._g.deleteProgram(program);
  }
  setSize( //
    a_nW, //
    a_nH //
  ) {
    //
    const me = this;
    me._eleCanvasOut.width = a_nW;
    me._eleCanvasOut.height = a_nH;
    me._g.viewport(0, 0, a_nW, a_nH);
  }
}
let g_shaderrenderer = null;

function Tick() { // Periodic routine.
  //
  g_shaderrenderer.render();
  requestAnimationFrame(function () {
    Tick();
  });
}

async function ModifyMediaFunctions() { //
  //
  const enumerateDevicesWas = MediaDevices.prototype.enumerateDevices;
  MediaDevices["prototype"][
    "enumerateDevices"
  ] = async function () // Redefine this system function locally, to include the virtual camera.
  {
    //
    const result = await enumerateDevicesWas.call(navigator.mediaDevices);
    const x = {
      deviceId: "virtual",
      groupID: "uh",
      kind: "videoinput",
      /*PRO*/ label: "Slavi Ukraini Virtual Webcam",
    };
    result.push(/** @type {!MediaDeviceInfo|!undefined} */ (x));
    return result;
  };
  const getUserMediaWas = MediaDevices.prototype.getUserMedia;
  MediaDevices["prototype"][
    "getUserMedia"
  ] = async function () // Redefine this system function locally, to include the virtual camera.
  {
    //
    const args = arguments;
    if (args.length && args[0].video && args[0].video.deviceId) {
      if (
        "virtual" === args[0].video.deviceId ||
        "virtual" === args[0].video.deviceId.exact
      ) {
        const usermedia = await getUserMediaWas.call(navigator.mediaDevices, {
          video: {
            facingMode: args[0].facingMode,
            advanced: args[0].video.advanced,
            width: args[0].video.width,
            height: args[0].video.height,
          },
          audio: false,
        });
        if (usermedia) {
          const eleCanvas = document.createElement("canvas");
          const eleVideo = document.createElement("video");
          eleVideo.srcObject = usermedia;
          eleVideo.autoplay = true;
          g_shaderrenderer = new ShaderRenderer(
            eleCanvas,
            eleVideo,
            g_sFLAG_UKRAINE
          );
          eleVideo.addEventListener("playing", function () {
            g_shaderrenderer.setSize(eleVideo.videoWidth, eleVideo.videoHeight);
            Tick();
          });
          return eleCanvas.captureStream();
        }
      }
    }
    const fullfilledpromiseMediaStream = await getUserMediaWas.call(
      navigator.mediaDevices,
      ...arguments
    );
    return fullfilledpromiseMediaStream;
  };
}
ModifyMediaFunctions();
