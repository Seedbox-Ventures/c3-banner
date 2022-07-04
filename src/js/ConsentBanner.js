import cookies, {
  SECTION_TYPE_ESSENTIAL,
  SECTION_TYPE_ANALYTICS,
  SECTION_TYPE_MARKETING,
} from "./cookies";
import vanillaConsent from "vanilla-cookieconsent";
import ConfigGenerator from "./ConfigGenerator";

export default class ConsentBanner {
  config;
  configGenerator;
  vanillaConfig;
  vanillaConsent;

  constructor(config) {
    this.config = config;

    this.configGenerator = ConfigGenerator.instance();
    this.vanillaConfig = this.configGenerator.generateConfig(config);
    this.vanillaConsent = window.initCookieConsent();
    this.vanillaConsent.run(this.vanillaConfig);

    this.setupCookieScripts();
  }

  setupCookieScripts() {
    const { accepted_categories: categories } =
      this.vanillaConsent.getUserPreferences();

    Object.keys(this.config.cookies).forEach((cookieName) => {
      const { type, activationCode } = cookies[cookieName];
      const accepted = categories.includes(type);
      const cookieData = this.config.cookies[cookieName];
      if (typeof activationCode === "function") {
        this.setupCookieScript(type, activationCode(cookieData), accepted);
      }
    });
  }

  setupCookieScript(sectionName, code, accepted) {
    const scriptEl = document.createElement("script");
    scriptEl.setAttribute(
      "type",
      accepted ? "application/javascript" : "text/plain"
    );
    scriptEl.setAttribute("data-cookiecategory", sectionName);
    scriptEl.innerHTML = `(${code})()`;
    document.body.append(scriptEl);
  }
}
