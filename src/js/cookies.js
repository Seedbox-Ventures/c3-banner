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
  facebook: {
    name: "Facebook",
    cookies: "_fbp,act,c_user,datr,fr,m_pixel_ration,pl,presence,sb,spin,wd,xs",
    period: "Session / 1 Jahr",
    info: "Cookie von Facebook, das für Website-Analysen, Ad-Targeting und Anzeigenmessung verwendet wird.",
    activationCode: (fbPixelId) => () => {
      if (window.doNotTrack !== 1) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "init-fb",
          "fb-pixelid": fbPixelId,
        });
      }
    },
    type: SECTION_TYPE_MARKETING,
  },
  ga: {
    name: "Google Analytics",
    cookies: "_ga,_gat,_gid",
    period: "2 Jahre",
    info: "Cookie von Google für Website-Analysen. Erzeugt statistische Daten darüber, wie der Besucher die Website nutzt.",
    activationCode: (ga4MessId) => `() => {
      const ga4MessId = "${ga4MessId}";
      if (window.doNotTrack !== 1) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "init-ga4",
          "ga4-messid": ga4MessId,
        });
      }
    }`,
    type: SECTION_TYPE_ANALYTICS,
  },
  gtm: {
    name: "Google Tag Manager",
    cookies: "_ga,_gat,_gid",
    period: "2 Jahre",
    info: "Cookie von Google zur Steuerung der erweiterten Script- und Ereignisbehandlung.",
    activationCode: (gtmID) => `() => {
      const gtmID = "${gtmID}";
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
    }`,
    type: SECTION_TYPE_ANALYTICS,
  },
  hotjar: {
    name: "Hotjar",
    cookies:
      "_hjClosedSurveyInvites, _hjDonePolls, _hjMinimizedPolls, _hjDoneTestersWidgets, _hjIncludedInSample, _hjShownFeedbackMessage, _hjid, _hjRecordingLastActivity, hjTLDTest, _hjUserAttributesHash, _hjCachedUserAttributes, _hjLocalStorageTest, _hjptid",
    period: "Sitzung / 1 Jahr",
    info: "Hotjar ist ein Analysewerkzeug für das Benutzerverhalten von Hotjar Ltd. Wir verwenden Hotjar, um zu verstehen, wie Benutzer mit unserer Website interagieren.",
    activationCode: (hjSiteId) => `() => {
      const hjSiteId = "${hjSiteId}";
      if (window.doNotTrack !== 1) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "init-hotjar",
          "hj-siteid": hjSiteId,
        });
      }
    }`,
    type: SECTION_TYPE_ANALYTICS,
  },
  linkedin: {
    name: "LinkedIn",
    cookies: "li_gc",
    period: "Sitzung / 1 Jahr",
    info: "Cookie von LinkedIn, das für Website-Analysen, Ad-Targeting und Anzeigenmessung verwendet wird.",
    activationCode: (insightTagId) => `() => {
      const insightTagId = "${insightTagId}";
      if (window.doNotTrack !== 1) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "init-linkedin",
          "linkedin-insight-tag-id": insightTagId,
        });
      }
    }`,
    type: SECTION_TYPE_MARKETING,
  },
  ma: {
    name: "Microsoft Advertising",
    cookies: "MUID",
    period: "1 Jahr",
    info: "Cookies von Microsoft Advertising um den Erfolg von Werbemaßnahmen nachzuvollziehen.",
    activationCode: (uetTag) => `() => {
        const uetTag = "${uetTag}";
        if (window.doNotTrack !== 1) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "init-microsoft-advertising",
            "uet-tag": uetTag,
          });
        }
      }`,
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
        "",
      period: "Sitzung / 1 Jahr",
      info: "TikTok ist ein Social Media Portal für das Streaming kurzers Videoinhalte.",
      activationCode: (tiktokPixel) => `() => {
        const tiktokPixel = "${tiktokPixel}";
        if (window.doNotTrack !== 1) {
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            event: "init-tiktok",
            "tiktok-pixel": tiktokPixel,
          });
        }
      }`,
      type: SECTION_TYPE_MARKETING,
    },
};
