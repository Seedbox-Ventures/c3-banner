import vanillaConsent from "vanilla-cookieconsent";
import cookiesConfig, {
  SECTION_TYPE_ESSENTIAL,
  SECTION_TYPE_ANALYTICS,
  SECTION_TYPE_MARKETING,
} from "./cookies.js";
import presets from "./presets.js";
import ConfigGenerator from "./ConfigGenerator.js";

export default class ConsentBanner {
  config;
  configGenerator;
  preset;
  vanillaConfig;
  vanillaConsent;

  constructor(config) {
    this.config = { ...config };
    this.preset = { ...presets.getPreset(config.preset) };

    this.config = this._applyPresetToConfig(this.config, this.preset);

    this.configGenerator = ConfigGenerator.instance();
    this.vanillaConfig = this.configGenerator.generateConfig(config);
    this.vanillaConsent = window.initCookieConsent();
    this.vanillaConsent.run(this.vanillaConfig);

    this.setupCookieScripts();
  }

  _applyPresetToConfig(baseConfig = {}, preset = {}) {
    const config = { ...baseConfig };

    const { cookies = {} } = config;
    Object.keys(preset).forEach((cookieName) => {
      const { [cookieName]: cookieConfig } = cookies;
      const { [cookieName]: cookiePreset } = preset;

      let trackingId =
        (typeof cookieConfig === "object"
          ? cookieConfig.trackingId
          : cookieConfig) ??
        (typeof cookiePreset === "object"
          ? cookiePreset.trackingId
          : cookiePreset);
      let activationCode =
        (typeof cookieConfig === "object"
          ? cookieConfig.activationCode
          : void 0) ??
        (typeof cookiePreset === "object"
          ? cookiePreset.activationCode
          : void 0);

      if (trackingId) {
        config.cookies[cookieName] = {
          trackingId,
          activationCode,
        };
      }
    });

    return config;
  }

  setupCookieScripts() {
    const { accepted_categories: categories } =
      this.vanillaConsent.getUserPreferences();
    const { cookies = {}, preset: presetName = "default" } = this.config;
    const cookiePreset = presets.getPreset(presetName);

    Object.keys(this.config.cookies).forEach((cookieName) => {
      const { type } = cookiesConfig[cookieName];
      const accepted = categories.includes(type) || presetName === 'ca'; //Allow all scripts for the US and California
      const cookieData = this.config.cookies[cookieName];
      let activationCode;
      let trackingId;

      switch (typeof cookieData) {
        case "string":
          trackingId = cookieData;
          break;
        case "object":
          trackingId = cookieData.trackingId ?? void 0;
          activationCode = cookieData.activationCode ?? void 0;
          break;
      }

      if (
        typeof activationCode === "function" ||
        (typeof activationCode === "string" && activationCode.length)
      ) {
        this.setupCookieScript(type, activationCode, trackingId, accepted);
      }
    });
  }

  setupCookieScript(sectionName, code, trackingId, accepted) {
    const scriptEl = document.createElement("script");
    scriptEl.setAttribute(
      "type",
      accepted ? "application/javascript" : "text/plain"
    );
    scriptEl.setAttribute("data-cookiecategory", sectionName);
    const script = `(${code.toString()})("${trackingId}")`;

    scriptEl.innerHTML = script;
    document.body.appendChild(scriptEl);
  }
}
