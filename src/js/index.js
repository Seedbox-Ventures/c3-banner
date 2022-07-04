import "../scss/main.scss";

import "vanilla-cookieconsent/src/cookieconsent.js";
import ConfigGenerator from "./ConfigGenerator.js";
import ConsentBanner from "./ConsentBanner.js";

window.addEventListener("load", function () {
  (function init(baseConfig) {
    if (!baseConfig) {
      console.error(
        "Could not find condiguration for c3 banner (Configurable Cookie Consent)"
      );
      return;
    }

    const cookieConfig = ConfigGenerator.instance().generateConfig(baseConfig);

    new ConsentBanner(cookieConfig);
  })(window.ccc);
});
