import SuperTrackingManager from "./SuperTrackingManager";

const defaultPreset = {
  ga: {
    activationCode: SuperTrackingManager.ga4DefaultCode,
  },
  gtm: {
    activationCode: SuperTrackingManager.gtmDefaultCode,
  },
  hotjar: {
    activationCode: SuperTrackingManager.hotjarDefaultCode,
  },
  linkedin: {
    activationCode: SuperTrackingManager.linkedinDefaultCode,
  },
  ma: {
    activationCode: SuperTrackingManager.maDefaultCode,
  },
  meta: {
    activationCode: SuperTrackingManager.metaDefaultCode,
  },
  tiktok: {
    activationCode: SuperTrackingManager.tiktokDefaultCode,
  },
};

// ssp stands for seedbox super preset
const vh = {
  ga: {
    activationCode: function (ga4MessId) {
      if (window.doNotTrack === 1) return;

      SuperTrackingManager.ga4DefaultCode(ga4MessId);
      new SuperTrackingManager(window.gtag);
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
  vh,
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
