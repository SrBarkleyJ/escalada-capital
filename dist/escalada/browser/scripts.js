!(function(e, t) {
  "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).Popper = {});
})(this, (function(e) {
  "use strict";
  function t(e2) {
    if (null == e2) return window;
    if ("[object Window]" !== e2.toString()) {
      var t2 = e2.ownerDocument;
      return t2 && t2.defaultView || window;
    }
    return e2;
  }
  function n(e2) {
    return e2 instanceof t(e2).Element || e2 instanceof Element;
  }
  function r(e2) {
    return e2 instanceof t(e2).HTMLElement || e2 instanceof HTMLElement;
  }
  function o(e2) {
    return "undefined" != typeof ShadowRoot && (e2 instanceof t(e2).ShadowRoot || e2 instanceof ShadowRoot);
  }
  var i = Math.max, a = Math.min, s = Math.round;
  function f() {
    var e2 = navigator.userAgentData;
    return null != e2 && e2.brands && Array.isArray(e2.brands) ? e2.brands.map((function(e3) {
      return e3.brand + "/" + e3.version;
    })).join(" ") : navigator.userAgent;
  }
  function c() {
    return !/^((?!chrome|android).)*safari/i.test(f());
  }
  function p(e2, o2, i2) {
    void 0 === o2 && (o2 = false), void 0 === i2 && (i2 = false);
    var a2 = e2.getBoundingClientRect(), f2 = 1, p2 = 1;
    o2 && r(e2) && (f2 = e2.offsetWidth > 0 && s(a2.width) / e2.offsetWidth || 1, p2 = e2.offsetHeight > 0 && s(a2.height) / e2.offsetHeight || 1);
    var u2 = (n(e2) ? t(e2) : window).visualViewport, l2 = !c() && i2, d2 = (a2.left + (l2 && u2 ? u2.offsetLeft : 0)) / f2, h2 = (a2.top + (l2 && u2 ? u2.offsetTop : 0)) / p2, m2 = a2.width / f2, v2 = a2.height / p2;
    return { width: m2, height: v2, top: h2, right: d2 + m2, bottom: h2 + v2, left: d2, x: d2, y: h2 };
  }
  function u(e2) {
    var n2 = t(e2);
    return { scrollLeft: n2.pageXOffset, scrollTop: n2.pageYOffset };
  }
  function l(e2) {
    return e2 ? (e2.nodeName || "").toLowerCase() : null;
  }
  function d(e2) {
    return ((n(e2) ? e2.ownerDocument : e2.document) || window.document).documentElement;
  }
  function h(e2) {
    return p(d(e2)).left + u(e2).scrollLeft;
  }
  function m(e2) {
    return t(e2).getComputedStyle(e2);
  }
  function v(e2) {
    var t2 = m(e2), n2 = t2.overflow, r2 = t2.overflowX, o2 = t2.overflowY;
    return /auto|scroll|overlay|hidden/.test(n2 + o2 + r2);
  }
  function y(e2, n2, o2) {
    void 0 === o2 && (o2 = false);
    var i2, a2, f2 = r(n2), c2 = r(n2) && (function(e3) {
      var t2 = e3.getBoundingClientRect(), n3 = s(t2.width) / e3.offsetWidth || 1, r2 = s(t2.height) / e3.offsetHeight || 1;
      return 1 !== n3 || 1 !== r2;
    })(n2), m2 = d(n2), y2 = p(e2, c2, o2), g2 = { scrollLeft: 0, scrollTop: 0 }, b2 = { x: 0, y: 0 };
    return (f2 || !f2 && !o2) && (("body" !== l(n2) || v(m2)) && (g2 = (i2 = n2) !== t(i2) && r(i2) ? { scrollLeft: (a2 = i2).scrollLeft, scrollTop: a2.scrollTop } : u(i2)), r(n2) ? ((b2 = p(n2, true)).x += n2.clientLeft, b2.y += n2.clientTop) : m2 && (b2.x = h(m2))), { x: y2.left + g2.scrollLeft - b2.x, y: y2.top + g2.scrollTop - b2.y, width: y2.width, height: y2.height };
  }
  function g(e2) {
    var t2 = p(e2), n2 = e2.offsetWidth, r2 = e2.offsetHeight;
    return Math.abs(t2.width - n2) <= 1 && (n2 = t2.width), Math.abs(t2.height - r2) <= 1 && (r2 = t2.height), { x: e2.offsetLeft, y: e2.offsetTop, width: n2, height: r2 };
  }
  function b(e2) {
    return "html" === l(e2) ? e2 : e2.assignedSlot || e2.parentNode || (o(e2) ? e2.host : null) || d(e2);
  }
  function x(e2) {
    return ["html", "body", "#document"].indexOf(l(e2)) >= 0 ? e2.ownerDocument.body : r(e2) && v(e2) ? e2 : x(b(e2));
  }
  function w(e2, n2) {
    var r2;
    void 0 === n2 && (n2 = []);
    var o2 = x(e2), i2 = o2 === (null == (r2 = e2.ownerDocument) ? void 0 : r2.body), a2 = t(o2), s2 = i2 ? [a2].concat(a2.visualViewport || [], v(o2) ? o2 : []) : o2, f2 = n2.concat(s2);
    return i2 ? f2 : f2.concat(w(b(s2)));
  }
  function O(e2) {
    return ["table", "td", "th"].indexOf(l(e2)) >= 0;
  }
  function j(e2) {
    return r(e2) && "fixed" !== m(e2).position ? e2.offsetParent : null;
  }
  function E(e2) {
    for (var n2 = t(e2), i2 = j(e2); i2 && O(i2) && "static" === m(i2).position; ) i2 = j(i2);
    return i2 && ("html" === l(i2) || "body" === l(i2) && "static" === m(i2).position) ? n2 : i2 || (function(e3) {
      var t2 = /firefox/i.test(f());
      if (/Trident/i.test(f()) && r(e3) && "fixed" === m(e3).position) return null;
      var n3 = b(e3);
      for (o(n3) && (n3 = n3.host); r(n3) && ["html", "body"].indexOf(l(n3)) < 0; ) {
        var i3 = m(n3);
        if ("none" !== i3.transform || "none" !== i3.perspective || "paint" === i3.contain || -1 !== ["transform", "perspective"].indexOf(i3.willChange) || t2 && "filter" === i3.willChange || t2 && i3.filter && "none" !== i3.filter) return n3;
        n3 = n3.parentNode;
      }
      return null;
    })(e2) || n2;
  }
  var D = "top", A = "bottom", L = "right", P = "left", M = "auto", k = [D, A, L, P], W = "start", B = "end", H = "viewport", T = "popper", R = k.reduce((function(e2, t2) {
    return e2.concat([t2 + "-" + W, t2 + "-" + B]);
  }), []), S = [].concat(k, [M]).reduce((function(e2, t2) {
    return e2.concat([t2, t2 + "-" + W, t2 + "-" + B]);
  }), []), V = ["beforeRead", "read", "afterRead", "beforeMain", "main", "afterMain", "beforeWrite", "write", "afterWrite"];
  function q(e2) {
    var t2 = /* @__PURE__ */ new Map(), n2 = /* @__PURE__ */ new Set(), r2 = [];
    function o2(e3) {
      n2.add(e3.name), [].concat(e3.requires || [], e3.requiresIfExists || []).forEach((function(e4) {
        if (!n2.has(e4)) {
          var r3 = t2.get(e4);
          r3 && o2(r3);
        }
      })), r2.push(e3);
    }
    return e2.forEach((function(e3) {
      t2.set(e3.name, e3);
    })), e2.forEach((function(e3) {
      n2.has(e3.name) || o2(e3);
    })), r2;
  }
  function C(e2, t2) {
    var n2 = t2.getRootNode && t2.getRootNode();
    if (e2.contains(t2)) return true;
    if (n2 && o(n2)) {
      var r2 = t2;
      do {
        if (r2 && e2.isSameNode(r2)) return true;
        r2 = r2.parentNode || r2.host;
      } while (r2);
    }
    return false;
  }
  function N(e2) {
    return Object.assign({}, e2, { left: e2.x, top: e2.y, right: e2.x + e2.width, bottom: e2.y + e2.height });
  }
  function I(e2, r2, o2) {
    return r2 === H ? N((function(e3, n2) {
      var r3 = t(e3), o3 = d(e3), i2 = r3.visualViewport, a2 = o3.clientWidth, s2 = o3.clientHeight, f2 = 0, p2 = 0;
      if (i2) {
        a2 = i2.width, s2 = i2.height;
        var u2 = c();
        (u2 || !u2 && "fixed" === n2) && (f2 = i2.offsetLeft, p2 = i2.offsetTop);
      }
      return { width: a2, height: s2, x: f2 + h(e3), y: p2 };
    })(e2, o2)) : n(r2) ? (function(e3, t2) {
      var n2 = p(e3, false, "fixed" === t2);
      return n2.top = n2.top + e3.clientTop, n2.left = n2.left + e3.clientLeft, n2.bottom = n2.top + e3.clientHeight, n2.right = n2.left + e3.clientWidth, n2.width = e3.clientWidth, n2.height = e3.clientHeight, n2.x = n2.left, n2.y = n2.top, n2;
    })(r2, o2) : N((function(e3) {
      var t2, n2 = d(e3), r3 = u(e3), o3 = null == (t2 = e3.ownerDocument) ? void 0 : t2.body, a2 = i(n2.scrollWidth, n2.clientWidth, o3 ? o3.scrollWidth : 0, o3 ? o3.clientWidth : 0), s2 = i(n2.scrollHeight, n2.clientHeight, o3 ? o3.scrollHeight : 0, o3 ? o3.clientHeight : 0), f2 = -r3.scrollLeft + h(e3), c2 = -r3.scrollTop;
      return "rtl" === m(o3 || n2).direction && (f2 += i(n2.clientWidth, o3 ? o3.clientWidth : 0) - a2), { width: a2, height: s2, x: f2, y: c2 };
    })(d(e2)));
  }
  function _(e2, t2, o2, s2) {
    var f2 = "clippingParents" === t2 ? (function(e3) {
      var t3 = w(b(e3)), o3 = ["absolute", "fixed"].indexOf(m(e3).position) >= 0 && r(e3) ? E(e3) : e3;
      return n(o3) ? t3.filter((function(e4) {
        return n(e4) && C(e4, o3) && "body" !== l(e4);
      })) : [];
    })(e2) : [].concat(t2), c2 = [].concat(f2, [o2]), p2 = c2[0], u2 = c2.reduce((function(t3, n2) {
      var r2 = I(e2, n2, s2);
      return t3.top = i(r2.top, t3.top), t3.right = a(r2.right, t3.right), t3.bottom = a(r2.bottom, t3.bottom), t3.left = i(r2.left, t3.left), t3;
    }), I(e2, p2, s2));
    return u2.width = u2.right - u2.left, u2.height = u2.bottom - u2.top, u2.x = u2.left, u2.y = u2.top, u2;
  }
  function F(e2) {
    return e2.split("-")[0];
  }
  function U(e2) {
    return e2.split("-")[1];
  }
  function z(e2) {
    return ["top", "bottom"].indexOf(e2) >= 0 ? "x" : "y";
  }
  function X(e2) {
    var t2, n2 = e2.reference, r2 = e2.element, o2 = e2.placement, i2 = o2 ? F(o2) : null, a2 = o2 ? U(o2) : null, s2 = n2.x + n2.width / 2 - r2.width / 2, f2 = n2.y + n2.height / 2 - r2.height / 2;
    switch (i2) {
      case D:
        t2 = { x: s2, y: n2.y - r2.height };
        break;
      case A:
        t2 = { x: s2, y: n2.y + n2.height };
        break;
      case L:
        t2 = { x: n2.x + n2.width, y: f2 };
        break;
      case P:
        t2 = { x: n2.x - r2.width, y: f2 };
        break;
      default:
        t2 = { x: n2.x, y: n2.y };
    }
    var c2 = i2 ? z(i2) : null;
    if (null != c2) {
      var p2 = "y" === c2 ? "height" : "width";
      switch (a2) {
        case W:
          t2[c2] = t2[c2] - (n2[p2] / 2 - r2[p2] / 2);
          break;
        case B:
          t2[c2] = t2[c2] + (n2[p2] / 2 - r2[p2] / 2);
      }
    }
    return t2;
  }
  function Y(e2) {
    return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, e2);
  }
  function G(e2, t2) {
    return t2.reduce((function(t3, n2) {
      return t3[n2] = e2, t3;
    }), {});
  }
  function J(e2, t2) {
    void 0 === t2 && (t2 = {});
    var r2 = t2, o2 = r2.placement, i2 = void 0 === o2 ? e2.placement : o2, a2 = r2.strategy, s2 = void 0 === a2 ? e2.strategy : a2, f2 = r2.boundary, c2 = void 0 === f2 ? "clippingParents" : f2, u2 = r2.rootBoundary, l2 = void 0 === u2 ? H : u2, h2 = r2.elementContext, m2 = void 0 === h2 ? T : h2, v2 = r2.altBoundary, y2 = void 0 !== v2 && v2, g2 = r2.padding, b2 = void 0 === g2 ? 0 : g2, x2 = Y("number" != typeof b2 ? b2 : G(b2, k)), w2 = m2 === T ? "reference" : T, O2 = e2.rects.popper, j2 = e2.elements[y2 ? w2 : m2], E2 = _(n(j2) ? j2 : j2.contextElement || d(e2.elements.popper), c2, l2, s2), P2 = p(e2.elements.reference), M2 = X({ reference: P2, element: O2, strategy: "absolute", placement: i2 }), W2 = N(Object.assign({}, O2, M2)), B2 = m2 === T ? W2 : P2, R2 = { top: E2.top - B2.top + x2.top, bottom: B2.bottom - E2.bottom + x2.bottom, left: E2.left - B2.left + x2.left, right: B2.right - E2.right + x2.right }, S2 = e2.modifiersData.offset;
    if (m2 === T && S2) {
      var V2 = S2[i2];
      Object.keys(R2).forEach((function(e3) {
        var t3 = [L, A].indexOf(e3) >= 0 ? 1 : -1, n2 = [D, A].indexOf(e3) >= 0 ? "y" : "x";
        R2[e3] += V2[n2] * t3;
      }));
    }
    return R2;
  }
  var K = { placement: "bottom", modifiers: [], strategy: "absolute" };
  function Q() {
    for (var e2 = arguments.length, t2 = new Array(e2), n2 = 0; n2 < e2; n2++) t2[n2] = arguments[n2];
    return !t2.some((function(e3) {
      return !(e3 && "function" == typeof e3.getBoundingClientRect);
    }));
  }
  function Z(e2) {
    void 0 === e2 && (e2 = {});
    var t2 = e2, r2 = t2.defaultModifiers, o2 = void 0 === r2 ? [] : r2, i2 = t2.defaultOptions, a2 = void 0 === i2 ? K : i2;
    return function(e3, t3, r3) {
      void 0 === r3 && (r3 = a2);
      var i3, s2, f2 = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, K, a2), modifiersData: {}, elements: { reference: e3, popper: t3 }, attributes: {}, styles: {} }, c2 = [], p2 = false, u2 = { state: f2, setOptions: function(r4) {
        var i4 = "function" == typeof r4 ? r4(f2.options) : r4;
        l2(), f2.options = Object.assign({}, a2, f2.options, i4), f2.scrollParents = { reference: n(e3) ? w(e3) : e3.contextElement ? w(e3.contextElement) : [], popper: w(t3) };
        var s3, p3, d2 = (function(e4) {
          var t4 = q(e4);
          return V.reduce((function(e5, n2) {
            return e5.concat(t4.filter((function(e6) {
              return e6.phase === n2;
            })));
          }), []);
        })((s3 = [].concat(o2, f2.options.modifiers), p3 = s3.reduce((function(e4, t4) {
          var n2 = e4[t4.name];
          return e4[t4.name] = n2 ? Object.assign({}, n2, t4, { options: Object.assign({}, n2.options, t4.options), data: Object.assign({}, n2.data, t4.data) }) : t4, e4;
        }), {}), Object.keys(p3).map((function(e4) {
          return p3[e4];
        }))));
        return f2.orderedModifiers = d2.filter((function(e4) {
          return e4.enabled;
        })), f2.orderedModifiers.forEach((function(e4) {
          var t4 = e4.name, n2 = e4.options, r5 = void 0 === n2 ? {} : n2, o3 = e4.effect;
          if ("function" == typeof o3) {
            var i5 = o3({ state: f2, name: t4, instance: u2, options: r5 }), a3 = function() {
            };
            c2.push(i5 || a3);
          }
        })), u2.update();
      }, forceUpdate: function() {
        if (!p2) {
          var e4 = f2.elements, t4 = e4.reference, n2 = e4.popper;
          if (Q(t4, n2)) {
            f2.rects = { reference: y(t4, E(n2), "fixed" === f2.options.strategy), popper: g(n2) }, f2.reset = false, f2.placement = f2.options.placement, f2.orderedModifiers.forEach((function(e5) {
              return f2.modifiersData[e5.name] = Object.assign({}, e5.data);
            }));
            for (var r4 = 0; r4 < f2.orderedModifiers.length; r4++) if (true !== f2.reset) {
              var o3 = f2.orderedModifiers[r4], i4 = o3.fn, a3 = o3.options, s3 = void 0 === a3 ? {} : a3, c3 = o3.name;
              "function" == typeof i4 && (f2 = i4({ state: f2, options: s3, name: c3, instance: u2 }) || f2);
            } else f2.reset = false, r4 = -1;
          }
        }
      }, update: (i3 = function() {
        return new Promise((function(e4) {
          u2.forceUpdate(), e4(f2);
        }));
      }, function() {
        return s2 || (s2 = new Promise((function(e4) {
          Promise.resolve().then((function() {
            s2 = void 0, e4(i3());
          }));
        }))), s2;
      }), destroy: function() {
        l2(), p2 = true;
      } };
      if (!Q(e3, t3)) return u2;
      function l2() {
        c2.forEach((function(e4) {
          return e4();
        })), c2 = [];
      }
      return u2.setOptions(r3).then((function(e4) {
        !p2 && r3.onFirstUpdate && r3.onFirstUpdate(e4);
      })), u2;
    };
  }
  var $ = { passive: true };
  var ee = { name: "eventListeners", enabled: true, phase: "write", fn: function() {
  }, effect: function(e2) {
    var n2 = e2.state, r2 = e2.instance, o2 = e2.options, i2 = o2.scroll, a2 = void 0 === i2 || i2, s2 = o2.resize, f2 = void 0 === s2 || s2, c2 = t(n2.elements.popper), p2 = [].concat(n2.scrollParents.reference, n2.scrollParents.popper);
    return a2 && p2.forEach((function(e3) {
      e3.addEventListener("scroll", r2.update, $);
    })), f2 && c2.addEventListener("resize", r2.update, $), function() {
      a2 && p2.forEach((function(e3) {
        e3.removeEventListener("scroll", r2.update, $);
      })), f2 && c2.removeEventListener("resize", r2.update, $);
    };
  }, data: {} };
  var te = { name: "popperOffsets", enabled: true, phase: "read", fn: function(e2) {
    var t2 = e2.state, n2 = e2.name;
    t2.modifiersData[n2] = X({ reference: t2.rects.reference, element: t2.rects.popper, strategy: "absolute", placement: t2.placement });
  }, data: {} }, ne = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
  function re(e2) {
    var n2, r2 = e2.popper, o2 = e2.popperRect, i2 = e2.placement, a2 = e2.variation, f2 = e2.offsets, c2 = e2.position, p2 = e2.gpuAcceleration, u2 = e2.adaptive, l2 = e2.roundOffsets, h2 = e2.isFixed, v2 = f2.x, y2 = void 0 === v2 ? 0 : v2, g2 = f2.y, b2 = void 0 === g2 ? 0 : g2, x2 = "function" == typeof l2 ? l2({ x: y2, y: b2 }) : { x: y2, y: b2 };
    y2 = x2.x, b2 = x2.y;
    var w2 = f2.hasOwnProperty("x"), O2 = f2.hasOwnProperty("y"), j2 = P, M2 = D, k2 = window;
    if (u2) {
      var W2 = E(r2), H2 = "clientHeight", T2 = "clientWidth";
      if (W2 === t(r2) && "static" !== m(W2 = d(r2)).position && "absolute" === c2 && (H2 = "scrollHeight", T2 = "scrollWidth"), W2 = W2, i2 === D || (i2 === P || i2 === L) && a2 === B) M2 = A, b2 -= (h2 && W2 === k2 && k2.visualViewport ? k2.visualViewport.height : W2[H2]) - o2.height, b2 *= p2 ? 1 : -1;
      if (i2 === P || (i2 === D || i2 === A) && a2 === B) j2 = L, y2 -= (h2 && W2 === k2 && k2.visualViewport ? k2.visualViewport.width : W2[T2]) - o2.width, y2 *= p2 ? 1 : -1;
    }
    var R2, S2 = Object.assign({ position: c2 }, u2 && ne), V2 = true === l2 ? (function(e3, t2) {
      var n3 = e3.x, r3 = e3.y, o3 = t2.devicePixelRatio || 1;
      return { x: s(n3 * o3) / o3 || 0, y: s(r3 * o3) / o3 || 0 };
    })({ x: y2, y: b2 }, t(r2)) : { x: y2, y: b2 };
    return y2 = V2.x, b2 = V2.y, p2 ? Object.assign({}, S2, ((R2 = {})[M2] = O2 ? "0" : "", R2[j2] = w2 ? "0" : "", R2.transform = (k2.devicePixelRatio || 1) <= 1 ? "translate(" + y2 + "px, " + b2 + "px)" : "translate3d(" + y2 + "px, " + b2 + "px, 0)", R2)) : Object.assign({}, S2, ((n2 = {})[M2] = O2 ? b2 + "px" : "", n2[j2] = w2 ? y2 + "px" : "", n2.transform = "", n2));
  }
  var oe = { name: "computeStyles", enabled: true, phase: "beforeWrite", fn: function(e2) {
    var t2 = e2.state, n2 = e2.options, r2 = n2.gpuAcceleration, o2 = void 0 === r2 || r2, i2 = n2.adaptive, a2 = void 0 === i2 || i2, s2 = n2.roundOffsets, f2 = void 0 === s2 || s2, c2 = { placement: F(t2.placement), variation: U(t2.placement), popper: t2.elements.popper, popperRect: t2.rects.popper, gpuAcceleration: o2, isFixed: "fixed" === t2.options.strategy };
    null != t2.modifiersData.popperOffsets && (t2.styles.popper = Object.assign({}, t2.styles.popper, re(Object.assign({}, c2, { offsets: t2.modifiersData.popperOffsets, position: t2.options.strategy, adaptive: a2, roundOffsets: f2 })))), null != t2.modifiersData.arrow && (t2.styles.arrow = Object.assign({}, t2.styles.arrow, re(Object.assign({}, c2, { offsets: t2.modifiersData.arrow, position: "absolute", adaptive: false, roundOffsets: f2 })))), t2.attributes.popper = Object.assign({}, t2.attributes.popper, { "data-popper-placement": t2.placement });
  }, data: {} };
  var ie = { name: "applyStyles", enabled: true, phase: "write", fn: function(e2) {
    var t2 = e2.state;
    Object.keys(t2.elements).forEach((function(e3) {
      var n2 = t2.styles[e3] || {}, o2 = t2.attributes[e3] || {}, i2 = t2.elements[e3];
      r(i2) && l(i2) && (Object.assign(i2.style, n2), Object.keys(o2).forEach((function(e4) {
        var t3 = o2[e4];
        false === t3 ? i2.removeAttribute(e4) : i2.setAttribute(e4, true === t3 ? "" : t3);
      })));
    }));
  }, effect: function(e2) {
    var t2 = e2.state, n2 = { popper: { position: t2.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
    return Object.assign(t2.elements.popper.style, n2.popper), t2.styles = n2, t2.elements.arrow && Object.assign(t2.elements.arrow.style, n2.arrow), function() {
      Object.keys(t2.elements).forEach((function(e3) {
        var o2 = t2.elements[e3], i2 = t2.attributes[e3] || {}, a2 = Object.keys(t2.styles.hasOwnProperty(e3) ? t2.styles[e3] : n2[e3]).reduce((function(e4, t3) {
          return e4[t3] = "", e4;
        }), {});
        r(o2) && l(o2) && (Object.assign(o2.style, a2), Object.keys(i2).forEach((function(e4) {
          o2.removeAttribute(e4);
        })));
      }));
    };
  }, requires: ["computeStyles"] };
  var ae = { name: "offset", enabled: true, phase: "main", requires: ["popperOffsets"], fn: function(e2) {
    var t2 = e2.state, n2 = e2.options, r2 = e2.name, o2 = n2.offset, i2 = void 0 === o2 ? [0, 0] : o2, a2 = S.reduce((function(e3, n3) {
      return e3[n3] = (function(e4, t3, n4) {
        var r3 = F(e4), o3 = [P, D].indexOf(r3) >= 0 ? -1 : 1, i3 = "function" == typeof n4 ? n4(Object.assign({}, t3, { placement: e4 })) : n4, a3 = i3[0], s3 = i3[1];
        return a3 = a3 || 0, s3 = (s3 || 0) * o3, [P, L].indexOf(r3) >= 0 ? { x: s3, y: a3 } : { x: a3, y: s3 };
      })(n3, t2.rects, i2), e3;
    }), {}), s2 = a2[t2.placement], f2 = s2.x, c2 = s2.y;
    null != t2.modifiersData.popperOffsets && (t2.modifiersData.popperOffsets.x += f2, t2.modifiersData.popperOffsets.y += c2), t2.modifiersData[r2] = a2;
  } }, se = { left: "right", right: "left", bottom: "top", top: "bottom" };
  function fe(e2) {
    return e2.replace(/left|right|bottom|top/g, (function(e3) {
      return se[e3];
    }));
  }
  var ce = { start: "end", end: "start" };
  function pe(e2) {
    return e2.replace(/start|end/g, (function(e3) {
      return ce[e3];
    }));
  }
  function ue(e2, t2) {
    void 0 === t2 && (t2 = {});
    var n2 = t2, r2 = n2.placement, o2 = n2.boundary, i2 = n2.rootBoundary, a2 = n2.padding, s2 = n2.flipVariations, f2 = n2.allowedAutoPlacements, c2 = void 0 === f2 ? S : f2, p2 = U(r2), u2 = p2 ? s2 ? R : R.filter((function(e3) {
      return U(e3) === p2;
    })) : k, l2 = u2.filter((function(e3) {
      return c2.indexOf(e3) >= 0;
    }));
    0 === l2.length && (l2 = u2);
    var d2 = l2.reduce((function(t3, n3) {
      return t3[n3] = J(e2, { placement: n3, boundary: o2, rootBoundary: i2, padding: a2 })[F(n3)], t3;
    }), {});
    return Object.keys(d2).sort((function(e3, t3) {
      return d2[e3] - d2[t3];
    }));
  }
  var le = { name: "flip", enabled: true, phase: "main", fn: function(e2) {
    var t2 = e2.state, n2 = e2.options, r2 = e2.name;
    if (!t2.modifiersData[r2]._skip) {
      for (var o2 = n2.mainAxis, i2 = void 0 === o2 || o2, a2 = n2.altAxis, s2 = void 0 === a2 || a2, f2 = n2.fallbackPlacements, c2 = n2.padding, p2 = n2.boundary, u2 = n2.rootBoundary, l2 = n2.altBoundary, d2 = n2.flipVariations, h2 = void 0 === d2 || d2, m2 = n2.allowedAutoPlacements, v2 = t2.options.placement, y2 = F(v2), g2 = f2 || (y2 === v2 || !h2 ? [fe(v2)] : (function(e3) {
        if (F(e3) === M) return [];
        var t3 = fe(e3);
        return [pe(e3), t3, pe(t3)];
      })(v2)), b2 = [v2].concat(g2).reduce((function(e3, n3) {
        return e3.concat(F(n3) === M ? ue(t2, { placement: n3, boundary: p2, rootBoundary: u2, padding: c2, flipVariations: h2, allowedAutoPlacements: m2 }) : n3);
      }), []), x2 = t2.rects.reference, w2 = t2.rects.popper, O2 = /* @__PURE__ */ new Map(), j2 = true, E2 = b2[0], k2 = 0; k2 < b2.length; k2++) {
        var B2 = b2[k2], H2 = F(B2), T2 = U(B2) === W, R2 = [D, A].indexOf(H2) >= 0, S2 = R2 ? "width" : "height", V2 = J(t2, { placement: B2, boundary: p2, rootBoundary: u2, altBoundary: l2, padding: c2 }), q2 = R2 ? T2 ? L : P : T2 ? A : D;
        x2[S2] > w2[S2] && (q2 = fe(q2));
        var C2 = fe(q2), N2 = [];
        if (i2 && N2.push(V2[H2] <= 0), s2 && N2.push(V2[q2] <= 0, V2[C2] <= 0), N2.every((function(e3) {
          return e3;
        }))) {
          E2 = B2, j2 = false;
          break;
        }
        O2.set(B2, N2);
      }
      if (j2) for (var I2 = function(e3) {
        var t3 = b2.find((function(t4) {
          var n3 = O2.get(t4);
          if (n3) return n3.slice(0, e3).every((function(e4) {
            return e4;
          }));
        }));
        if (t3) return E2 = t3, "break";
      }, _2 = h2 ? 3 : 1; _2 > 0; _2--) {
        if ("break" === I2(_2)) break;
      }
      t2.placement !== E2 && (t2.modifiersData[r2]._skip = true, t2.placement = E2, t2.reset = true);
    }
  }, requiresIfExists: ["offset"], data: { _skip: false } };
  function de(e2, t2, n2) {
    return i(e2, a(t2, n2));
  }
  var he = { name: "preventOverflow", enabled: true, phase: "main", fn: function(e2) {
    var t2 = e2.state, n2 = e2.options, r2 = e2.name, o2 = n2.mainAxis, s2 = void 0 === o2 || o2, f2 = n2.altAxis, c2 = void 0 !== f2 && f2, p2 = n2.boundary, u2 = n2.rootBoundary, l2 = n2.altBoundary, d2 = n2.padding, h2 = n2.tether, m2 = void 0 === h2 || h2, v2 = n2.tetherOffset, y2 = void 0 === v2 ? 0 : v2, b2 = J(t2, { boundary: p2, rootBoundary: u2, padding: d2, altBoundary: l2 }), x2 = F(t2.placement), w2 = U(t2.placement), O2 = !w2, j2 = z(x2), M2 = "x" === j2 ? "y" : "x", k2 = t2.modifiersData.popperOffsets, B2 = t2.rects.reference, H2 = t2.rects.popper, T2 = "function" == typeof y2 ? y2(Object.assign({}, t2.rects, { placement: t2.placement })) : y2, R2 = "number" == typeof T2 ? { mainAxis: T2, altAxis: T2 } : Object.assign({ mainAxis: 0, altAxis: 0 }, T2), S2 = t2.modifiersData.offset ? t2.modifiersData.offset[t2.placement] : null, V2 = { x: 0, y: 0 };
    if (k2) {
      if (s2) {
        var q2, C2 = "y" === j2 ? D : P, N2 = "y" === j2 ? A : L, I2 = "y" === j2 ? "height" : "width", _2 = k2[j2], X2 = _2 + b2[C2], Y2 = _2 - b2[N2], G2 = m2 ? -H2[I2] / 2 : 0, K2 = w2 === W ? B2[I2] : H2[I2], Q2 = w2 === W ? -H2[I2] : -B2[I2], Z2 = t2.elements.arrow, $2 = m2 && Z2 ? g(Z2) : { width: 0, height: 0 }, ee2 = t2.modifiersData["arrow#persistent"] ? t2.modifiersData["arrow#persistent"].padding : { top: 0, right: 0, bottom: 0, left: 0 }, te2 = ee2[C2], ne2 = ee2[N2], re2 = de(0, B2[I2], $2[I2]), oe2 = O2 ? B2[I2] / 2 - G2 - re2 - te2 - R2.mainAxis : K2 - re2 - te2 - R2.mainAxis, ie2 = O2 ? -B2[I2] / 2 + G2 + re2 + ne2 + R2.mainAxis : Q2 + re2 + ne2 + R2.mainAxis, ae2 = t2.elements.arrow && E(t2.elements.arrow), se2 = ae2 ? "y" === j2 ? ae2.clientTop || 0 : ae2.clientLeft || 0 : 0, fe2 = null != (q2 = null == S2 ? void 0 : S2[j2]) ? q2 : 0, ce2 = _2 + ie2 - fe2, pe2 = de(m2 ? a(X2, _2 + oe2 - fe2 - se2) : X2, _2, m2 ? i(Y2, ce2) : Y2);
        k2[j2] = pe2, V2[j2] = pe2 - _2;
      }
      if (c2) {
        var ue2, le2 = "x" === j2 ? D : P, he2 = "x" === j2 ? A : L, me2 = k2[M2], ve2 = "y" === M2 ? "height" : "width", ye2 = me2 + b2[le2], ge2 = me2 - b2[he2], be2 = -1 !== [D, P].indexOf(x2), xe2 = null != (ue2 = null == S2 ? void 0 : S2[M2]) ? ue2 : 0, we2 = be2 ? ye2 : me2 - B2[ve2] - H2[ve2] - xe2 + R2.altAxis, Oe = be2 ? me2 + B2[ve2] + H2[ve2] - xe2 - R2.altAxis : ge2, je = m2 && be2 ? (function(e3, t3, n3) {
          var r3 = de(e3, t3, n3);
          return r3 > n3 ? n3 : r3;
        })(we2, me2, Oe) : de(m2 ? we2 : ye2, me2, m2 ? Oe : ge2);
        k2[M2] = je, V2[M2] = je - me2;
      }
      t2.modifiersData[r2] = V2;
    }
  }, requiresIfExists: ["offset"] };
  var me = { name: "arrow", enabled: true, phase: "main", fn: function(e2) {
    var t2, n2 = e2.state, r2 = e2.name, o2 = e2.options, i2 = n2.elements.arrow, a2 = n2.modifiersData.popperOffsets, s2 = F(n2.placement), f2 = z(s2), c2 = [P, L].indexOf(s2) >= 0 ? "height" : "width";
    if (i2 && a2) {
      var p2 = (function(e3, t3) {
        return Y("number" != typeof (e3 = "function" == typeof e3 ? e3(Object.assign({}, t3.rects, { placement: t3.placement })) : e3) ? e3 : G(e3, k));
      })(o2.padding, n2), u2 = g(i2), l2 = "y" === f2 ? D : P, d2 = "y" === f2 ? A : L, h2 = n2.rects.reference[c2] + n2.rects.reference[f2] - a2[f2] - n2.rects.popper[c2], m2 = a2[f2] - n2.rects.reference[f2], v2 = E(i2), y2 = v2 ? "y" === f2 ? v2.clientHeight || 0 : v2.clientWidth || 0 : 0, b2 = h2 / 2 - m2 / 2, x2 = p2[l2], w2 = y2 - u2[c2] - p2[d2], O2 = y2 / 2 - u2[c2] / 2 + b2, j2 = de(x2, O2, w2), M2 = f2;
      n2.modifiersData[r2] = ((t2 = {})[M2] = j2, t2.centerOffset = j2 - O2, t2);
    }
  }, effect: function(e2) {
    var t2 = e2.state, n2 = e2.options.element, r2 = void 0 === n2 ? "[data-popper-arrow]" : n2;
    null != r2 && ("string" != typeof r2 || (r2 = t2.elements.popper.querySelector(r2))) && C(t2.elements.popper, r2) && (t2.elements.arrow = r2);
  }, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };
  function ve(e2, t2, n2) {
    return void 0 === n2 && (n2 = { x: 0, y: 0 }), { top: e2.top - t2.height - n2.y, right: e2.right - t2.width + n2.x, bottom: e2.bottom - t2.height + n2.y, left: e2.left - t2.width - n2.x };
  }
  function ye(e2) {
    return [D, L, A, P].some((function(t2) {
      return e2[t2] >= 0;
    }));
  }
  var ge = { name: "hide", enabled: true, phase: "main", requiresIfExists: ["preventOverflow"], fn: function(e2) {
    var t2 = e2.state, n2 = e2.name, r2 = t2.rects.reference, o2 = t2.rects.popper, i2 = t2.modifiersData.preventOverflow, a2 = J(t2, { elementContext: "reference" }), s2 = J(t2, { altBoundary: true }), f2 = ve(a2, r2), c2 = ve(s2, o2, i2), p2 = ye(f2), u2 = ye(c2);
    t2.modifiersData[n2] = { referenceClippingOffsets: f2, popperEscapeOffsets: c2, isReferenceHidden: p2, hasPopperEscaped: u2 }, t2.attributes.popper = Object.assign({}, t2.attributes.popper, { "data-popper-reference-hidden": p2, "data-popper-escaped": u2 });
  } }, be = Z({ defaultModifiers: [ee, te, oe, ie] }), xe = [ee, te, oe, ie, ae, le, he, me, ge], we = Z({ defaultModifiers: xe });
  e.applyStyles = ie, e.arrow = me, e.computeStyles = oe, e.createPopper = we, e.createPopperLite = be, e.defaultModifiers = xe, e.detectOverflow = J, e.eventListeners = ee, e.flip = le, e.hide = ge, e.offset = ae, e.popperGenerator = Z, e.popperOffsets = te, e.preventOverflow = he, Object.defineProperty(e, "__esModule", { value: true });
}));
/*!
  * Bootstrap v5.3.8 (https://getbootstrap.com/)
  * Copyright 2011-2025 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
  */
!(function(t, e) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = e(require("@popperjs/core")) : "function" == typeof define && define.amd ? define(["@popperjs/core"], e) : (t = "undefined" != typeof globalThis ? globalThis : t || self).bootstrap = e(t.Popper);
})(this, function(t) {
  "use strict";
  function e(t2) {
    const e2 = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
    if (t2) {
      for (const i2 in t2) if ("default" !== i2) {
        const s2 = Object.getOwnPropertyDescriptor(t2, i2);
        Object.defineProperty(e2, i2, s2.get ? s2 : { enumerable: true, get: () => t2[i2] });
      }
    }
    return e2.default = t2, Object.freeze(e2);
  }
  const i = e(t), s = /* @__PURE__ */ new Map(), n = { set(t2, e2, i2) {
    s.has(t2) || s.set(t2, /* @__PURE__ */ new Map());
    const n2 = s.get(t2);
    n2.has(e2) || 0 === n2.size ? n2.set(e2, i2) : console.error(`Bootstrap doesn't allow more than one instance per element. Bound instance: ${Array.from(n2.keys())[0]}.`);
  }, get: (t2, e2) => s.has(t2) && s.get(t2).get(e2) || null, remove(t2, e2) {
    if (!s.has(t2)) return;
    const i2 = s.get(t2);
    i2.delete(e2), 0 === i2.size && s.delete(t2);
  } }, o = "transitionend", r = (t2) => (t2 && window.CSS && window.CSS.escape && (t2 = t2.replace(/#([^\s"#']+)/g, (t3, e2) => `#${CSS.escape(e2)}`)), t2), a = (t2) => null == t2 ? `${t2}` : Object.prototype.toString.call(t2).match(/\s([a-z]+)/i)[1].toLowerCase(), l = (t2) => {
    t2.dispatchEvent(new Event(o));
  }, c = (t2) => !(!t2 || "object" != typeof t2) && (void 0 !== t2.jquery && (t2 = t2[0]), void 0 !== t2.nodeType), h = (t2) => c(t2) ? t2.jquery ? t2[0] : t2 : "string" == typeof t2 && t2.length > 0 ? document.querySelector(r(t2)) : null, d = (t2) => {
    if (!c(t2) || 0 === t2.getClientRects().length) return false;
    const e2 = "visible" === getComputedStyle(t2).getPropertyValue("visibility"), i2 = t2.closest("details:not([open])");
    if (!i2) return e2;
    if (i2 !== t2) {
      const e3 = t2.closest("summary");
      if (e3 && e3.parentNode !== i2) return false;
      if (null === e3) return false;
    }
    return e2;
  }, u = (t2) => !t2 || t2.nodeType !== Node.ELEMENT_NODE || !!t2.classList.contains("disabled") || (void 0 !== t2.disabled ? t2.disabled : t2.hasAttribute("disabled") && "false" !== t2.getAttribute("disabled")), _ = (t2) => {
    if (!document.documentElement.attachShadow) return null;
    if ("function" == typeof t2.getRootNode) {
      const e2 = t2.getRootNode();
      return e2 instanceof ShadowRoot ? e2 : null;
    }
    return t2 instanceof ShadowRoot ? t2 : t2.parentNode ? _(t2.parentNode) : null;
  }, g = () => {
  }, f = (t2) => {
    t2.offsetHeight;
  }, m = () => window.jQuery && !document.body.hasAttribute("data-bs-no-jquery") ? window.jQuery : null, p = [], b = () => "rtl" === document.documentElement.dir, v = (t2) => {
    var e2;
    e2 = () => {
      const e3 = m();
      if (e3) {
        const i2 = t2.NAME, s2 = e3.fn[i2];
        e3.fn[i2] = t2.jQueryInterface, e3.fn[i2].Constructor = t2, e3.fn[i2].noConflict = () => (e3.fn[i2] = s2, t2.jQueryInterface);
      }
    }, "loading" === document.readyState ? (p.length || document.addEventListener("DOMContentLoaded", () => {
      for (const t3 of p) t3();
    }), p.push(e2)) : e2();
  }, y = (t2, e2 = [], i2 = t2) => "function" == typeof t2 ? t2.call(...e2) : i2, w = (t2, e2, i2 = true) => {
    if (!i2) return void y(t2);
    const s2 = ((t3) => {
      if (!t3) return 0;
      let { transitionDuration: e3, transitionDelay: i3 } = window.getComputedStyle(t3);
      const s3 = Number.parseFloat(e3), n3 = Number.parseFloat(i3);
      return s3 || n3 ? (e3 = e3.split(",")[0], i3 = i3.split(",")[0], 1e3 * (Number.parseFloat(e3) + Number.parseFloat(i3))) : 0;
    })(e2) + 5;
    let n2 = false;
    const r2 = ({ target: i3 }) => {
      i3 === e2 && (n2 = true, e2.removeEventListener(o, r2), y(t2));
    };
    e2.addEventListener(o, r2), setTimeout(() => {
      n2 || l(e2);
    }, s2);
  }, A = (t2, e2, i2, s2) => {
    const n2 = t2.length;
    let o2 = t2.indexOf(e2);
    return -1 === o2 ? !i2 && s2 ? t2[n2 - 1] : t2[0] : (o2 += i2 ? 1 : -1, s2 && (o2 = (o2 + n2) % n2), t2[Math.max(0, Math.min(o2, n2 - 1))]);
  }, E = /[^.]*(?=\..*)\.|.*/, C = /\..*/, T = /::\d+$/, k = {};
  let $ = 1;
  const S = { mouseenter: "mouseover", mouseleave: "mouseout" }, L = /* @__PURE__ */ new Set(["click", "dblclick", "mouseup", "mousedown", "contextmenu", "mousewheel", "DOMMouseScroll", "mouseover", "mouseout", "mousemove", "selectstart", "selectend", "keydown", "keypress", "keyup", "orientationchange", "touchstart", "touchmove", "touchend", "touchcancel", "pointerdown", "pointermove", "pointerup", "pointerleave", "pointercancel", "gesturestart", "gesturechange", "gestureend", "focus", "blur", "change", "reset", "select", "submit", "focusin", "focusout", "load", "unload", "beforeunload", "resize", "move", "DOMContentLoaded", "readystatechange", "error", "abort", "scroll"]);
  function O(t2, e2) {
    return e2 && `${e2}::${$++}` || t2.uidEvent || $++;
  }
  function I(t2) {
    const e2 = O(t2);
    return t2.uidEvent = e2, k[e2] = k[e2] || {}, k[e2];
  }
  function D(t2, e2, i2 = null) {
    return Object.values(t2).find((t3) => t3.callable === e2 && t3.delegationSelector === i2);
  }
  function N(t2, e2, i2) {
    const s2 = "string" == typeof e2, n2 = s2 ? i2 : e2 || i2;
    let o2 = j(t2);
    return L.has(o2) || (o2 = t2), [s2, n2, o2];
  }
  function P(t2, e2, i2, s2, n2) {
    if ("string" != typeof e2 || !t2) return;
    let [o2, r2, a2] = N(e2, i2, s2);
    if (e2 in S) {
      const t3 = (t4) => function(e3) {
        if (!e3.relatedTarget || e3.relatedTarget !== e3.delegateTarget && !e3.delegateTarget.contains(e3.relatedTarget)) return t4.call(this, e3);
      };
      r2 = t3(r2);
    }
    const l2 = I(t2), c2 = l2[a2] || (l2[a2] = {}), h2 = D(c2, r2, o2 ? i2 : null);
    if (h2) return void (h2.oneOff = h2.oneOff && n2);
    const d2 = O(r2, e2.replace(E, "")), u2 = o2 ? /* @__PURE__ */ (function(t3, e3, i3) {
      return function s3(n3) {
        const o3 = t3.querySelectorAll(e3);
        for (let { target: r3 } = n3; r3 && r3 !== this; r3 = r3.parentNode) for (const a3 of o3) if (a3 === r3) return z(n3, { delegateTarget: r3 }), s3.oneOff && F.off(t3, n3.type, e3, i3), i3.apply(r3, [n3]);
      };
    })(t2, i2, r2) : /* @__PURE__ */ (function(t3, e3) {
      return function i3(s3) {
        return z(s3, { delegateTarget: t3 }), i3.oneOff && F.off(t3, s3.type, e3), e3.apply(t3, [s3]);
      };
    })(t2, r2);
    u2.delegationSelector = o2 ? i2 : null, u2.callable = r2, u2.oneOff = n2, u2.uidEvent = d2, c2[d2] = u2, t2.addEventListener(a2, u2, o2);
  }
  function x(t2, e2, i2, s2, n2) {
    const o2 = D(e2[i2], s2, n2);
    o2 && (t2.removeEventListener(i2, o2, Boolean(n2)), delete e2[i2][o2.uidEvent]);
  }
  function M(t2, e2, i2, s2) {
    const n2 = e2[i2] || {};
    for (const [o2, r2] of Object.entries(n2)) o2.includes(s2) && x(t2, e2, i2, r2.callable, r2.delegationSelector);
  }
  function j(t2) {
    return t2 = t2.replace(C, ""), S[t2] || t2;
  }
  const F = { on(t2, e2, i2, s2) {
    P(t2, e2, i2, s2, false);
  }, one(t2, e2, i2, s2) {
    P(t2, e2, i2, s2, true);
  }, off(t2, e2, i2, s2) {
    if ("string" != typeof e2 || !t2) return;
    const [n2, o2, r2] = N(e2, i2, s2), a2 = r2 !== e2, l2 = I(t2), c2 = l2[r2] || {}, h2 = e2.startsWith(".");
    if (void 0 === o2) {
      if (h2) for (const i3 of Object.keys(l2)) M(t2, l2, i3, e2.slice(1));
      for (const [i3, s3] of Object.entries(c2)) {
        const n3 = i3.replace(T, "");
        a2 && !e2.includes(n3) || x(t2, l2, r2, s3.callable, s3.delegationSelector);
      }
    } else {
      if (!Object.keys(c2).length) return;
      x(t2, l2, r2, o2, n2 ? i2 : null);
    }
  }, trigger(t2, e2, i2) {
    if ("string" != typeof e2 || !t2) return null;
    const s2 = m();
    let n2 = null, o2 = true, r2 = true, a2 = false;
    e2 !== j(e2) && s2 && (n2 = s2.Event(e2, i2), s2(t2).trigger(n2), o2 = !n2.isPropagationStopped(), r2 = !n2.isImmediatePropagationStopped(), a2 = n2.isDefaultPrevented());
    const l2 = z(new Event(e2, { bubbles: o2, cancelable: true }), i2);
    return a2 && l2.preventDefault(), r2 && t2.dispatchEvent(l2), l2.defaultPrevented && n2 && n2.preventDefault(), l2;
  } };
  function z(t2, e2 = {}) {
    for (const [i2, s2] of Object.entries(e2)) try {
      t2[i2] = s2;
    } catch (e3) {
      Object.defineProperty(t2, i2, { configurable: true, get: () => s2 });
    }
    return t2;
  }
  function H(t2) {
    if ("true" === t2) return true;
    if ("false" === t2) return false;
    if (t2 === Number(t2).toString()) return Number(t2);
    if ("" === t2 || "null" === t2) return null;
    if ("string" != typeof t2) return t2;
    try {
      return JSON.parse(decodeURIComponent(t2));
    } catch (e2) {
      return t2;
    }
  }
  function B(t2) {
    return t2.replace(/[A-Z]/g, (t3) => `-${t3.toLowerCase()}`);
  }
  const q = { setDataAttribute(t2, e2, i2) {
    t2.setAttribute(`data-bs-${B(e2)}`, i2);
  }, removeDataAttribute(t2, e2) {
    t2.removeAttribute(`data-bs-${B(e2)}`);
  }, getDataAttributes(t2) {
    if (!t2) return {};
    const e2 = {}, i2 = Object.keys(t2.dataset).filter((t3) => t3.startsWith("bs") && !t3.startsWith("bsConfig"));
    for (const s2 of i2) {
      let i3 = s2.replace(/^bs/, "");
      i3 = i3.charAt(0).toLowerCase() + i3.slice(1), e2[i3] = H(t2.dataset[s2]);
    }
    return e2;
  }, getDataAttribute: (t2, e2) => H(t2.getAttribute(`data-bs-${B(e2)}`)) };
  class W {
    static get Default() {
      return {};
    }
    static get DefaultType() {
      return {};
    }
    static get NAME() {
      throw new Error('You have to implement the static method "NAME", for each component!');
    }
    _getConfig(t2) {
      return t2 = this._mergeConfigObj(t2), t2 = this._configAfterMerge(t2), this._typeCheckConfig(t2), t2;
    }
    _configAfterMerge(t2) {
      return t2;
    }
    _mergeConfigObj(t2, e2) {
      const i2 = c(e2) ? q.getDataAttribute(e2, "config") : {};
      return { ...this.constructor.Default, ..."object" == typeof i2 ? i2 : {}, ...c(e2) ? q.getDataAttributes(e2) : {}, ..."object" == typeof t2 ? t2 : {} };
    }
    _typeCheckConfig(t2, e2 = this.constructor.DefaultType) {
      for (const [i2, s2] of Object.entries(e2)) {
        const e3 = t2[i2], n2 = c(e3) ? "element" : a(e3);
        if (!new RegExp(s2).test(n2)) throw new TypeError(`${this.constructor.NAME.toUpperCase()}: Option "${i2}" provided type "${n2}" but expected type "${s2}".`);
      }
    }
  }
  class R extends W {
    constructor(t2, e2) {
      super(), (t2 = h(t2)) && (this._element = t2, this._config = this._getConfig(e2), n.set(this._element, this.constructor.DATA_KEY, this));
    }
    dispose() {
      n.remove(this._element, this.constructor.DATA_KEY), F.off(this._element, this.constructor.EVENT_KEY);
      for (const t2 of Object.getOwnPropertyNames(this)) this[t2] = null;
    }
    _queueCallback(t2, e2, i2 = true) {
      w(t2, e2, i2);
    }
    _getConfig(t2) {
      return t2 = this._mergeConfigObj(t2, this._element), t2 = this._configAfterMerge(t2), this._typeCheckConfig(t2), t2;
    }
    static getInstance(t2) {
      return n.get(h(t2), this.DATA_KEY);
    }
    static getOrCreateInstance(t2, e2 = {}) {
      return this.getInstance(t2) || new this(t2, "object" == typeof e2 ? e2 : null);
    }
    static get VERSION() {
      return "5.3.8";
    }
    static get DATA_KEY() {
      return `bs.${this.NAME}`;
    }
    static get EVENT_KEY() {
      return `.${this.DATA_KEY}`;
    }
    static eventName(t2) {
      return `${t2}${this.EVENT_KEY}`;
    }
  }
  const K = (t2) => {
    let e2 = t2.getAttribute("data-bs-target");
    if (!e2 || "#" === e2) {
      let i2 = t2.getAttribute("href");
      if (!i2 || !i2.includes("#") && !i2.startsWith(".")) return null;
      i2.includes("#") && !i2.startsWith("#") && (i2 = `#${i2.split("#")[1]}`), e2 = i2 && "#" !== i2 ? i2.trim() : null;
    }
    return e2 ? e2.split(",").map((t3) => r(t3)).join(",") : null;
  }, V = { find: (t2, e2 = document.documentElement) => [].concat(...Element.prototype.querySelectorAll.call(e2, t2)), findOne: (t2, e2 = document.documentElement) => Element.prototype.querySelector.call(e2, t2), children: (t2, e2) => [].concat(...t2.children).filter((t3) => t3.matches(e2)), parents(t2, e2) {
    const i2 = [];
    let s2 = t2.parentNode.closest(e2);
    for (; s2; ) i2.push(s2), s2 = s2.parentNode.closest(e2);
    return i2;
  }, prev(t2, e2) {
    let i2 = t2.previousElementSibling;
    for (; i2; ) {
      if (i2.matches(e2)) return [i2];
      i2 = i2.previousElementSibling;
    }
    return [];
  }, next(t2, e2) {
    let i2 = t2.nextElementSibling;
    for (; i2; ) {
      if (i2.matches(e2)) return [i2];
      i2 = i2.nextElementSibling;
    }
    return [];
  }, focusableChildren(t2) {
    const e2 = ["a", "button", "input", "textarea", "select", "details", "[tabindex]", '[contenteditable="true"]'].map((t3) => `${t3}:not([tabindex^="-"])`).join(",");
    return this.find(e2, t2).filter((t3) => !u(t3) && d(t3));
  }, getSelectorFromElement(t2) {
    const e2 = K(t2);
    return e2 && V.findOne(e2) ? e2 : null;
  }, getElementFromSelector(t2) {
    const e2 = K(t2);
    return e2 ? V.findOne(e2) : null;
  }, getMultipleElementsFromSelector(t2) {
    const e2 = K(t2);
    return e2 ? V.find(e2) : [];
  } }, Q = (t2, e2 = "hide") => {
    const i2 = `click.dismiss${t2.EVENT_KEY}`, s2 = t2.NAME;
    F.on(document, i2, `[data-bs-dismiss="${s2}"]`, function(i3) {
      if (["A", "AREA"].includes(this.tagName) && i3.preventDefault(), u(this)) return;
      const n2 = V.getElementFromSelector(this) || this.closest(`.${s2}`);
      t2.getOrCreateInstance(n2)[e2]();
    });
  }, X = ".bs.alert", Y = `close${X}`, U = `closed${X}`;
  class G extends R {
    static get NAME() {
      return "alert";
    }
    close() {
      if (F.trigger(this._element, Y).defaultPrevented) return;
      this._element.classList.remove("show");
      const t2 = this._element.classList.contains("fade");
      this._queueCallback(() => this._destroyElement(), this._element, t2);
    }
    _destroyElement() {
      this._element.remove(), F.trigger(this._element, U), this.dispose();
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = G.getOrCreateInstance(this);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2) throw new TypeError(`No method named "${t2}"`);
          e2[t2](this);
        }
      });
    }
  }
  Q(G, "close"), v(G);
  const J = '[data-bs-toggle="button"]';
  class Z extends R {
    static get NAME() {
      return "button";
    }
    toggle() {
      this._element.setAttribute("aria-pressed", this._element.classList.toggle("active"));
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = Z.getOrCreateInstance(this);
        "toggle" === t2 && e2[t2]();
      });
    }
  }
  F.on(document, "click.bs.button.data-api", J, (t2) => {
    t2.preventDefault();
    const e2 = t2.target.closest(J);
    Z.getOrCreateInstance(e2).toggle();
  }), v(Z);
  const tt = ".bs.swipe", et = `touchstart${tt}`, it = `touchmove${tt}`, st = `touchend${tt}`, nt = `pointerdown${tt}`, ot = `pointerup${tt}`, rt = { endCallback: null, leftCallback: null, rightCallback: null }, at = { endCallback: "(function|null)", leftCallback: "(function|null)", rightCallback: "(function|null)" };
  class lt extends W {
    constructor(t2, e2) {
      super(), this._element = t2, t2 && lt.isSupported() && (this._config = this._getConfig(e2), this._deltaX = 0, this._supportPointerEvents = Boolean(window.PointerEvent), this._initEvents());
    }
    static get Default() {
      return rt;
    }
    static get DefaultType() {
      return at;
    }
    static get NAME() {
      return "swipe";
    }
    dispose() {
      F.off(this._element, tt);
    }
    _start(t2) {
      this._supportPointerEvents ? this._eventIsPointerPenTouch(t2) && (this._deltaX = t2.clientX) : this._deltaX = t2.touches[0].clientX;
    }
    _end(t2) {
      this._eventIsPointerPenTouch(t2) && (this._deltaX = t2.clientX - this._deltaX), this._handleSwipe(), y(this._config.endCallback);
    }
    _move(t2) {
      this._deltaX = t2.touches && t2.touches.length > 1 ? 0 : t2.touches[0].clientX - this._deltaX;
    }
    _handleSwipe() {
      const t2 = Math.abs(this._deltaX);
      if (t2 <= 40) return;
      const e2 = t2 / this._deltaX;
      this._deltaX = 0, e2 && y(e2 > 0 ? this._config.rightCallback : this._config.leftCallback);
    }
    _initEvents() {
      this._supportPointerEvents ? (F.on(this._element, nt, (t2) => this._start(t2)), F.on(this._element, ot, (t2) => this._end(t2)), this._element.classList.add("pointer-event")) : (F.on(this._element, et, (t2) => this._start(t2)), F.on(this._element, it, (t2) => this._move(t2)), F.on(this._element, st, (t2) => this._end(t2)));
    }
    _eventIsPointerPenTouch(t2) {
      return this._supportPointerEvents && ("pen" === t2.pointerType || "touch" === t2.pointerType);
    }
    static isSupported() {
      return "ontouchstart" in document.documentElement || navigator.maxTouchPoints > 0;
    }
  }
  const ct = ".bs.carousel", ht = ".data-api", dt = "ArrowLeft", ut = "ArrowRight", _t = "next", gt = "prev", ft = "left", mt = "right", pt = `slide${ct}`, bt = `slid${ct}`, vt = `keydown${ct}`, yt = `mouseenter${ct}`, wt = `mouseleave${ct}`, At = `dragstart${ct}`, Et = `load${ct}${ht}`, Ct = `click${ct}${ht}`, Tt = "carousel", kt = "active", $t = ".active", St = ".carousel-item", Lt = $t + St, Ot = { [dt]: mt, [ut]: ft }, It = { interval: 5e3, keyboard: true, pause: "hover", ride: false, touch: true, wrap: true }, Dt = { interval: "(number|boolean)", keyboard: "boolean", pause: "(string|boolean)", ride: "(boolean|string)", touch: "boolean", wrap: "boolean" };
  class Nt extends R {
    constructor(t2, e2) {
      super(t2, e2), this._interval = null, this._activeElement = null, this._isSliding = false, this.touchTimeout = null, this._swipeHelper = null, this._indicatorsElement = V.findOne(".carousel-indicators", this._element), this._addEventListeners(), this._config.ride === Tt && this.cycle();
    }
    static get Default() {
      return It;
    }
    static get DefaultType() {
      return Dt;
    }
    static get NAME() {
      return "carousel";
    }
    next() {
      this._slide(_t);
    }
    nextWhenVisible() {
      !document.hidden && d(this._element) && this.next();
    }
    prev() {
      this._slide(gt);
    }
    pause() {
      this._isSliding && l(this._element), this._clearInterval();
    }
    cycle() {
      this._clearInterval(), this._updateInterval(), this._interval = setInterval(() => this.nextWhenVisible(), this._config.interval);
    }
    _maybeEnableCycle() {
      this._config.ride && (this._isSliding ? F.one(this._element, bt, () => this.cycle()) : this.cycle());
    }
    to(t2) {
      const e2 = this._getItems();
      if (t2 > e2.length - 1 || t2 < 0) return;
      if (this._isSliding) return void F.one(this._element, bt, () => this.to(t2));
      const i2 = this._getItemIndex(this._getActive());
      if (i2 === t2) return;
      const s2 = t2 > i2 ? _t : gt;
      this._slide(s2, e2[t2]);
    }
    dispose() {
      this._swipeHelper && this._swipeHelper.dispose(), super.dispose();
    }
    _configAfterMerge(t2) {
      return t2.defaultInterval = t2.interval, t2;
    }
    _addEventListeners() {
      this._config.keyboard && F.on(this._element, vt, (t2) => this._keydown(t2)), "hover" === this._config.pause && (F.on(this._element, yt, () => this.pause()), F.on(this._element, wt, () => this._maybeEnableCycle())), this._config.touch && lt.isSupported() && this._addTouchEventListeners();
    }
    _addTouchEventListeners() {
      for (const t3 of V.find(".carousel-item img", this._element)) F.on(t3, At, (t4) => t4.preventDefault());
      const t2 = { leftCallback: () => this._slide(this._directionToOrder(ft)), rightCallback: () => this._slide(this._directionToOrder(mt)), endCallback: () => {
        "hover" === this._config.pause && (this.pause(), this.touchTimeout && clearTimeout(this.touchTimeout), this.touchTimeout = setTimeout(() => this._maybeEnableCycle(), 500 + this._config.interval));
      } };
      this._swipeHelper = new lt(this._element, t2);
    }
    _keydown(t2) {
      if (/input|textarea/i.test(t2.target.tagName)) return;
      const e2 = Ot[t2.key];
      e2 && (t2.preventDefault(), this._slide(this._directionToOrder(e2)));
    }
    _getItemIndex(t2) {
      return this._getItems().indexOf(t2);
    }
    _setActiveIndicatorElement(t2) {
      if (!this._indicatorsElement) return;
      const e2 = V.findOne($t, this._indicatorsElement);
      e2.classList.remove(kt), e2.removeAttribute("aria-current");
      const i2 = V.findOne(`[data-bs-slide-to="${t2}"]`, this._indicatorsElement);
      i2 && (i2.classList.add(kt), i2.setAttribute("aria-current", "true"));
    }
    _updateInterval() {
      const t2 = this._activeElement || this._getActive();
      if (!t2) return;
      const e2 = Number.parseInt(t2.getAttribute("data-bs-interval"), 10);
      this._config.interval = e2 || this._config.defaultInterval;
    }
    _slide(t2, e2 = null) {
      if (this._isSliding) return;
      const i2 = this._getActive(), s2 = t2 === _t, n2 = e2 || A(this._getItems(), i2, s2, this._config.wrap);
      if (n2 === i2) return;
      const o2 = this._getItemIndex(n2), r2 = (e3) => F.trigger(this._element, e3, { relatedTarget: n2, direction: this._orderToDirection(t2), from: this._getItemIndex(i2), to: o2 });
      if (r2(pt).defaultPrevented) return;
      if (!i2 || !n2) return;
      const a2 = Boolean(this._interval);
      this.pause(), this._isSliding = true, this._setActiveIndicatorElement(o2), this._activeElement = n2;
      const l2 = s2 ? "carousel-item-start" : "carousel-item-end", c2 = s2 ? "carousel-item-next" : "carousel-item-prev";
      n2.classList.add(c2), f(n2), i2.classList.add(l2), n2.classList.add(l2), this._queueCallback(() => {
        n2.classList.remove(l2, c2), n2.classList.add(kt), i2.classList.remove(kt, c2, l2), this._isSliding = false, r2(bt);
      }, i2, this._isAnimated()), a2 && this.cycle();
    }
    _isAnimated() {
      return this._element.classList.contains("slide");
    }
    _getActive() {
      return V.findOne(Lt, this._element);
    }
    _getItems() {
      return V.find(St, this._element);
    }
    _clearInterval() {
      this._interval && (clearInterval(this._interval), this._interval = null);
    }
    _directionToOrder(t2) {
      return b() ? t2 === ft ? gt : _t : t2 === ft ? _t : gt;
    }
    _orderToDirection(t2) {
      return b() ? t2 === gt ? ft : mt : t2 === gt ? mt : ft;
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = Nt.getOrCreateInstance(this, t2);
        if ("number" != typeof t2) {
          if ("string" == typeof t2) {
            if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2) throw new TypeError(`No method named "${t2}"`);
            e2[t2]();
          }
        } else e2.to(t2);
      });
    }
  }
  F.on(document, Ct, "[data-bs-slide], [data-bs-slide-to]", function(t2) {
    const e2 = V.getElementFromSelector(this);
    if (!e2 || !e2.classList.contains(Tt)) return;
    t2.preventDefault();
    const i2 = Nt.getOrCreateInstance(e2), s2 = this.getAttribute("data-bs-slide-to");
    return s2 ? (i2.to(s2), void i2._maybeEnableCycle()) : "next" === q.getDataAttribute(this, "slide") ? (i2.next(), void i2._maybeEnableCycle()) : (i2.prev(), void i2._maybeEnableCycle());
  }), F.on(window, Et, () => {
    const t2 = V.find('[data-bs-ride="carousel"]');
    for (const e2 of t2) Nt.getOrCreateInstance(e2);
  }), v(Nt);
  const Pt = ".bs.collapse", xt = `show${Pt}`, Mt = `shown${Pt}`, jt = `hide${Pt}`, Ft = `hidden${Pt}`, zt = `click${Pt}.data-api`, Ht = "show", Bt = "collapse", qt = "collapsing", Wt = `:scope .${Bt} .${Bt}`, Rt = '[data-bs-toggle="collapse"]', Kt = { parent: null, toggle: true }, Vt = { parent: "(null|element)", toggle: "boolean" };
  class Qt extends R {
    constructor(t2, e2) {
      super(t2, e2), this._isTransitioning = false, this._triggerArray = [];
      const i2 = V.find(Rt);
      for (const t3 of i2) {
        const e3 = V.getSelectorFromElement(t3), i3 = V.find(e3).filter((t4) => t4 === this._element);
        null !== e3 && i3.length && this._triggerArray.push(t3);
      }
      this._initializeChildren(), this._config.parent || this._addAriaAndCollapsedClass(this._triggerArray, this._isShown()), this._config.toggle && this.toggle();
    }
    static get Default() {
      return Kt;
    }
    static get DefaultType() {
      return Vt;
    }
    static get NAME() {
      return "collapse";
    }
    toggle() {
      this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (this._isTransitioning || this._isShown()) return;
      let t2 = [];
      if (this._config.parent && (t2 = this._getFirstLevelChildren(".collapse.show, .collapse.collapsing").filter((t3) => t3 !== this._element).map((t3) => Qt.getOrCreateInstance(t3, { toggle: false }))), t2.length && t2[0]._isTransitioning) return;
      if (F.trigger(this._element, xt).defaultPrevented) return;
      for (const e3 of t2) e3.hide();
      const e2 = this._getDimension();
      this._element.classList.remove(Bt), this._element.classList.add(qt), this._element.style[e2] = 0, this._addAriaAndCollapsedClass(this._triggerArray, true), this._isTransitioning = true;
      const i2 = `scroll${e2[0].toUpperCase() + e2.slice(1)}`;
      this._queueCallback(() => {
        this._isTransitioning = false, this._element.classList.remove(qt), this._element.classList.add(Bt, Ht), this._element.style[e2] = "", F.trigger(this._element, Mt);
      }, this._element, true), this._element.style[e2] = `${this._element[i2]}px`;
    }
    hide() {
      if (this._isTransitioning || !this._isShown()) return;
      if (F.trigger(this._element, jt).defaultPrevented) return;
      const t2 = this._getDimension();
      this._element.style[t2] = `${this._element.getBoundingClientRect()[t2]}px`, f(this._element), this._element.classList.add(qt), this._element.classList.remove(Bt, Ht);
      for (const t3 of this._triggerArray) {
        const e2 = V.getElementFromSelector(t3);
        e2 && !this._isShown(e2) && this._addAriaAndCollapsedClass([t3], false);
      }
      this._isTransitioning = true, this._element.style[t2] = "", this._queueCallback(() => {
        this._isTransitioning = false, this._element.classList.remove(qt), this._element.classList.add(Bt), F.trigger(this._element, Ft);
      }, this._element, true);
    }
    _isShown(t2 = this._element) {
      return t2.classList.contains(Ht);
    }
    _configAfterMerge(t2) {
      return t2.toggle = Boolean(t2.toggle), t2.parent = h(t2.parent), t2;
    }
    _getDimension() {
      return this._element.classList.contains("collapse-horizontal") ? "width" : "height";
    }
    _initializeChildren() {
      if (!this._config.parent) return;
      const t2 = this._getFirstLevelChildren(Rt);
      for (const e2 of t2) {
        const t3 = V.getElementFromSelector(e2);
        t3 && this._addAriaAndCollapsedClass([e2], this._isShown(t3));
      }
    }
    _getFirstLevelChildren(t2) {
      const e2 = V.find(Wt, this._config.parent);
      return V.find(t2, this._config.parent).filter((t3) => !e2.includes(t3));
    }
    _addAriaAndCollapsedClass(t2, e2) {
      if (t2.length) for (const i2 of t2) i2.classList.toggle("collapsed", !e2), i2.setAttribute("aria-expanded", e2);
    }
    static jQueryInterface(t2) {
      const e2 = {};
      return "string" == typeof t2 && /show|hide/.test(t2) && (e2.toggle = false), this.each(function() {
        const i2 = Qt.getOrCreateInstance(this, e2);
        if ("string" == typeof t2) {
          if (void 0 === i2[t2]) throw new TypeError(`No method named "${t2}"`);
          i2[t2]();
        }
      });
    }
  }
  F.on(document, zt, Rt, function(t2) {
    ("A" === t2.target.tagName || t2.delegateTarget && "A" === t2.delegateTarget.tagName) && t2.preventDefault();
    for (const t3 of V.getMultipleElementsFromSelector(this)) Qt.getOrCreateInstance(t3, { toggle: false }).toggle();
  }), v(Qt);
  const Xt = "dropdown", Yt = ".bs.dropdown", Ut = ".data-api", Gt = "ArrowUp", Jt = "ArrowDown", Zt = `hide${Yt}`, te = `hidden${Yt}`, ee = `show${Yt}`, ie = `shown${Yt}`, se = `click${Yt}${Ut}`, ne = `keydown${Yt}${Ut}`, oe = `keyup${Yt}${Ut}`, re = "show", ae = '[data-bs-toggle="dropdown"]:not(.disabled):not(:disabled)', le = `${ae}.${re}`, ce = ".dropdown-menu", he = b() ? "top-end" : "top-start", de = b() ? "top-start" : "top-end", ue = b() ? "bottom-end" : "bottom-start", _e = b() ? "bottom-start" : "bottom-end", ge = b() ? "left-start" : "right-start", fe = b() ? "right-start" : "left-start", me = { autoClose: true, boundary: "clippingParents", display: "dynamic", offset: [0, 2], popperConfig: null, reference: "toggle" }, pe = { autoClose: "(boolean|string)", boundary: "(string|element)", display: "string", offset: "(array|string|function)", popperConfig: "(null|object|function)", reference: "(string|element|object)" };
  class be extends R {
    constructor(t2, e2) {
      super(t2, e2), this._popper = null, this._parent = this._element.parentNode, this._menu = V.next(this._element, ce)[0] || V.prev(this._element, ce)[0] || V.findOne(ce, this._parent), this._inNavbar = this._detectNavbar();
    }
    static get Default() {
      return me;
    }
    static get DefaultType() {
      return pe;
    }
    static get NAME() {
      return Xt;
    }
    toggle() {
      return this._isShown() ? this.hide() : this.show();
    }
    show() {
      if (u(this._element) || this._isShown()) return;
      const t2 = { relatedTarget: this._element };
      if (!F.trigger(this._element, ee, t2).defaultPrevented) {
        if (this._createPopper(), "ontouchstart" in document.documentElement && !this._parent.closest(".navbar-nav")) for (const t3 of [].concat(...document.body.children)) F.on(t3, "mouseover", g);
        this._element.focus(), this._element.setAttribute("aria-expanded", true), this._menu.classList.add(re), this._element.classList.add(re), F.trigger(this._element, ie, t2);
      }
    }
    hide() {
      if (u(this._element) || !this._isShown()) return;
      const t2 = { relatedTarget: this._element };
      this._completeHide(t2);
    }
    dispose() {
      this._popper && this._popper.destroy(), super.dispose();
    }
    update() {
      this._inNavbar = this._detectNavbar(), this._popper && this._popper.update();
    }
    _completeHide(t2) {
      if (!F.trigger(this._element, Zt, t2).defaultPrevented) {
        if ("ontouchstart" in document.documentElement) for (const t3 of [].concat(...document.body.children)) F.off(t3, "mouseover", g);
        this._popper && this._popper.destroy(), this._menu.classList.remove(re), this._element.classList.remove(re), this._element.setAttribute("aria-expanded", "false"), q.removeDataAttribute(this._menu, "popper"), F.trigger(this._element, te, t2);
      }
    }
    _getConfig(t2) {
      if ("object" == typeof (t2 = super._getConfig(t2)).reference && !c(t2.reference) && "function" != typeof t2.reference.getBoundingClientRect) throw new TypeError(`${Xt.toUpperCase()}: Option "reference" provided type "object" without a required "getBoundingClientRect" method.`);
      return t2;
    }
    _createPopper() {
      if (void 0 === i) throw new TypeError("Bootstrap's dropdowns require Popper (https://popper.js.org/docs/v2/)");
      let t2 = this._element;
      "parent" === this._config.reference ? t2 = this._parent : c(this._config.reference) ? t2 = h(this._config.reference) : "object" == typeof this._config.reference && (t2 = this._config.reference);
      const e2 = this._getPopperConfig();
      this._popper = i.createPopper(t2, this._menu, e2);
    }
    _isShown() {
      return this._menu.classList.contains(re);
    }
    _getPlacement() {
      const t2 = this._parent;
      if (t2.classList.contains("dropend")) return ge;
      if (t2.classList.contains("dropstart")) return fe;
      if (t2.classList.contains("dropup-center")) return "top";
      if (t2.classList.contains("dropdown-center")) return "bottom";
      const e2 = "end" === getComputedStyle(this._menu).getPropertyValue("--bs-position").trim();
      return t2.classList.contains("dropup") ? e2 ? de : he : e2 ? _e : ue;
    }
    _detectNavbar() {
      return null !== this._element.closest(".navbar");
    }
    _getOffset() {
      const { offset: t2 } = this._config;
      return "string" == typeof t2 ? t2.split(",").map((t3) => Number.parseInt(t3, 10)) : "function" == typeof t2 ? (e2) => t2(e2, this._element) : t2;
    }
    _getPopperConfig() {
      const t2 = { placement: this._getPlacement(), modifiers: [{ name: "preventOverflow", options: { boundary: this._config.boundary } }, { name: "offset", options: { offset: this._getOffset() } }] };
      return (this._inNavbar || "static" === this._config.display) && (q.setDataAttribute(this._menu, "popper", "static"), t2.modifiers = [{ name: "applyStyles", enabled: false }]), { ...t2, ...y(this._config.popperConfig, [void 0, t2]) };
    }
    _selectMenuItem({ key: t2, target: e2 }) {
      const i2 = V.find(".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)", this._menu).filter((t3) => d(t3));
      i2.length && A(i2, e2, t2 === Jt, !i2.includes(e2)).focus();
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = be.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2]) throw new TypeError(`No method named "${t2}"`);
          e2[t2]();
        }
      });
    }
    static clearMenus(t2) {
      if (2 === t2.button || "keyup" === t2.type && "Tab" !== t2.key) return;
      const e2 = V.find(le);
      for (const i2 of e2) {
        const e3 = be.getInstance(i2);
        if (!e3 || false === e3._config.autoClose) continue;
        const s2 = t2.composedPath(), n2 = s2.includes(e3._menu);
        if (s2.includes(e3._element) || "inside" === e3._config.autoClose && !n2 || "outside" === e3._config.autoClose && n2) continue;
        if (e3._menu.contains(t2.target) && ("keyup" === t2.type && "Tab" === t2.key || /input|select|option|textarea|form/i.test(t2.target.tagName))) continue;
        const o2 = { relatedTarget: e3._element };
        "click" === t2.type && (o2.clickEvent = t2), e3._completeHide(o2);
      }
    }
    static dataApiKeydownHandler(t2) {
      const e2 = /input|textarea/i.test(t2.target.tagName), i2 = "Escape" === t2.key, s2 = [Gt, Jt].includes(t2.key);
      if (!s2 && !i2) return;
      if (e2 && !i2) return;
      t2.preventDefault();
      const n2 = this.matches(ae) ? this : V.prev(this, ae)[0] || V.next(this, ae)[0] || V.findOne(ae, t2.delegateTarget.parentNode), o2 = be.getOrCreateInstance(n2);
      if (s2) return t2.stopPropagation(), o2.show(), void o2._selectMenuItem(t2);
      o2._isShown() && (t2.stopPropagation(), o2.hide(), n2.focus());
    }
  }
  F.on(document, ne, ae, be.dataApiKeydownHandler), F.on(document, ne, ce, be.dataApiKeydownHandler), F.on(document, se, be.clearMenus), F.on(document, oe, be.clearMenus), F.on(document, se, ae, function(t2) {
    t2.preventDefault(), be.getOrCreateInstance(this).toggle();
  }), v(be);
  const ve = "backdrop", ye = "show", we = `mousedown.bs.${ve}`, Ae = { className: "modal-backdrop", clickCallback: null, isAnimated: false, isVisible: true, rootElement: "body" }, Ee = { className: "string", clickCallback: "(function|null)", isAnimated: "boolean", isVisible: "boolean", rootElement: "(element|string)" };
  class Ce extends W {
    constructor(t2) {
      super(), this._config = this._getConfig(t2), this._isAppended = false, this._element = null;
    }
    static get Default() {
      return Ae;
    }
    static get DefaultType() {
      return Ee;
    }
    static get NAME() {
      return ve;
    }
    show(t2) {
      if (!this._config.isVisible) return void y(t2);
      this._append();
      const e2 = this._getElement();
      this._config.isAnimated && f(e2), e2.classList.add(ye), this._emulateAnimation(() => {
        y(t2);
      });
    }
    hide(t2) {
      this._config.isVisible ? (this._getElement().classList.remove(ye), this._emulateAnimation(() => {
        this.dispose(), y(t2);
      })) : y(t2);
    }
    dispose() {
      this._isAppended && (F.off(this._element, we), this._element.remove(), this._isAppended = false);
    }
    _getElement() {
      if (!this._element) {
        const t2 = document.createElement("div");
        t2.className = this._config.className, this._config.isAnimated && t2.classList.add("fade"), this._element = t2;
      }
      return this._element;
    }
    _configAfterMerge(t2) {
      return t2.rootElement = h(t2.rootElement), t2;
    }
    _append() {
      if (this._isAppended) return;
      const t2 = this._getElement();
      this._config.rootElement.append(t2), F.on(t2, we, () => {
        y(this._config.clickCallback);
      }), this._isAppended = true;
    }
    _emulateAnimation(t2) {
      w(t2, this._getElement(), this._config.isAnimated);
    }
  }
  const Te = ".bs.focustrap", ke = `focusin${Te}`, $e = `keydown.tab${Te}`, Se = "backward", Le = { autofocus: true, trapElement: null }, Oe = { autofocus: "boolean", trapElement: "element" };
  class Ie extends W {
    constructor(t2) {
      super(), this._config = this._getConfig(t2), this._isActive = false, this._lastTabNavDirection = null;
    }
    static get Default() {
      return Le;
    }
    static get DefaultType() {
      return Oe;
    }
    static get NAME() {
      return "focustrap";
    }
    activate() {
      this._isActive || (this._config.autofocus && this._config.trapElement.focus(), F.off(document, Te), F.on(document, ke, (t2) => this._handleFocusin(t2)), F.on(document, $e, (t2) => this._handleKeydown(t2)), this._isActive = true);
    }
    deactivate() {
      this._isActive && (this._isActive = false, F.off(document, Te));
    }
    _handleFocusin(t2) {
      const { trapElement: e2 } = this._config;
      if (t2.target === document || t2.target === e2 || e2.contains(t2.target)) return;
      const i2 = V.focusableChildren(e2);
      0 === i2.length ? e2.focus() : this._lastTabNavDirection === Se ? i2[i2.length - 1].focus() : i2[0].focus();
    }
    _handleKeydown(t2) {
      "Tab" === t2.key && (this._lastTabNavDirection = t2.shiftKey ? Se : "forward");
    }
  }
  const De = ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top", Ne = ".sticky-top", Pe = "padding-right", xe = "margin-right";
  class Me {
    constructor() {
      this._element = document.body;
    }
    getWidth() {
      const t2 = document.documentElement.clientWidth;
      return Math.abs(window.innerWidth - t2);
    }
    hide() {
      const t2 = this.getWidth();
      this._disableOverFlow(), this._setElementAttributes(this._element, Pe, (e2) => e2 + t2), this._setElementAttributes(De, Pe, (e2) => e2 + t2), this._setElementAttributes(Ne, xe, (e2) => e2 - t2);
    }
    reset() {
      this._resetElementAttributes(this._element, "overflow"), this._resetElementAttributes(this._element, Pe), this._resetElementAttributes(De, Pe), this._resetElementAttributes(Ne, xe);
    }
    isOverflowing() {
      return this.getWidth() > 0;
    }
    _disableOverFlow() {
      this._saveInitialAttribute(this._element, "overflow"), this._element.style.overflow = "hidden";
    }
    _setElementAttributes(t2, e2, i2) {
      const s2 = this.getWidth();
      this._applyManipulationCallback(t2, (t3) => {
        if (t3 !== this._element && window.innerWidth > t3.clientWidth + s2) return;
        this._saveInitialAttribute(t3, e2);
        const n2 = window.getComputedStyle(t3).getPropertyValue(e2);
        t3.style.setProperty(e2, `${i2(Number.parseFloat(n2))}px`);
      });
    }
    _saveInitialAttribute(t2, e2) {
      const i2 = t2.style.getPropertyValue(e2);
      i2 && q.setDataAttribute(t2, e2, i2);
    }
    _resetElementAttributes(t2, e2) {
      this._applyManipulationCallback(t2, (t3) => {
        const i2 = q.getDataAttribute(t3, e2);
        null !== i2 ? (q.removeDataAttribute(t3, e2), t3.style.setProperty(e2, i2)) : t3.style.removeProperty(e2);
      });
    }
    _applyManipulationCallback(t2, e2) {
      if (c(t2)) e2(t2);
      else for (const i2 of V.find(t2, this._element)) e2(i2);
    }
  }
  const je = ".bs.modal", Fe = `hide${je}`, ze = `hidePrevented${je}`, He = `hidden${je}`, Be = `show${je}`, qe = `shown${je}`, We = `resize${je}`, Re = `click.dismiss${je}`, Ke = `mousedown.dismiss${je}`, Ve = `keydown.dismiss${je}`, Qe = `click${je}.data-api`, Xe = "modal-open", Ye = "show", Ue = "modal-static", Ge = { backdrop: true, focus: true, keyboard: true }, Je = { backdrop: "(boolean|string)", focus: "boolean", keyboard: "boolean" };
  class Ze extends R {
    constructor(t2, e2) {
      super(t2, e2), this._dialog = V.findOne(".modal-dialog", this._element), this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._isShown = false, this._isTransitioning = false, this._scrollBar = new Me(), this._addEventListeners();
    }
    static get Default() {
      return Ge;
    }
    static get DefaultType() {
      return Je;
    }
    static get NAME() {
      return "modal";
    }
    toggle(t2) {
      return this._isShown ? this.hide() : this.show(t2);
    }
    show(t2) {
      this._isShown || this._isTransitioning || F.trigger(this._element, Be, { relatedTarget: t2 }).defaultPrevented || (this._isShown = true, this._isTransitioning = true, this._scrollBar.hide(), document.body.classList.add(Xe), this._adjustDialog(), this._backdrop.show(() => this._showElement(t2)));
    }
    hide() {
      this._isShown && !this._isTransitioning && (F.trigger(this._element, Fe).defaultPrevented || (this._isShown = false, this._isTransitioning = true, this._focustrap.deactivate(), this._element.classList.remove(Ye), this._queueCallback(() => this._hideModal(), this._element, this._isAnimated())));
    }
    dispose() {
      F.off(window, je), F.off(this._dialog, je), this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
    }
    handleUpdate() {
      this._adjustDialog();
    }
    _initializeBackDrop() {
      return new Ce({ isVisible: Boolean(this._config.backdrop), isAnimated: this._isAnimated() });
    }
    _initializeFocusTrap() {
      return new Ie({ trapElement: this._element });
    }
    _showElement(t2) {
      document.body.contains(this._element) || document.body.append(this._element), this._element.style.display = "block", this._element.removeAttribute("aria-hidden"), this._element.setAttribute("aria-modal", true), this._element.setAttribute("role", "dialog"), this._element.scrollTop = 0;
      const e2 = V.findOne(".modal-body", this._dialog);
      e2 && (e2.scrollTop = 0), f(this._element), this._element.classList.add(Ye), this._queueCallback(() => {
        this._config.focus && this._focustrap.activate(), this._isTransitioning = false, F.trigger(this._element, qe, { relatedTarget: t2 });
      }, this._dialog, this._isAnimated());
    }
    _addEventListeners() {
      F.on(this._element, Ve, (t2) => {
        "Escape" === t2.key && (this._config.keyboard ? this.hide() : this._triggerBackdropTransition());
      }), F.on(window, We, () => {
        this._isShown && !this._isTransitioning && this._adjustDialog();
      }), F.on(this._element, Ke, (t2) => {
        F.one(this._element, Re, (e2) => {
          this._element === t2.target && this._element === e2.target && ("static" !== this._config.backdrop ? this._config.backdrop && this.hide() : this._triggerBackdropTransition());
        });
      });
    }
    _hideModal() {
      this._element.style.display = "none", this._element.setAttribute("aria-hidden", true), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._isTransitioning = false, this._backdrop.hide(() => {
        document.body.classList.remove(Xe), this._resetAdjustments(), this._scrollBar.reset(), F.trigger(this._element, He);
      });
    }
    _isAnimated() {
      return this._element.classList.contains("fade");
    }
    _triggerBackdropTransition() {
      if (F.trigger(this._element, ze).defaultPrevented) return;
      const t2 = this._element.scrollHeight > document.documentElement.clientHeight, e2 = this._element.style.overflowY;
      "hidden" === e2 || this._element.classList.contains(Ue) || (t2 || (this._element.style.overflowY = "hidden"), this._element.classList.add(Ue), this._queueCallback(() => {
        this._element.classList.remove(Ue), this._queueCallback(() => {
          this._element.style.overflowY = e2;
        }, this._dialog);
      }, this._dialog), this._element.focus());
    }
    _adjustDialog() {
      const t2 = this._element.scrollHeight > document.documentElement.clientHeight, e2 = this._scrollBar.getWidth(), i2 = e2 > 0;
      if (i2 && !t2) {
        const t3 = b() ? "paddingLeft" : "paddingRight";
        this._element.style[t3] = `${e2}px`;
      }
      if (!i2 && t2) {
        const t3 = b() ? "paddingRight" : "paddingLeft";
        this._element.style[t3] = `${e2}px`;
      }
    }
    _resetAdjustments() {
      this._element.style.paddingLeft = "", this._element.style.paddingRight = "";
    }
    static jQueryInterface(t2, e2) {
      return this.each(function() {
        const i2 = Ze.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === i2[t2]) throw new TypeError(`No method named "${t2}"`);
          i2[t2](e2);
        }
      });
    }
  }
  F.on(document, Qe, '[data-bs-toggle="modal"]', function(t2) {
    const e2 = V.getElementFromSelector(this);
    ["A", "AREA"].includes(this.tagName) && t2.preventDefault(), F.one(e2, Be, (t3) => {
      t3.defaultPrevented || F.one(e2, He, () => {
        d(this) && this.focus();
      });
    });
    const i2 = V.findOne(".modal.show");
    i2 && Ze.getInstance(i2).hide(), Ze.getOrCreateInstance(e2).toggle(this);
  }), Q(Ze), v(Ze);
  const ti = ".bs.offcanvas", ei = ".data-api", ii = `load${ti}${ei}`, si = "show", ni = "showing", oi = "hiding", ri = ".offcanvas.show", ai = `show${ti}`, li = `shown${ti}`, ci = `hide${ti}`, hi = `hidePrevented${ti}`, di = `hidden${ti}`, ui = `resize${ti}`, _i = `click${ti}${ei}`, gi = `keydown.dismiss${ti}`, fi = { backdrop: true, keyboard: true, scroll: false }, mi = { backdrop: "(boolean|string)", keyboard: "boolean", scroll: "boolean" };
  class pi extends R {
    constructor(t2, e2) {
      super(t2, e2), this._isShown = false, this._backdrop = this._initializeBackDrop(), this._focustrap = this._initializeFocusTrap(), this._addEventListeners();
    }
    static get Default() {
      return fi;
    }
    static get DefaultType() {
      return mi;
    }
    static get NAME() {
      return "offcanvas";
    }
    toggle(t2) {
      return this._isShown ? this.hide() : this.show(t2);
    }
    show(t2) {
      this._isShown || F.trigger(this._element, ai, { relatedTarget: t2 }).defaultPrevented || (this._isShown = true, this._backdrop.show(), this._config.scroll || new Me().hide(), this._element.setAttribute("aria-modal", true), this._element.setAttribute("role", "dialog"), this._element.classList.add(ni), this._queueCallback(() => {
        this._config.scroll && !this._config.backdrop || this._focustrap.activate(), this._element.classList.add(si), this._element.classList.remove(ni), F.trigger(this._element, li, { relatedTarget: t2 });
      }, this._element, true));
    }
    hide() {
      this._isShown && (F.trigger(this._element, ci).defaultPrevented || (this._focustrap.deactivate(), this._element.blur(), this._isShown = false, this._element.classList.add(oi), this._backdrop.hide(), this._queueCallback(() => {
        this._element.classList.remove(si, oi), this._element.removeAttribute("aria-modal"), this._element.removeAttribute("role"), this._config.scroll || new Me().reset(), F.trigger(this._element, di);
      }, this._element, true)));
    }
    dispose() {
      this._backdrop.dispose(), this._focustrap.deactivate(), super.dispose();
    }
    _initializeBackDrop() {
      const t2 = Boolean(this._config.backdrop);
      return new Ce({ className: "offcanvas-backdrop", isVisible: t2, isAnimated: true, rootElement: this._element.parentNode, clickCallback: t2 ? () => {
        "static" !== this._config.backdrop ? this.hide() : F.trigger(this._element, hi);
      } : null });
    }
    _initializeFocusTrap() {
      return new Ie({ trapElement: this._element });
    }
    _addEventListeners() {
      F.on(this._element, gi, (t2) => {
        "Escape" === t2.key && (this._config.keyboard ? this.hide() : F.trigger(this._element, hi));
      });
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = pi.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2) throw new TypeError(`No method named "${t2}"`);
          e2[t2](this);
        }
      });
    }
  }
  F.on(document, _i, '[data-bs-toggle="offcanvas"]', function(t2) {
    const e2 = V.getElementFromSelector(this);
    if (["A", "AREA"].includes(this.tagName) && t2.preventDefault(), u(this)) return;
    F.one(e2, di, () => {
      d(this) && this.focus();
    });
    const i2 = V.findOne(ri);
    i2 && i2 !== e2 && pi.getInstance(i2).hide(), pi.getOrCreateInstance(e2).toggle(this);
  }), F.on(window, ii, () => {
    for (const t2 of V.find(ri)) pi.getOrCreateInstance(t2).show();
  }), F.on(window, ui, () => {
    for (const t2 of V.find("[aria-modal][class*=show][class*=offcanvas-]")) "fixed" !== getComputedStyle(t2).position && pi.getOrCreateInstance(t2).hide();
  }), Q(pi), v(pi);
  const bi = { "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i], a: ["target", "href", "title", "rel"], area: [], b: [], br: [], col: [], code: [], dd: [], div: [], dl: [], dt: [], em: [], hr: [], h1: [], h2: [], h3: [], h4: [], h5: [], h6: [], i: [], img: ["src", "srcset", "alt", "title", "width", "height"], li: [], ol: [], p: [], pre: [], s: [], small: [], span: [], sub: [], sup: [], strong: [], u: [], ul: [] }, vi = /* @__PURE__ */ new Set(["background", "cite", "href", "itemtype", "longdesc", "poster", "src", "xlink:href"]), yi = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:/?#]*(?:[/?#]|$))/i, wi = (t2, e2) => {
    const i2 = t2.nodeName.toLowerCase();
    return e2.includes(i2) ? !vi.has(i2) || Boolean(yi.test(t2.nodeValue)) : e2.filter((t3) => t3 instanceof RegExp).some((t3) => t3.test(i2));
  }, Ai = { allowList: bi, content: {}, extraClass: "", html: false, sanitize: true, sanitizeFn: null, template: "<div></div>" }, Ei = { allowList: "object", content: "object", extraClass: "(string|function)", html: "boolean", sanitize: "boolean", sanitizeFn: "(null|function)", template: "string" }, Ci = { entry: "(string|element|function|null)", selector: "(string|element)" };
  class Ti extends W {
    constructor(t2) {
      super(), this._config = this._getConfig(t2);
    }
    static get Default() {
      return Ai;
    }
    static get DefaultType() {
      return Ei;
    }
    static get NAME() {
      return "TemplateFactory";
    }
    getContent() {
      return Object.values(this._config.content).map((t2) => this._resolvePossibleFunction(t2)).filter(Boolean);
    }
    hasContent() {
      return this.getContent().length > 0;
    }
    changeContent(t2) {
      return this._checkContent(t2), this._config.content = { ...this._config.content, ...t2 }, this;
    }
    toHtml() {
      const t2 = document.createElement("div");
      t2.innerHTML = this._maybeSanitize(this._config.template);
      for (const [e3, i3] of Object.entries(this._config.content)) this._setContent(t2, i3, e3);
      const e2 = t2.children[0], i2 = this._resolvePossibleFunction(this._config.extraClass);
      return i2 && e2.classList.add(...i2.split(" ")), e2;
    }
    _typeCheckConfig(t2) {
      super._typeCheckConfig(t2), this._checkContent(t2.content);
    }
    _checkContent(t2) {
      for (const [e2, i2] of Object.entries(t2)) super._typeCheckConfig({ selector: e2, entry: i2 }, Ci);
    }
    _setContent(t2, e2, i2) {
      const s2 = V.findOne(i2, t2);
      s2 && ((e2 = this._resolvePossibleFunction(e2)) ? c(e2) ? this._putElementInTemplate(h(e2), s2) : this._config.html ? s2.innerHTML = this._maybeSanitize(e2) : s2.textContent = e2 : s2.remove());
    }
    _maybeSanitize(t2) {
      return this._config.sanitize ? (function(t3, e2, i2) {
        if (!t3.length) return t3;
        if (i2 && "function" == typeof i2) return i2(t3);
        const s2 = new window.DOMParser().parseFromString(t3, "text/html"), n2 = [].concat(...s2.body.querySelectorAll("*"));
        for (const t4 of n2) {
          const i3 = t4.nodeName.toLowerCase();
          if (!Object.keys(e2).includes(i3)) {
            t4.remove();
            continue;
          }
          const s3 = [].concat(...t4.attributes), n3 = [].concat(e2["*"] || [], e2[i3] || []);
          for (const e3 of s3) wi(e3, n3) || t4.removeAttribute(e3.nodeName);
        }
        return s2.body.innerHTML;
      })(t2, this._config.allowList, this._config.sanitizeFn) : t2;
    }
    _resolvePossibleFunction(t2) {
      return y(t2, [void 0, this]);
    }
    _putElementInTemplate(t2, e2) {
      if (this._config.html) return e2.innerHTML = "", void e2.append(t2);
      e2.textContent = t2.textContent;
    }
  }
  const ki = /* @__PURE__ */ new Set(["sanitize", "allowList", "sanitizeFn"]), $i = "fade", Si = "show", Li = ".tooltip-inner", Oi = ".modal", Ii = "hide.bs.modal", Di = "hover", Ni = "focus", Pi = "click", xi = { AUTO: "auto", TOP: "top", RIGHT: b() ? "left" : "right", BOTTOM: "bottom", LEFT: b() ? "right" : "left" }, Mi = { allowList: bi, animation: true, boundary: "clippingParents", container: false, customClass: "", delay: 0, fallbackPlacements: ["top", "right", "bottom", "left"], html: false, offset: [0, 6], placement: "top", popperConfig: null, sanitize: true, sanitizeFn: null, selector: false, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', title: "", trigger: "hover focus" }, ji = { allowList: "object", animation: "boolean", boundary: "(string|element)", container: "(string|element|boolean)", customClass: "(string|function)", delay: "(number|object)", fallbackPlacements: "array", html: "boolean", offset: "(array|string|function)", placement: "(string|function)", popperConfig: "(null|object|function)", sanitize: "boolean", sanitizeFn: "(null|function)", selector: "(string|boolean)", template: "string", title: "(string|element|function)", trigger: "string" };
  class Fi extends R {
    constructor(t2, e2) {
      if (void 0 === i) throw new TypeError("Bootstrap's tooltips require Popper (https://popper.js.org/docs/v2/)");
      super(t2, e2), this._isEnabled = true, this._timeout = 0, this._isHovered = null, this._activeTrigger = {}, this._popper = null, this._templateFactory = null, this._newContent = null, this.tip = null, this._setListeners(), this._config.selector || this._fixTitle();
    }
    static get Default() {
      return Mi;
    }
    static get DefaultType() {
      return ji;
    }
    static get NAME() {
      return "tooltip";
    }
    enable() {
      this._isEnabled = true;
    }
    disable() {
      this._isEnabled = false;
    }
    toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    }
    toggle() {
      this._isEnabled && (this._isShown() ? this._leave() : this._enter());
    }
    dispose() {
      clearTimeout(this._timeout), F.off(this._element.closest(Oi), Ii, this._hideModalHandler), this._element.getAttribute("data-bs-original-title") && this._element.setAttribute("title", this._element.getAttribute("data-bs-original-title")), this._disposePopper(), super.dispose();
    }
    show() {
      if ("none" === this._element.style.display) throw new Error("Please use show on visible elements");
      if (!this._isWithContent() || !this._isEnabled) return;
      const t2 = F.trigger(this._element, this.constructor.eventName("show")), e2 = (_(this._element) || this._element.ownerDocument.documentElement).contains(this._element);
      if (t2.defaultPrevented || !e2) return;
      this._disposePopper();
      const i2 = this._getTipElement();
      this._element.setAttribute("aria-describedby", i2.getAttribute("id"));
      const { container: s2 } = this._config;
      if (this._element.ownerDocument.documentElement.contains(this.tip) || (s2.append(i2), F.trigger(this._element, this.constructor.eventName("inserted"))), this._popper = this._createPopper(i2), i2.classList.add(Si), "ontouchstart" in document.documentElement) for (const t3 of [].concat(...document.body.children)) F.on(t3, "mouseover", g);
      this._queueCallback(() => {
        F.trigger(this._element, this.constructor.eventName("shown")), false === this._isHovered && this._leave(), this._isHovered = false;
      }, this.tip, this._isAnimated());
    }
    hide() {
      if (this._isShown() && !F.trigger(this._element, this.constructor.eventName("hide")).defaultPrevented) {
        if (this._getTipElement().classList.remove(Si), "ontouchstart" in document.documentElement) for (const t2 of [].concat(...document.body.children)) F.off(t2, "mouseover", g);
        this._activeTrigger[Pi] = false, this._activeTrigger[Ni] = false, this._activeTrigger[Di] = false, this._isHovered = null, this._queueCallback(() => {
          this._isWithActiveTrigger() || (this._isHovered || this._disposePopper(), this._element.removeAttribute("aria-describedby"), F.trigger(this._element, this.constructor.eventName("hidden")));
        }, this.tip, this._isAnimated());
      }
    }
    update() {
      this._popper && this._popper.update();
    }
    _isWithContent() {
      return Boolean(this._getTitle());
    }
    _getTipElement() {
      return this.tip || (this.tip = this._createTipElement(this._newContent || this._getContentForTemplate())), this.tip;
    }
    _createTipElement(t2) {
      const e2 = this._getTemplateFactory(t2).toHtml();
      if (!e2) return null;
      e2.classList.remove($i, Si), e2.classList.add(`bs-${this.constructor.NAME}-auto`);
      const i2 = ((t3) => {
        do {
          t3 += Math.floor(1e6 * Math.random());
        } while (document.getElementById(t3));
        return t3;
      })(this.constructor.NAME).toString();
      return e2.setAttribute("id", i2), this._isAnimated() && e2.classList.add($i), e2;
    }
    setContent(t2) {
      this._newContent = t2, this._isShown() && (this._disposePopper(), this.show());
    }
    _getTemplateFactory(t2) {
      return this._templateFactory ? this._templateFactory.changeContent(t2) : this._templateFactory = new Ti({ ...this._config, content: t2, extraClass: this._resolvePossibleFunction(this._config.customClass) }), this._templateFactory;
    }
    _getContentForTemplate() {
      return { [Li]: this._getTitle() };
    }
    _getTitle() {
      return this._resolvePossibleFunction(this._config.title) || this._element.getAttribute("data-bs-original-title");
    }
    _initializeOnDelegatedTarget(t2) {
      return this.constructor.getOrCreateInstance(t2.delegateTarget, this._getDelegateConfig());
    }
    _isAnimated() {
      return this._config.animation || this.tip && this.tip.classList.contains($i);
    }
    _isShown() {
      return this.tip && this.tip.classList.contains(Si);
    }
    _createPopper(t2) {
      const e2 = y(this._config.placement, [this, t2, this._element]), s2 = xi[e2.toUpperCase()];
      return i.createPopper(this._element, t2, this._getPopperConfig(s2));
    }
    _getOffset() {
      const { offset: t2 } = this._config;
      return "string" == typeof t2 ? t2.split(",").map((t3) => Number.parseInt(t3, 10)) : "function" == typeof t2 ? (e2) => t2(e2, this._element) : t2;
    }
    _resolvePossibleFunction(t2) {
      return y(t2, [this._element, this._element]);
    }
    _getPopperConfig(t2) {
      const e2 = { placement: t2, modifiers: [{ name: "flip", options: { fallbackPlacements: this._config.fallbackPlacements } }, { name: "offset", options: { offset: this._getOffset() } }, { name: "preventOverflow", options: { boundary: this._config.boundary } }, { name: "arrow", options: { element: `.${this.constructor.NAME}-arrow` } }, { name: "preSetPlacement", enabled: true, phase: "beforeMain", fn: (t3) => {
        this._getTipElement().setAttribute("data-popper-placement", t3.state.placement);
      } }] };
      return { ...e2, ...y(this._config.popperConfig, [void 0, e2]) };
    }
    _setListeners() {
      const t2 = this._config.trigger.split(" ");
      for (const e2 of t2) if ("click" === e2) F.on(this._element, this.constructor.eventName("click"), this._config.selector, (t3) => {
        const e3 = this._initializeOnDelegatedTarget(t3);
        e3._activeTrigger[Pi] = !(e3._isShown() && e3._activeTrigger[Pi]), e3.toggle();
      });
      else if ("manual" !== e2) {
        const t3 = e2 === Di ? this.constructor.eventName("mouseenter") : this.constructor.eventName("focusin"), i2 = e2 === Di ? this.constructor.eventName("mouseleave") : this.constructor.eventName("focusout");
        F.on(this._element, t3, this._config.selector, (t4) => {
          const e3 = this._initializeOnDelegatedTarget(t4);
          e3._activeTrigger["focusin" === t4.type ? Ni : Di] = true, e3._enter();
        }), F.on(this._element, i2, this._config.selector, (t4) => {
          const e3 = this._initializeOnDelegatedTarget(t4);
          e3._activeTrigger["focusout" === t4.type ? Ni : Di] = e3._element.contains(t4.relatedTarget), e3._leave();
        });
      }
      this._hideModalHandler = () => {
        this._element && this.hide();
      }, F.on(this._element.closest(Oi), Ii, this._hideModalHandler);
    }
    _fixTitle() {
      const t2 = this._element.getAttribute("title");
      t2 && (this._element.getAttribute("aria-label") || this._element.textContent.trim() || this._element.setAttribute("aria-label", t2), this._element.setAttribute("data-bs-original-title", t2), this._element.removeAttribute("title"));
    }
    _enter() {
      this._isShown() || this._isHovered ? this._isHovered = true : (this._isHovered = true, this._setTimeout(() => {
        this._isHovered && this.show();
      }, this._config.delay.show));
    }
    _leave() {
      this._isWithActiveTrigger() || (this._isHovered = false, this._setTimeout(() => {
        this._isHovered || this.hide();
      }, this._config.delay.hide));
    }
    _setTimeout(t2, e2) {
      clearTimeout(this._timeout), this._timeout = setTimeout(t2, e2);
    }
    _isWithActiveTrigger() {
      return Object.values(this._activeTrigger).includes(true);
    }
    _getConfig(t2) {
      const e2 = q.getDataAttributes(this._element);
      for (const t3 of Object.keys(e2)) ki.has(t3) && delete e2[t3];
      return t2 = { ...e2, ..."object" == typeof t2 && t2 ? t2 : {} }, t2 = this._mergeConfigObj(t2), t2 = this._configAfterMerge(t2), this._typeCheckConfig(t2), t2;
    }
    _configAfterMerge(t2) {
      return t2.container = false === t2.container ? document.body : h(t2.container), "number" == typeof t2.delay && (t2.delay = { show: t2.delay, hide: t2.delay }), "number" == typeof t2.title && (t2.title = t2.title.toString()), "number" == typeof t2.content && (t2.content = t2.content.toString()), t2;
    }
    _getDelegateConfig() {
      const t2 = {};
      for (const [e2, i2] of Object.entries(this._config)) this.constructor.Default[e2] !== i2 && (t2[e2] = i2);
      return t2.selector = false, t2.trigger = "manual", t2;
    }
    _disposePopper() {
      this._popper && (this._popper.destroy(), this._popper = null), this.tip && (this.tip.remove(), this.tip = null);
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = Fi.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2]) throw new TypeError(`No method named "${t2}"`);
          e2[t2]();
        }
      });
    }
  }
  v(Fi);
  const zi = ".popover-header", Hi = ".popover-body", Bi = { ...Fi.Default, content: "", offset: [0, 8], placement: "right", template: '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>', trigger: "click" }, qi = { ...Fi.DefaultType, content: "(null|string|element|function)" };
  class Wi extends Fi {
    static get Default() {
      return Bi;
    }
    static get DefaultType() {
      return qi;
    }
    static get NAME() {
      return "popover";
    }
    _isWithContent() {
      return this._getTitle() || this._getContent();
    }
    _getContentForTemplate() {
      return { [zi]: this._getTitle(), [Hi]: this._getContent() };
    }
    _getContent() {
      return this._resolvePossibleFunction(this._config.content);
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = Wi.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2]) throw new TypeError(`No method named "${t2}"`);
          e2[t2]();
        }
      });
    }
  }
  v(Wi);
  const Ri = ".bs.scrollspy", Ki = `activate${Ri}`, Vi = `click${Ri}`, Qi = `load${Ri}.data-api`, Xi = "active", Yi = "[href]", Ui = ".nav-link", Gi = `${Ui}, .nav-item > ${Ui}, .list-group-item`, Ji = { offset: null, rootMargin: "0px 0px -25%", smoothScroll: false, target: null, threshold: [0.1, 0.5, 1] }, Zi = { offset: "(number|null)", rootMargin: "string", smoothScroll: "boolean", target: "element", threshold: "array" };
  class ts extends R {
    constructor(t2, e2) {
      super(t2, e2), this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map(), this._rootElement = "visible" === getComputedStyle(this._element).overflowY ? null : this._element, this._activeTarget = null, this._observer = null, this._previousScrollData = { visibleEntryTop: 0, parentScrollTop: 0 }, this.refresh();
    }
    static get Default() {
      return Ji;
    }
    static get DefaultType() {
      return Zi;
    }
    static get NAME() {
      return "scrollspy";
    }
    refresh() {
      this._initializeTargetsAndObservables(), this._maybeEnableSmoothScroll(), this._observer ? this._observer.disconnect() : this._observer = this._getNewObserver();
      for (const t2 of this._observableSections.values()) this._observer.observe(t2);
    }
    dispose() {
      this._observer.disconnect(), super.dispose();
    }
    _configAfterMerge(t2) {
      return t2.target = h(t2.target) || document.body, t2.rootMargin = t2.offset ? `${t2.offset}px 0px -30%` : t2.rootMargin, "string" == typeof t2.threshold && (t2.threshold = t2.threshold.split(",").map((t3) => Number.parseFloat(t3))), t2;
    }
    _maybeEnableSmoothScroll() {
      this._config.smoothScroll && (F.off(this._config.target, Vi), F.on(this._config.target, Vi, Yi, (t2) => {
        const e2 = this._observableSections.get(t2.target.hash);
        if (e2) {
          t2.preventDefault();
          const i2 = this._rootElement || window, s2 = e2.offsetTop - this._element.offsetTop;
          if (i2.scrollTo) return void i2.scrollTo({ top: s2, behavior: "smooth" });
          i2.scrollTop = s2;
        }
      }));
    }
    _getNewObserver() {
      const t2 = { root: this._rootElement, threshold: this._config.threshold, rootMargin: this._config.rootMargin };
      return new IntersectionObserver((t3) => this._observerCallback(t3), t2);
    }
    _observerCallback(t2) {
      const e2 = (t3) => this._targetLinks.get(`#${t3.target.id}`), i2 = (t3) => {
        this._previousScrollData.visibleEntryTop = t3.target.offsetTop, this._process(e2(t3));
      }, s2 = (this._rootElement || document.documentElement).scrollTop, n2 = s2 >= this._previousScrollData.parentScrollTop;
      this._previousScrollData.parentScrollTop = s2;
      for (const o2 of t2) {
        if (!o2.isIntersecting) {
          this._activeTarget = null, this._clearActiveClass(e2(o2));
          continue;
        }
        const t3 = o2.target.offsetTop >= this._previousScrollData.visibleEntryTop;
        if (n2 && t3) {
          if (i2(o2), !s2) return;
        } else n2 || t3 || i2(o2);
      }
    }
    _initializeTargetsAndObservables() {
      this._targetLinks = /* @__PURE__ */ new Map(), this._observableSections = /* @__PURE__ */ new Map();
      const t2 = V.find(Yi, this._config.target);
      for (const e2 of t2) {
        if (!e2.hash || u(e2)) continue;
        const t3 = V.findOne(decodeURI(e2.hash), this._element);
        d(t3) && (this._targetLinks.set(decodeURI(e2.hash), e2), this._observableSections.set(e2.hash, t3));
      }
    }
    _process(t2) {
      this._activeTarget !== t2 && (this._clearActiveClass(this._config.target), this._activeTarget = t2, t2.classList.add(Xi), this._activateParents(t2), F.trigger(this._element, Ki, { relatedTarget: t2 }));
    }
    _activateParents(t2) {
      if (t2.classList.contains("dropdown-item")) V.findOne(".dropdown-toggle", t2.closest(".dropdown")).classList.add(Xi);
      else for (const e2 of V.parents(t2, ".nav, .list-group")) for (const t3 of V.prev(e2, Gi)) t3.classList.add(Xi);
    }
    _clearActiveClass(t2) {
      t2.classList.remove(Xi);
      const e2 = V.find(`${Yi}.${Xi}`, t2);
      for (const t3 of e2) t3.classList.remove(Xi);
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = ts.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2) throw new TypeError(`No method named "${t2}"`);
          e2[t2]();
        }
      });
    }
  }
  F.on(window, Qi, () => {
    for (const t2 of V.find('[data-bs-spy="scroll"]')) ts.getOrCreateInstance(t2);
  }), v(ts);
  const es = ".bs.tab", is = `hide${es}`, ss = `hidden${es}`, ns = `show${es}`, os = `shown${es}`, rs = `click${es}`, as = `keydown${es}`, ls = `load${es}`, cs = "ArrowLeft", hs = "ArrowRight", ds = "ArrowUp", us = "ArrowDown", _s = "Home", gs = "End", fs = "active", ms = "fade", ps = "show", bs = ".dropdown-toggle", vs = `:not(${bs})`, ys = '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]', ws = `.nav-link${vs}, .list-group-item${vs}, [role="tab"]${vs}, ${ys}`, As = `.${fs}[data-bs-toggle="tab"], .${fs}[data-bs-toggle="pill"], .${fs}[data-bs-toggle="list"]`;
  class Es extends R {
    constructor(t2) {
      super(t2), this._parent = this._element.closest('.list-group, .nav, [role="tablist"]'), this._parent && (this._setInitialAttributes(this._parent, this._getChildren()), F.on(this._element, as, (t3) => this._keydown(t3)));
    }
    static get NAME() {
      return "tab";
    }
    show() {
      const t2 = this._element;
      if (this._elemIsActive(t2)) return;
      const e2 = this._getActiveElem(), i2 = e2 ? F.trigger(e2, is, { relatedTarget: t2 }) : null;
      F.trigger(t2, ns, { relatedTarget: e2 }).defaultPrevented || i2 && i2.defaultPrevented || (this._deactivate(e2, t2), this._activate(t2, e2));
    }
    _activate(t2, e2) {
      t2 && (t2.classList.add(fs), this._activate(V.getElementFromSelector(t2)), this._queueCallback(() => {
        "tab" === t2.getAttribute("role") ? (t2.removeAttribute("tabindex"), t2.setAttribute("aria-selected", true), this._toggleDropDown(t2, true), F.trigger(t2, os, { relatedTarget: e2 })) : t2.classList.add(ps);
      }, t2, t2.classList.contains(ms)));
    }
    _deactivate(t2, e2) {
      t2 && (t2.classList.remove(fs), t2.blur(), this._deactivate(V.getElementFromSelector(t2)), this._queueCallback(() => {
        "tab" === t2.getAttribute("role") ? (t2.setAttribute("aria-selected", false), t2.setAttribute("tabindex", "-1"), this._toggleDropDown(t2, false), F.trigger(t2, ss, { relatedTarget: e2 })) : t2.classList.remove(ps);
      }, t2, t2.classList.contains(ms)));
    }
    _keydown(t2) {
      if (![cs, hs, ds, us, _s, gs].includes(t2.key)) return;
      t2.stopPropagation(), t2.preventDefault();
      const e2 = this._getChildren().filter((t3) => !u(t3));
      let i2;
      if ([_s, gs].includes(t2.key)) i2 = e2[t2.key === _s ? 0 : e2.length - 1];
      else {
        const s2 = [hs, us].includes(t2.key);
        i2 = A(e2, t2.target, s2, true);
      }
      i2 && (i2.focus({ preventScroll: true }), Es.getOrCreateInstance(i2).show());
    }
    _getChildren() {
      return V.find(ws, this._parent);
    }
    _getActiveElem() {
      return this._getChildren().find((t2) => this._elemIsActive(t2)) || null;
    }
    _setInitialAttributes(t2, e2) {
      this._setAttributeIfNotExists(t2, "role", "tablist");
      for (const t3 of e2) this._setInitialAttributesOnChild(t3);
    }
    _setInitialAttributesOnChild(t2) {
      t2 = this._getInnerElement(t2);
      const e2 = this._elemIsActive(t2), i2 = this._getOuterElement(t2);
      t2.setAttribute("aria-selected", e2), i2 !== t2 && this._setAttributeIfNotExists(i2, "role", "presentation"), e2 || t2.setAttribute("tabindex", "-1"), this._setAttributeIfNotExists(t2, "role", "tab"), this._setInitialAttributesOnTargetPanel(t2);
    }
    _setInitialAttributesOnTargetPanel(t2) {
      const e2 = V.getElementFromSelector(t2);
      e2 && (this._setAttributeIfNotExists(e2, "role", "tabpanel"), t2.id && this._setAttributeIfNotExists(e2, "aria-labelledby", `${t2.id}`));
    }
    _toggleDropDown(t2, e2) {
      const i2 = this._getOuterElement(t2);
      if (!i2.classList.contains("dropdown")) return;
      const s2 = (t3, s3) => {
        const n2 = V.findOne(t3, i2);
        n2 && n2.classList.toggle(s3, e2);
      };
      s2(bs, fs), s2(".dropdown-menu", ps), i2.setAttribute("aria-expanded", e2);
    }
    _setAttributeIfNotExists(t2, e2, i2) {
      t2.hasAttribute(e2) || t2.setAttribute(e2, i2);
    }
    _elemIsActive(t2) {
      return t2.classList.contains(fs);
    }
    _getInnerElement(t2) {
      return t2.matches(ws) ? t2 : V.findOne(ws, t2);
    }
    _getOuterElement(t2) {
      return t2.closest(".nav-item, .list-group-item") || t2;
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = Es.getOrCreateInstance(this);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2] || t2.startsWith("_") || "constructor" === t2) throw new TypeError(`No method named "${t2}"`);
          e2[t2]();
        }
      });
    }
  }
  F.on(document, rs, ys, function(t2) {
    ["A", "AREA"].includes(this.tagName) && t2.preventDefault(), u(this) || Es.getOrCreateInstance(this).show();
  }), F.on(window, ls, () => {
    for (const t2 of V.find(As)) Es.getOrCreateInstance(t2);
  }), v(Es);
  const Cs = ".bs.toast", Ts = `mouseover${Cs}`, ks = `mouseout${Cs}`, $s = `focusin${Cs}`, Ss = `focusout${Cs}`, Ls = `hide${Cs}`, Os = `hidden${Cs}`, Is = `show${Cs}`, Ds = `shown${Cs}`, Ns = "hide", Ps = "show", xs = "showing", Ms = { animation: "boolean", autohide: "boolean", delay: "number" }, js = { animation: true, autohide: true, delay: 5e3 };
  class Fs extends R {
    constructor(t2, e2) {
      super(t2, e2), this._timeout = null, this._hasMouseInteraction = false, this._hasKeyboardInteraction = false, this._setListeners();
    }
    static get Default() {
      return js;
    }
    static get DefaultType() {
      return Ms;
    }
    static get NAME() {
      return "toast";
    }
    show() {
      F.trigger(this._element, Is).defaultPrevented || (this._clearTimeout(), this._config.animation && this._element.classList.add("fade"), this._element.classList.remove(Ns), f(this._element), this._element.classList.add(Ps, xs), this._queueCallback(() => {
        this._element.classList.remove(xs), F.trigger(this._element, Ds), this._maybeScheduleHide();
      }, this._element, this._config.animation));
    }
    hide() {
      this.isShown() && (F.trigger(this._element, Ls).defaultPrevented || (this._element.classList.add(xs), this._queueCallback(() => {
        this._element.classList.add(Ns), this._element.classList.remove(xs, Ps), F.trigger(this._element, Os);
      }, this._element, this._config.animation)));
    }
    dispose() {
      this._clearTimeout(), this.isShown() && this._element.classList.remove(Ps), super.dispose();
    }
    isShown() {
      return this._element.classList.contains(Ps);
    }
    _maybeScheduleHide() {
      this._config.autohide && (this._hasMouseInteraction || this._hasKeyboardInteraction || (this._timeout = setTimeout(() => {
        this.hide();
      }, this._config.delay)));
    }
    _onInteraction(t2, e2) {
      switch (t2.type) {
        case "mouseover":
        case "mouseout":
          this._hasMouseInteraction = e2;
          break;
        case "focusin":
        case "focusout":
          this._hasKeyboardInteraction = e2;
      }
      if (e2) return void this._clearTimeout();
      const i2 = t2.relatedTarget;
      this._element === i2 || this._element.contains(i2) || this._maybeScheduleHide();
    }
    _setListeners() {
      F.on(this._element, Ts, (t2) => this._onInteraction(t2, true)), F.on(this._element, ks, (t2) => this._onInteraction(t2, false)), F.on(this._element, $s, (t2) => this._onInteraction(t2, true)), F.on(this._element, Ss, (t2) => this._onInteraction(t2, false));
    }
    _clearTimeout() {
      clearTimeout(this._timeout), this._timeout = null;
    }
    static jQueryInterface(t2) {
      return this.each(function() {
        const e2 = Fs.getOrCreateInstance(this, t2);
        if ("string" == typeof t2) {
          if (void 0 === e2[t2]) throw new TypeError(`No method named "${t2}"`);
          e2[t2](this);
        }
      });
    }
  }
  return Q(Fs), v(Fs), { Alert: G, Button: Z, Carousel: Nt, Collapse: Qt, Dropdown: be, Modal: Ze, Offcanvas: pi, Popover: Wi, ScrollSpy: ts, Tab: Es, Toast: Fs, Tooltip: Fi };
});
//# sourceMappingURL=scripts.js.map
