<h1>c3-banner</h1>

<h2 id="section-heading-about">About</h2>

This is a hosted configurable cookie consent. For validation page cases at Seedbox Ventures GmbH. It utilizes
vanilla-cookieconsent https://github.com/orestbida/cookieconsent
developed by Orest Bida https://github.com/orestbida

<h2>Usage & configuration</h2>

This cooke banner works only correctly in conjunction with the Seedbox Ventures Google Tag Manager Setup. Possible
cookie configurations are the following.

<h3>Basic integration</h3>

The latest version of this cookie banner ist hosted at https://c3-banner.validation.page/

You can simply embed it in your page or application by adding the following code to the `<head>`

```
<script>
window.ccc = {
    cookies: {
      ga: "<Google Analytics ID>",
      gtm: "<Google Tag Manager ID>",
      hotjar: "<Hotjar Site ID>",
      linkedin: {
        trackingId: "<LinkedIn Insight Tag>"
        activationCode: function(linkedinInsightTag) {
          /** 
            Place here some code that will be executed
            if the linkedin cookie is accepted
          */ 
        }
      }
    }
};
</script>
<script defer="defer" src="https://c3-banner.validation.page/js/cookieConsent.js"></script>
<link href="https://c3-banner.validation.page/css/cookieConsent.css" rel="stylesheet">
```

### Cookie configuration options

Currently there is only a limited set of cookie configurations available. If you need the integration of further
cookies, please send a message to the
developer [benjamin.groener@seedbox-ventures.com](mailto:benjamin.groener@seedbox-ventures.com)

Here is a list of all currently possible cookie options

```
<script>
window.ccc = {
    cookies: {
      ga: "<Google Analytics Mess ID>",
      gtm: "<Google Tag Manager ID>",
      hotjar: "<Hotjar Site ID>",
      linkedin: "<LinkedIn Insight Tag>",
      ma: "<Microsoft Advertising UET-Tag>",
      meta: "<Meta Pixel>",
      stripe: true, //Any truethy value is possible, no ID needed.
      tiktok: "<TikTok Pixel ID>"
    }
};
</script>
```

### Presets
This cookie banner provides three presets called default, vh & ca

| Name | Description |
| default | This is the basic preset with default activation codes when tracking ids are provided |
| vh | The vh preset provides some basic configurations for the seedbox validation hub. It presets the google tag manager id of the validation hub and some special activation codes that are mandatory for the validation hub. |
| ca | The ca preset provides some basic configurations for a cookie banner setup that is specialized for California and the US. All cookies are enabled by default. The cookie banner is an information-only banner in this case. |

<h3>Styling options</h3>

This cookie banner is implemented on basis of the vanilla-cookieconsent. (See in
the [About Section](#section-heading-about))
Therefore it is customizable with the same css variables as the vanilla-cookieconsent.

Here is an overview of all possible css variables with example values.

```
:root {
  --cc-bg: #fff;
  --cc-text: #1b1b1b;
  --cc-btn-primary-bg: #3cd47a;
  --cc-btn-primary-text: var(--cc-bg);
  --cc-btn-primary-hover-bg: #43ab6d;
  --cc-btn-secondary-bg: #eaeff2;
  --cc-btn-secondary-text: var(--cc-text);
  --cc-btn-secondary-hover-bg: #d8e0e6;
  --cc-toggle-bg-off: #919ea6;
  --cc-toggle-bg-on: var(--cc-btn-primary-bg);
  --cc-toggle-bg-readonly: #d5dee2;
  --cc-toggle-knob-bg: #fff;
  --cc-toggle-knob-icon-color: #ecf2fa;
  --cc-block-text: var(--cc-text);
  --cc-cookie-category-block-bg: #f0f4f7;
  --cc-cookie-category-block-bg-hover: #e9eff4;
  --cc-section-border: #f1f3f5;
  --cc-cookie-table-border: #e9edf2;
  --cc-overlay-bg: rgba(4, 6, 8, 0.85);
  --cc-webkit-scrollbar-bg: #cfd5db;
  --cc-webkit-scrollbar-bg-hover: #9199a0;
}
```

<h3>No tracking option</h3>
The c3-banner comes with a no tracking option that helps to prevent unwanted tracking of test users or internal users.
Simply add a notracking=1 query paramter to your URL.

E.g. => [https://seedbox-ventures.com?notracking=1](https://seedbox-ventures.com?notracking=1)

