const defaultPreset = {
  ga: {
    activationCode: function (ga4MessId) {
      if (window.doNotTrack !== 1) {
        const js = document.createElement("script");

        js.type = "text/javascript";
        js.async = true;
        js.src = "https://www.googletagmanager.com/gtag/js?id=G-E35R1TDQ1C";

        js.onload = function () {
          //Code using this script here
        };

        document.body.appendChild(js);

        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());

        gtag("config", ga4MessId);
      }
    },
  },
  gtm: {
    activationCode: function (gtmID) {
      if (window.doNotTrack !== 1) {
        // Define dataLayer and the gtag function.
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        (function (w, d, s, l, i) {
          w[l] = w[l] || [];
          w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
          var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s),
            dl = l != "dataLayer" ? "&l=" + l : "";
          j.async = true;
          j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
          f.parentNode.insertBefore(j, f);
        })(window, document, "script", "dataLayer", gtmID);
      }
    },
  },
  hotjar: {
    activationCode: function (hjSiteId) {
      if (window.doNotTrack !== 1) {
        (function (h, o, t, j, a, r) {
          h.hj =
            h.hj ||
            function () {
              (h.hj.q = h.hj.q || []).push(arguments);
            };
          h._hjSettings = { hjid: hjSiteId, hjsv: 6 };
          a = o.getElementsByTagName("head")[0];
          r = o.createElement("script");
          r.async = 1;
          r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
          a.appendChild(r);
        })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");
      }
    },
  },
  linkedin: {
    activationCode: (insightTagId) => {
      if (window.doNotTrack !== 1) {
        _linkedin_partner_id = "${insightTagId}";
        window._linkedin_data_partner_ids =
          window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(_linkedin_partner_id);

        (function (l) {
          if (!l) {
            window.lintrk = function (a, b) {
              window.lintrk.q.push([a, b]);
            };
            window.lintrk.q = [];
          }
          var s = document.getElementsByTagName("script")[0];
          var b = document.createElement("script");
          b.type = "text/javascript";
          b.async = true;
          b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
          s.parentNode.insertBefore(b, s);
        })(window.lintrk);
      }
    },
  },
  ma: {
    activationCode: function (uetTag) {
      if (window.doNotTrack !== 1) {
        (function (w, d, t, r, u) {
          var f, n, i;
          (w[u] = w[u] || []),
            (f = function () {
              var o = { ti: uetTag };
              (o.q = w[u]), (w[u] = new UET(o)), w[u].push("pageLoad");
            }),
            (n = d.createElement(t)),
            (n.src = r),
            (n.async = 1),
            (n.onload = n.onreadystatechange =
              function () {
                var s = this.readyState;
                (s && s !== "loaded" && s !== "complete") ||
                  (f(), (n.onload = n.onreadystatechange = null));
              }),
            (i = d.getElementsByTagName(t)[0]),
            i.parentNode.insertBefore(n, i);
        })(window, document, "script", "//bat.bing.com/bat.js", "uetq");
      }
    },
  },
  meta: {
    activationCode: function (metaPixelId) {
      if (window.doNotTrack !== 1) {
        !(function (f, b, e, v, n, t, s) {
          if (f.fbq) return;
          n = f.fbq = function () {
            n.callMethod
              ? n.callMethod.apply(n, arguments)
              : n.queue.push(arguments);
          };
          if (!f._fbq) f._fbq = n;
          n.push = n;
          n.loaded = !0;
          n.version = "2.0";
          n.queue = [];
          t = b.createElement(e);
          t.async = !0;
          t.src = v;
          s = b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t, s);
        })(
          window,
          document,
          "script",
          "https://connect.facebook.net/en_US/fbevents.js"
        );
        fbq("init", metaPixelId);
        fbq("track", "PageView");
      }
    },
  },
  tiktok: {
    activationCode: function (tiktokPixel) {
      if (window.doNotTrack !== 1) {
        !(function (w, d, t) {
          w.TiktokAnalyticsObject = t;
          var ttq = (w[t] = w[t] || []);
          (ttq.methods = [
            "page",
            "track",
            "identify",
            "instances",
            "debug",
            "on",
            "off",
            "once",
            "ready",
            "alias",
            "group",
            "enableCookie",
            "disableCookie",
          ]),
            (ttq.setAndDefer = function (t, e) {
              t[e] = function () {
                t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
              };
            });
          for (var i = 0; i < ttq.methods.length; i++)
            ttq.setAndDefer(ttq, ttq.methods[i]);
          (ttq.instance = function (t) {
            for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++)
              ttq.setAndDefer(e, ttq.methods[n]);
            return e;
          }),
            (ttq.load = function (e, n) {
              var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
              (ttq._i = ttq._i || {}),
                (ttq._i[e] = []),
                (ttq._i[e]._u = i),
                (ttq._t = ttq._t || {}),
                (ttq._t[e] = +new Date()),
                (ttq._o = ttq._o || {}),
                (ttq._o[e] = n || {});
              var o = document.createElement("script");
              (o.type = "text/javascript"),
                (o.async = !0),
                (o.src = i + "?sdkid=" + e + "&lib=" + t);
              var a = document.getElementsByTagName("script")[0];
              a.parentNode.insertBefore(o, a);
            });
          ttq.load(tiktokPixel);
          ttq.page();
        })(window, document, "ttq");
      }
    },
  },
};

// ssp stands for seedbox super preset
const ssp = {
  ga: {
    activationCode: function (ga4MessId) {
      if (window.doNotTrack !== 1) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "init-ga4",
          "ga4-messid": ga4MessId,
        });
      }
    },
  },
  gtm: "GTM-P4MZ2HV",
  hotjar: {
    activationCode: function (hjSiteId) {
      if (window.doNotTrack !== 1) {
        (function (h, o, t, j, a, r) {
          h.hj =
            h.hj ||
            function () {
              (h.hj.q = h.hj.q || []).push(arguments);
            };
          h._hjSettings = { hjid: hjSiteId, hjsv: 6 };
          a = o.getElementsByTagName("head")[0];
          r = o.createElement("script");
          r.async = 1;
          r.src = t + h._hjSettings.hjid + j + h._hjSettings.hjsv;
          a.appendChild(r);
        })(window, document, "https://static.hotjar.com/c/hotjar-", ".js?sv=");

        const urlParams = new URLSearchParams(window.location.search);
        const keyword = urlParams.get("kwd");

        if (typeof keyword === "string" && keyword.length) {
          hj("event", keyword);
        }
      }
    },
  },
};

export const presetMap = {
  default: defaultPreset,
  ssp,
};

const presets = {
  getPreset: (presetName) => {
    const defaultPreset = presetMap.default;
    if (!presetName) {
      return defaultPreset;
    }

    if (typeof presetMap[presetName] !== "object") {
      throw `${presetName} is not a known name of a c3-banner preset.`;
    }

    let preset = { ...presetMap[presetName] };
    let result = {};

    Object.keys(defaultPreset).forEach((cookieName) => {
      const { [cookieName]: defaultConfig } = defaultPreset;
      const { [cookieName]: presetConfig } = preset;

      let trackingId =
        (typeof presetConfig === "object"
          ? presetConfig.trackingId
          : presetConfig) ??
        (typeof defaultConfig === "object"
          ? defaultConfig.trackingId
          : defaultConfig);
      let activationCode =
        (typeof presetConfig === "object"
          ? presetConfig.activationCode
          : void 0) ??
        (typeof defaultConfig === "object"
          ? defaultConfig.activationCode
          : void 0);

      result[cookieName] = {
        trackingId,
        activationCode,
      };
    });
    return result;
  },
};

export default presets;
