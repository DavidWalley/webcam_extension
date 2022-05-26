(function(){function p(b) {
  var a = 0;
  return function() {
    return a < b.length ? {done:!1, value:b[a++], } : {done:!0};
  };
}
function t(b) {
  var a = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
  return a ? a.call(b) : {next:p(b)};
}
function u(b) {
  for (var a, d = []; !(a = b.next()).done;) {
    d.push(a.value);
  }
  return d;
}
var v = "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, a, d) {
  if (b == Array.prototype || b == Object.prototype) {
    return b;
  }
  b[a] = d.value;
  return b;
};
function w(b) {
  b = ["object" == typeof globalThis && globalThis, b, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global, ];
  for (var a = 0; a < b.length; ++a) {
    var d = b[a];
    if (d && d.Math == Math) {
      return d;
    }
  }
  throw Error("Cannot find global object");
}
var x = w(this);
function y(b, a) {
  if (a) {
    a: {
      var d = x;
      b = b.split(".");
      for (var f = 0; f < b.length - 1; f++) {
        var h = b[f];
        if (!(h in d)) {
          break a;
        }
        d = d[h];
      }
      b = b[b.length - 1];
      f = d[b];
      a = a(f);
      a != f && null != a && v(d, b, {configurable:!0, writable:!0, value:a});
    }
  }
}
function z() {
  this.j = !1;
  this.h = null;
  this.l = void 0;
  this.g = 1;
  this.o = 0;
  this.i = null;
}
function A(b) {
  if (b.j) {
    throw new TypeError("Generator is already running");
  }
  b.j = !0;
}
z.prototype.m = function(b) {
  this.l = b;
};
function B(b, a) {
  b.i = {H:a, I:!0};
  b.g = b.o;
}
z.prototype.return = function(b) {
  this.i = {return:b};
  this.g = this.o;
};
function C(b, a, d) {
  b.g = d;
  return {value:a};
}
function F(b) {
  this.g = new z;
  this.h = b;
}
function G(b, a) {
  A(b.g);
  var d = b.g.h;
  if (d) {
    return H(b, "return" in d ? d["return"] : function(f) {
      return {value:f, done:!0};
    }, a, b.g.return);
  }
  b.g.return(a);
  return I(b);
}
function H(b, a, d, f) {
  try {
    var h = a.call(b.g.h, d);
    if (!(h instanceof Object)) {
      throw new TypeError("Iterator result " + h + " is not an object");
    }
    if (!h.done) {
      return b.g.j = !1, h;
    }
    var l = h.value;
  } catch (c) {
    return b.g.h = null, B(b.g, c), I(b);
  }
  b.g.h = null;
  f.call(b.g, l);
  return I(b);
}
function I(b) {
  for (; b.g.g;) {
    try {
      var a = b.h(b.g);
      if (a) {
        return b.g.j = !1, {value:a.value, done:!1};
      }
    } catch (d) {
      b.g.l = void 0, B(b.g, d);
    }
  }
  b.g.j = !1;
  if (b.g.i) {
    a = b.g.i;
    b.g.i = null;
    if (a.I) {
      throw a.H;
    }
    return {value:a.return, done:!0};
  }
  return {value:void 0, done:!0};
}
function J(b) {
  this.next = function(a) {
    A(b.g);
    b.g.h ? a = H(b, b.g.h.next, a, b.g.m) : (b.g.m(a), a = I(b));
    return a;
  };
  this.throw = function(a) {
    A(b.g);
    b.g.h ? a = H(b, b.g.h["throw"], a, b.g.m) : (B(b.g, a), a = I(b));
    return a;
  };
  this.return = function(a) {
    return G(b, a);
  };
  this[Symbol.iterator] = function() {
    return this;
  };
}
function K(b) {
  function a(f) {
    return b.next(f);
  }
  function d(f) {
    return b.throw(f);
  }
  return new Promise(function(f, h) {
    function l(c) {
      c.done ? f(c.value) : Promise.resolve(c.value).then(a, d).then(l, h);
    }
    l(b.next());
  });
}
function L(b) {
  return K(new J(new F(b)));
}
y("Symbol", function(b) {
  function a(l) {
    if (this instanceof a) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new d(f + (l || "") + "_" + h++, l);
  }
  function d(l, c) {
    this.g = l;
    v(this, "description", {configurable:!0, writable:!0, value:c});
  }
  if (b) {
    return b;
  }
  d.prototype.toString = function() {
    return this.g;
  };
  var f = "jscomp_symbol_" + (1e9 * Math.random() >>> 0) + "_", h = 0;
  return a;
});
y("Symbol.iterator", function(b) {
  if (b) {
    return b;
  }
  b = Symbol("Symbol.iterator");
  for (var a = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), d = 0; d < a.length; d++) {
    var f = x[a[d]];
    "function" === typeof f && "function" != typeof f.prototype[b] && v(f.prototype, b, {configurable:!0, writable:!0, value:function() {
      return M(p(this));
    }});
  }
  return b;
});
function M(b) {
  b = {next:b};
  b[Symbol.iterator] = function() {
    return this;
  };
  return b;
}
y("Promise", function(b) {
  function a(c) {
    this.h = 0;
    this.i = void 0;
    this.g = [];
    this.o = !1;
    var e = this.j();
    try {
      c(e.resolve, e.reject);
    } catch (g) {
      e.reject(g);
    }
  }
  function d() {
    this.g = null;
  }
  function f(c) {
    return c instanceof a ? c : new a(function(e) {
      e(c);
    });
  }
  if (b) {
    return b;
  }
  d.prototype.h = function(c) {
    if (null == this.g) {
      this.g = [];
      var e = this;
      this.i(function() {
        e.l();
      });
    }
    this.g.push(c);
  };
  var h = x.setTimeout;
  d.prototype.i = function(c) {
    h(c, 0);
  };
  d.prototype.l = function() {
    for (; this.g && this.g.length;) {
      var c = this.g;
      this.g = [];
      for (var e = 0; e < c.length; ++e) {
        var g = c[e];
        c[e] = null;
        try {
          g();
        } catch (k) {
          this.j(k);
        }
      }
    }
    this.g = null;
  };
  d.prototype.j = function(c) {
    this.i(function() {
      throw c;
    });
  };
  a.prototype.j = function() {
    function c(k) {
      return function(m) {
        g || (g = !0, k.call(e, m));
      };
    }
    var e = this, g = !1;
    return {resolve:c(this.A), reject:c(this.l)};
  };
  a.prototype.A = function(c) {
    if (c === this) {
      this.l(new TypeError("A Promise cannot resolve to itself"));
    } else {
      if (c instanceof a) {
        this.F(c);
      } else {
        a: {
          switch(typeof c) {
            case "object":
              var e = null != c;
              break a;
            case "function":
              e = !0;
              break a;
            default:
              e = !1;
          }
        }
        e ? this.v(c) : this.m(c);
      }
    }
  };
  a.prototype.v = function(c) {
    var e = void 0;
    try {
      e = c.then;
    } catch (g) {
      this.l(g);
      return;
    }
    "function" == typeof e ? this.G(e, c) : this.m(c);
  };
  a.prototype.l = function(c) {
    this.u(2, c);
  };
  a.prototype.m = function(c) {
    this.u(1, c);
  };
  a.prototype.u = function(c, e) {
    if (0 != this.h) {
      throw Error("Cannot settle(" + c + ", " + e + "): Promise already settled in state" + this.h);
    }
    this.h = c;
    this.i = e;
    2 === this.h && this.B();
    this.C();
  };
  a.prototype.B = function() {
    var c = this;
    h(function() {
      if (c.D()) {
        var e = x.console;
        "undefined" !== typeof e && e.error(c.i);
      }
    }, 1);
  };
  a.prototype.D = function() {
    if (this.o) {
      return !1;
    }
    var c = x.CustomEvent, e = x.Event, g = x.dispatchEvent;
    if ("undefined" === typeof g) {
      return !0;
    }
    "function" === typeof c ? c = new c("unhandledrejection", {cancelable:!0}) : "function" === typeof e ? c = new e("unhandledrejection", {cancelable:!0}) : (c = x.document.createEvent("CustomEvent"), c.initCustomEvent("unhandledrejection", !1, !0, c));
    c.promise = this;
    c.reason = this.i;
    return g(c);
  };
  a.prototype.C = function() {
    if (null != this.g) {
      for (var c = 0; c < this.g.length; ++c) {
        l.h(this.g[c]);
      }
      this.g = null;
    }
  };
  var l = new d;
  a.prototype.F = function(c) {
    var e = this.j();
    c.s(e.resolve, e.reject);
  };
  a.prototype.G = function(c, e) {
    var g = this.j();
    try {
      c.call(e, g.resolve, g.reject);
    } catch (k) {
      g.reject(k);
    }
  };
  a.prototype.then = function(c, e) {
    function g(n, q) {
      return "function" == typeof n ? function(D) {
        try {
          k(n(D));
        } catch (E) {
          m(E);
        }
      } : q;
    }
    var k, m, r = new a(function(n, q) {
      k = n;
      m = q;
    });
    this.s(g(c, k), g(e, m));
    return r;
  };
  a.prototype.catch = function(c) {
    return this.then(void 0, c);
  };
  a.prototype.s = function(c, e) {
    function g() {
      switch(k.h) {
        case 1:
          c(k.i);
          break;
        case 2:
          e(k.i);
          break;
        default:
          throw Error("Unexpected state: " + k.h);
      }
    }
    var k = this;
    null == this.g ? l.h(g) : this.g.push(g);
    this.o = !0;
  };
  a.resolve = f;
  a.reject = function(c) {
    return new a(function(e, g) {
      g(c);
    });
  };
  a.race = function(c) {
    return new a(function(e, g) {
      for (var k = t(c), m = k.next(); !m.done; m = k.next()) {
        f(m.value).s(e, g);
      }
    });
  };
  a.all = function(c) {
    var e = t(c), g = e.next();
    return g.done ? f([]) : new a(function(k, m) {
      function r(D) {
        return function(E) {
          n[D] = E;
          q--;
          0 == q && k(n);
        };
      }
      var n = [], q = 0;
      do {
        n.push(void 0), q++, f(g.value).s(r(n.length - 1), m), g = e.next();
      } while (!g.done);
    });
  };
  return a;
});
var N = "precision lowp float;\nuniform vec2 uniformvec2CanvasSize;\nuniform float uniformfNow_ms;\nuniform sampler2D uniformsampler2d0;\nuniform sampler2D uniformsampler2d1;\nvoid main(){\nfloat u0 = gl_FragCoord.x/uniformvec2CanvasSize.x;\nfloat v0 = gl_FragCoord.y/uniformvec2CanvasSize.y;\nfloat u1 = 0.0;\nfloat v1 = 0.0;\nfloat r0 = texture2D( uniformsampler2d0 ,vec2(u0 ,v0) ).r;\nfloat g0 = texture2D( uniformsampler2d0 ,vec2(u0 ,v0) ).g;\nfloat b0 = texture2D( uniformsampler2d0 ,vec2(u0 ,v0) ).b;\nfloat r1 = 0.0;\nfloat g1 = 0.0;\nfloat b1 = 0.0;\nfloat y = (1.0-u0)*( 0.06 *sin( 11.0*(u0 + 0.4*uniformfNow_ms) )+0.037*sin( 15.3*(u0 + 0.9*uniformfNow_ms) )+0.029*sin( 22.3*(u0 + 1.3*uniformfNow_ms) ));if(    0.6 < u0       ){\nif(   v0  < 0.35 + y ){\nu1 = ( u0 - 0.6 )*" + 
(2.5).toFixed(5) + ";\nv1 = ( v0 - y   )*" + (1 / 0.35).toFixed(5) + ";\nr1 = texture2D( uniformsampler2d1 ,vec2(u1 ,v1) ).r;\ng1 = texture2D( uniformsampler2d1 ,vec2(u1 ,v1) ).g;\nb1 = texture2D( uniformsampler2d1 ,vec2(u1 ,v1) ).b;\ngl_FragColor = vec4( r1*0.6 + r0*0.4 + y*3.0,g1*0.6 + g0*0.4 + y*3.0,b1*0.6 + b0*0.4 + y*3.0,1.0);return;}}gl_FragColor   = vec4( r0 ,g0 ,b0 ,1.0);}\n";
function O(b, a) {
  this.i = b;
  this.o = a;
  this.m = new Image;
  this.m.src = "data:image/png;base64,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";
  this.g = this.i.getContext("webgl");
  this.h = this.createProgram("attribute vec4 attributePosition;\nvoid main(){\ngl_Position = attributePosition;\n}\n", N);
  this.v = this.g.createTexture();
  this.D = this.g.createTexture();
  this.A = this.g.getUniformLocation(this.h, "uniformsampler2d0");
  this.B = this.g.getUniformLocation(this.h, "uniformsampler2d1");
  this.C = this.g.getUniformLocation(this.h, "uniformvec2CanvasSize");
  this.u = this.g.getUniformLocation(this.h, "uniformfNow_ms");
  this.l = this.g.createBuffer();
  this.j = this.g.getAttribLocation(this.h, "attributePosition");
  this.g.bindBuffer(this.g.ARRAY_BUFFER, this.l);
  this.g.bufferData(this.g.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), this.g.STATIC_DRAW);
}
function P() {
  var b = Q, a = b.g;
  a.enableVertexAttribArray(b.j);
  a.bindBuffer(a.ARRAY_BUFFER, b.l);
  a.vertexAttribPointer(b.j, 2, a.FLOAT, !1, 0, 0);
  a.activeTexture(a.TEXTURE0);
  a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !0);
  a.bindTexture(a.TEXTURE_2D, b.v);
  a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, b.o);
  a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR);
  a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR);
  a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE);
  a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE);
  a.activeTexture(a.TEXTURE1);
  a.pixelStorei(a.UNPACK_FLIP_Y_WEBGL, !0);
  a.bindTexture(a.TEXTURE_2D, b.D);
  a.texImage2D(a.TEXTURE_2D, 0, a.RGBA, a.RGBA, a.UNSIGNED_BYTE, b.m);
  a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MAG_FILTER, a.LINEAR);
  a.texParameteri(a.TEXTURE_2D, a.TEXTURE_MIN_FILTER, a.LINEAR);
  a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_S, a.CLAMP_TO_EDGE);
  a.texParameteri(a.TEXTURE_2D, a.TEXTURE_WRAP_T, a.CLAMP_TO_EDGE);
  a.useProgram(b.h);
  a.uniform1i(b.A, 0);
  a.uniform1i(b.B, 1);
  a.uniform1f(b.u, Date.now() % 100000 * 0.0001);
  a.uniform2f(b.C, a.canvas.width, a.canvas.height);
  a.drawArrays(a.TRIANGLES, 0, 6);
}
function R(b, a, d) {
  d = b.g.createShader(d);
  b.g.shaderSource(d, a);
  b.g.compileShader(d);
  if (b.g.getShaderParameter(d, b.g.COMPILE_STATUS)) {
    return d;
  }
}
O.prototype.createProgram = function(b, a) {
  b = R(this, b, this.g.VERTEX_SHADER);
  a = R(this, a, this.g.FRAGMENT_SHADER);
  var d = this.g.createProgram();
  this.g.attachShader(d, b);
  this.g.attachShader(d, a);
  this.g.linkProgram(d);
  if (this.g.getProgramParameter(d, this.g.LINK_STATUS)) {
    return d;
  }
  this.g.deleteProgram(d);
};
var Q = null;
function S() {
  P();
  requestAnimationFrame(function() {
    S();
  });
}
(function() {
  var b, a;
  return L(function(d) {
    b = MediaDevices.prototype.enumerateDevices;
    MediaDevices.prototype.enumerateDevices = function() {
      var f, h;
      return L(function(l) {
        if (1 == l.g) {
          return C(l, b.call(navigator.mediaDevices), 2);
        }
        f = l.l;
        h = {deviceId:"virtual", groupID:"uh", kind:"videoinput", label:"Slavi Ukraini Virtual Webcam"};
        f.push(h);
        return l.return(f);
      });
    };
    a = MediaDevices.prototype.getUserMedia;
    MediaDevices.prototype.getUserMedia = function() {
      var f = arguments, h, l, c, e, g;
      return L(function(k) {
        switch(k.g) {
          case 1:
            h = f;
            if (!(h.length && h[0].video && h[0].video.deviceId)) {
              k.g = 2;
              break;
            }
            if ("virtual" !== h[0].video.deviceId && "virtual" !== h[0].video.deviceId.exact) {
              k.g = 2;
              break;
            }
            return C(k, a.call(navigator.mediaDevices, {video:{facingMode:h[0].facingMode, advanced:h[0].video.advanced, width:h[0].video.width, height:h[0].video.height}, audio:!1}), 4);
          case 4:
            if (l = k.l) {
              return c = document.createElement("canvas"), e = document.createElement("video"), e.srcObject = l, e.autoplay = !0, Q = new O(c, e), e.addEventListener("playing", function() {
                var m = e.videoWidth, r = e.videoHeight, n = Q;
                n.i.width = m;
                n.i.height = r;
                n.g.viewport(0, 0, m, r);
                S();
              }), k.return(c.captureStream());
            }
          case 2:
            return C(k, a.call.apply(a, [navigator.mediaDevices].concat(f instanceof Array ? f : u(t(f)))), 5);
          case 5:
            return g = k.l, k.return(g);
        }
      });
    };
    d.g = 0;
  });
})();
})();
