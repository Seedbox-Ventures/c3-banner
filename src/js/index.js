import "../scss/main.scss";

import "vanilla-cookieconsent/src/cookieconsent.js";
import ConfigGenerator from "./ConfigGenerator.js";
import ConsentBanner from "./ConsentBanner.js";
import presets from "./presets.js";

document.addEventListener("DOMContentLoaded", function () {
  // Setup no tracking code
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  window.preventTracking = urlParams.get("notracking") == 1 ? 1 : null;

  if (document.referrer.includes("notracking=1")) {
    var url = new URL(window.location.href);
    url.searchParams.set("notracking", 1);
    window.history.pushState({}, "", url);
    window.preventTracking = 1;
  }

  (function init(config) {
    if (!config) {
      console.error(
        "Could not find configuration for c3 banner (Configurable Cookie Consent)"
      );
      return;
    }

    window.cookieConsent = new ConsentBanner(config);
  })(window.ccc);
});
