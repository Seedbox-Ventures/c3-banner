export const SECTION_TYPE_ESSENTIAL = "essential";
export const SECTION_TYPE_ANALYTICS = "analytics";
export const SECTION_TYPE_MARKETING = "marketing";

export default {
  cc: {
    name: "Cookie Consent",
    cookies: "cc_cookie",
    period: "6 Monate",
    info: "Cookie das die Cookieeinstellungen des Benutzers speichert.",
    activationCode: undefined,
    type: SECTION_TYPE_ESSENTIAL,
  },
  meta: {
    name: "Meta",
    cookies: "_fbp,act,c_user,datr,fr,m_pixel_ration,pl,presence,sb,spin,wd,xs",
    period: "Session / 1 Jahr",
    info: "Cookie von Meta, das für Website-Analysen, Ad-Targeting und Anzeigenmessung verwendet wird.",
    activationCode: (metaPixelId) => {
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
    type: SECTION_TYPE_MARKETING,
  },
  ga: {
    name: "Google Analytics",
    cookies: "_ga,_gat,_gid",
    period: "2 Jahre",
    info: "Cookie von Google für Website-Analysen. Erzeugt statistische Daten darüber, wie der Besucher die Website nutzt.",
    activationCode: (ga4MessId) => {
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
    type: SECTION_TYPE_ANALYTICS,
  },
  gtm: {
    name: "Google Tag Manager",
    cookies: "_ga,_gat,_gid",
    period: "2 Jahre",
    info: "Cookie von Google zur Steuerung der erweiterten Script- und Ereignisbehandlung.",
    activationCode: (gtmID) => {
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
    type: SECTION_TYPE_ANALYTICS,
  },
  hotjar: {
    name: "Hotjar",
    cookies:
      "_hjClosedSurveyInvites, _hjDonePolls, _hjMinimizedPolls, _hjDoneTestersWidgets, _hjIncludedInSample, _hjShownFeedbackMessage, _hjid, _hjRecordingLastActivity, hjTLDTest, _hjUserAttributesHash, _hjCachedUserAttributes, _hjLocalStorageTest, _hjptid",
    period: "Session / 1 Jahr",
    info: "Hotjar ist ein Analysewerkzeug für das Benutzerverhalten von Hotjar Ltd. Wir verwenden Hotjar, um zu verstehen, wie Benutzer mit unserer Website interagieren.",
    activationCode: (hjSiteId) => {
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
    type: SECTION_TYPE_ANALYTICS,
  },
  linkedin: {
    name: "LinkedIn",
    cookies: "li_gc",
    period: "Session / 1 Jahr",
    info: "Cookie von LinkedIn, das für Website-Analysen, Ad-Targeting und Anzeigenmessung verwendet wird.",
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
    type: SECTION_TYPE_MARKETING,
  },
  ma: {
    name: "Microsoft Advertising",
    cookies: "MUID",
    period: "1 Jahr",
    info: "Cookies von Microsoft Advertising um den Erfolg von Werbemaßnahmen nachzuvollziehen.",
    activationCode: (uetTag) => {
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
    type: SECTION_TYPE_MARKETING,
  },
  stripe: {
    name: "Stripe",
    cookies:
      "site_sid, site-auth, double_cmd_f_uses, lang, stripe.csrf, has_intentionally_selected_curl, scfc, merchant, __stripe_orig_props, private_machine_identifier, _gcl_au, user, __stripe_mid, color-scheme, cookie-perms, recent-views, cid",
    period: "Session / 6 Monate",
    info: "Notwendige Cookies, für Bezahlvorgänge über unseren Zahlungsanbieter Stripe.",
    activationCode: undefined,
    type: SECTION_TYPE_ESSENTIAL,
  },
  tiktok: {
    name: "TikTok",
    cookies:
      "_abck, _ga, _ga_HV1FL86553, _ttp, cmpl_token, cookie-consent, from_way, msToken, odin_tt, passport_auth_status, passport_auth_status_ss, passport_auth_status_ss_ads, passport_csrf_token, passport_csrf_token_default, s_v_web_id, sessionid, sessionid_ads, sessionid_ss, sessionid_ss_ads, sid_guard, sid_guard_ads, sid_tt, sid_tt_ads, sid_ucp_v1, ssid_ucp_sso_v1_ads, ssid_ucp_v1, ssid_ucp_v1_ads, sso_auth_status_ss_ads, sso_uid_tt_ss_ads, store-country-code, store-idc, toutiao_sso_user_ss_ads, tt-target-idc, tt_csrf_token, tt_webid, tta_attr_ga_cid, tta_attr_id, tta_attr_id_mirror, ttwid, uid_tt, uid_tt_ads, uid_tt_ss, uid_tt_ss_",
    period: "Session / 2 Jahre",
    info: "TikTok ist ein Social Media Portal für das Streaming kurzers Videoinhalte.",
    activationCode: (tiktokPixel) => {
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
    type: SECTION_TYPE_MARKETING,
  },
};
