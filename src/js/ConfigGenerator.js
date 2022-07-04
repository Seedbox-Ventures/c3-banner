import _ from "lodash";

export const SECTION_TYPE_ESSENTIAL = "essential";
export const SECTION_TYPE_ANALYTICS = "analytics";
export const SECTION_TYPE_MARKETING = "marketing";

export default class ConfigGenerator {
  static sharedInstance;

  static instance() {
    if (!ConfigGenerator.sharedInstance) {
      ConfigGenerator.sharedInstance = new ConfigGenerator();
    }
    return ConfigGenerator.sharedInstance;
  }

  generateConfig({
    title = defaults.title,
    description = defaults.description,
    primaryBtn = defaults.primaryBtn,
    secondaryBtn = defaults.secondaryBtn,
    cookies = {},
  }) {
    const modalSettings = this.generateModalSettings({
      title,
      description,
      cookies: { ...cookies, ...defaults.cookies },
    });

    return {
      current_lang: "de",
      autorun: true,
      force_consent: true,
      autoclear_cookies: true, // default: false
      page_scripts: true, // default: false
      languages: {
        de: {
          consent_modal: {
            title,
            description,
            primary_btn: primaryBtn,
            secondary_btn: secondaryBtn,
          },
          settings_modal: modalSettings,
        },
      },
    };
  }

  generateModalSettings({ title, description, cookies }) {
    const cookieNames = Object.keys(cookies);

    const cookieSectionGrouping = _.groupBy(
      cookieNames,
      (cookieName) => cookieConfigs[cookieName].type
    );

    const blocks = [
      {
        title,
        description,
      },
    ];

    Object.keys(cookieSectionGrouping).forEach((sectionName) => {
      const { title, description } = sectionScaffolding[sectionName];
      const cookieNames = cookieSectionGrouping[sectionName];

      console.log("COOKIE NAMES", cookieNames);

      if (!cookieNames.length) {
        return;
      }

      blocks.push({
        title,
        description,
        toggle: {
          value: sectionName,
          enabled: sectionName === "essential",
          readonly: sectionName === "essential",
        },
        cookie_table: cookieNames.map((cookieName) => {
          const { name, cookies, period, info } = cookieConfigs[cookieName];
          return {
            col1: name,
            col2: cookies,
            col3: period,
            col4: info,
          };
        }),
      });
    });

    return {
      title: "Cookie Einstellungen",
      save_settings_btn: "Einstellungen speichern",
      accept_all_btn: "Alle akzeptieren",
      reject_all_btn: "Essentielle aktivieren",
      close_btn_label: "Schließen",
      cookie_table_headers: [
        { col1: "Name" },
        { col2: "Cookies" },
        { col3: "Ablauf" },
        { col4: "Beschreibung" },
      ],
      blocks,
    };
  }
}

const defaults = {
  title: "Wir nutzen Cookies!",
  description:
    'Diese Website verwendet essentielle Cookies, um ihren ordnungsgemäßen Betrieb zu gewährleisten und Tracking-Cookies, um zu verstehen, wie Sie mit ihr interagieren. Letztere werden nur nach Zustimmung gesetzt. <button type="button" data-cc="c-settings" class="cc-link">Zur Auswahl</button>',
  primaryBtn: {
    text: "Alle akzeptieren",
    role: "accept_all",
  },
  secondaryBtn: {
    text: "Essentielle akzeptieren",
    role: "accept_necessary",
  },
  cookies: {
    cc: true,
  },
};

const sectionScaffolding = {
  essential: {
    title: "Notwendige Cookies",
    description:
      "Diese Cookies sind fücr das ordnungsgemäße Funktionieren der Website unerlässlich. Ohne diese Cookies wücrde die Website nicht richtig funktionieren.",
    cookies: [],
  },
  analytics: {
    title: "Analytics Cookies",
    description:
      "Diese Cookies sammeln Informationen darücber, wie Sie die Website nutzen, welche Seiten Sie besucht und welche Links Sie angeklickt haben. Alle Daten sind anonymisiert und kü6nnen nicht dazu verwendet werden, Sie zu identifizieren.",
    cookies: [],
  },
  marketing: {
    title: "Werbe Cookies",
    description:
      "Diese Cookies sammeln Informationen darücber, wer durch Werbung auf unsere Website gelangt. Alle Daten sind anonymisiert und kü6nnen nicht dazu verwendet werden, Sie zu identifizieren.",
    cookies: [],
  },
};

const cookieConfigs = {
  cc: {
    name: "Cookie Consent",
    cookies: "cc_cookie",
    period: "6 Monate",
    info: "Cookie das die Cookieeinstellungen des Benutzers speichert.",
    type: SECTION_TYPE_ESSENTIAL,
  },
  stripe: {
    name: "Stripe",
    cookies:
      "site_sid, site-auth, double_cmd_f_uses, lang, stripe.csrf, has_intentionally_selected_curl, scfc, merchant, __stripe_orig_props, private_machine_identifier, _gcl_au, user, __stripe_mid, color-scheme, cookie-perms, recent-views, cid",
    period: "Session / 6 Monate",
    info: "Notwendige Cookies, für Bezahlvorgänge über unseren Zahlungsanbieter Stripe.",
    type: SECTION_TYPE_ESSENTIAL,
  },
  gtm: {
    name: "Google Tag Manager",
    cookies: "_ga,_gat,_gid",
    period: "2 Jahre",
    info: "Cookie von Google zur Steuerung der erweiterten Script- und Ereignisbehandlung.",
    type: SECTION_TYPE_ANALYTICS,
  },
  hotjar: {
    name: "Hotjar",
    cookies:
      "_hjClosedSurveyInvites, _hjDonePolls, _hjMinimizedPolls, _hjDoneTestersWidgets, _hjIncludedInSample, _hjShownFeedbackMessage, _hjid, _hjRecordingLastActivity, hjTLDTest, _hjUserAttributesHash, _hjCachedUserAttributes, _hjLocalStorageTest, _hjptid",
    period: "Sithung / 1 Jahr",
    info: "Hotjar ist ein Analysewerkzeug für das Benutzerverhalten von Hotjar Ltd. Wir verwenden Hotjar, um zu verstehen, wie Benutzer mit unserer Website interagieren.",
    type: SECTION_TYPE_ANALYTICS,
  },
  facebook: {
    name: "Facebook",
    cookies: "_fbp,act,c_user,datr,fr,m_pixel_ration,pl,presence,sb,spin,wd,xs",
    period: "Session / 1 Jahr",
    info: "Cookie von Facebook, das für Website-Analysen, Ad-Targeting und Anzeigenmessung verwendet wird.",
    type: SECTION_TYPE_MARKETING,
  },
  linkedin: {
    name: "LinkedIn",
    cookies: "li_gc",
    period: "Sitzung / 1 Jahr",
    info: "Cookie von LinkedIn, das für Website-Analysen, Ad-Targeting und Anzeigenmessung verwendet wird.",
    type: SECTION_TYPE_MARKETING,
  },
  bing: {
    name: "Microsoft Advertising",
    cookies: "MUID",
    period: "1 Jahr",
    info: "Cookies von Microsoft Advertising um den Erfolg von Werbemaßnahmen nachzuvollziehen.",
    type: SECTION_TYPE_MARKETING,
  },
};
