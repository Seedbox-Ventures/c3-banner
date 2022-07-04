import "../scss/main.scss";

import "vanilla-cookieconsent/src/cookieconsent.js";
import ConfigGenerator from "./ConfigGenerator.js";
import ConsentBanner from "./ConsentBanner.js";

window.addEventListener("load", function () {
  (function init(config) {
    if (!config) {
      console.error(
        "Could not find condiguration for c3 banner (Configurable Cookie Consent)"
      );
      return;
    }

    new ConsentBanner(config);
  })(window.ccc);
});
