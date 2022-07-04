import vanillaConsent from "vanilla-cookieconsent";

export default class ConsentBanner {
  config;
  vanillaConsent;

  constructor(config) {
    this.config = config;

    this.vanillaConsent = window.cookieConsent = window.initCookieConsent();
    window.cookieConsent.run(this.config);



    //     this.setupCookieScripts();
  }

  //   setupCookieScripts() {
  //     const { accepted_categories = [] } = cookieConsent.getUserPreferences();
  //
  //     Object.keys(sections).forEach((sectionName) => {
  //       const accepted = accepted_categories.includes(sectionName);
  //       const { cookies } = sections[sectionName];
  //
  //       cookies.forEach(({ code }) => {
  //         if (typeof code === "string" && code.length) {
  //           this.setupCookieScript(sectionName, code, accepted);
  //         }
  //       });s
  //     });
  //   }

  //   setupCookieScript(sectionName, code, accepted) {
  //     const scriptEl = document.createElement("script");
  //     scriptEl.setAttribute(
  //       "type",
  //       accepted ? "application/javascript" : "text/plain"
  //     );
  //     scriptEl.setAttribute("data-cookiecategory", sectionName);
  //     scriptEl.innerHTML = code;
  //     document.body.append(scriptEl);
  //   }
}
