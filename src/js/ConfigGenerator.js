import _ from "lodash";
import cookieConfigs from "./cookies.js";

const languageIds = ['de', 'en'];

export default class ConfigGenerator {
  static sharedInstance;

  static instance() {
    if (!ConfigGenerator.sharedInstance) {
      ConfigGenerator.sharedInstance = new ConfigGenerator();
    }
    return ConfigGenerator.sharedInstance;
  }

  generateConfig({
    preset = 'default',
    current_lang = "de",
    cookies = {},
    languages: langConfig = {}
  }) {

    const languages = {};
    const presetDefaults = preset === 'ca' ? caDefaults: defaults

    languageIds.forEach(langId => {
      const langDefaults = presetDefaults.languages[langId]

      const {
        [langId]: {
          title = langDefaults.title,
          description = langDefaults.description,
          primaryBtn = langDefaults.primaryBtn,
          secondaryBtn = langDefaults.secondaryBtn
        } = {}
      } = langConfig

      languages[langId] = {
        consent_modal: {
          title,
          description,
          primary_btn: primaryBtn,
          secondary_btn: secondaryBtn,
        },
        settings_modal: this.generateModalSettings({
          ...langDefaults,
          cookies: { ...defaults.cookies, ...cookies },
        }, langId)
      }
    })

    return {
      current_lang,
      autorun: true,
      force_consent: true,
      autoclear_cookies: true, // default: false
      page_scripts: true, // default: false
      languages
    };
  }

  generateModalSettings({
      title,
      description,
      cookies,
      settingsTitle,
      save_settings_btn,
      accept_all_btn,
      reject_all_btn,
      close_btn_label,
      cookie_table_headers,
    }, langId
  ) {
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
      const { title, description } = sectionScaffolding[langId][sectionName];
      const cookieNames = cookieSectionGrouping[sectionName];

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
            col4: info[langId],
          };
        }),
      });
    });

    return {
      title: settingsTitle,
      save_settings_btn,
      accept_all_btn,
      reject_all_btn,
      close_btn_label,
      cookie_table_headers,
      blocks,
    };
  }
}

const defaults = {
  languages: {
    de: {
      title: "Wir nutzen Cookies!",
      description:
          "Diese Website verwendet essentielle Cookies, um ihren ordnungsgemäßen Betrieb zu gewährleisten und Tracking-Cookies, um zu verstehen, wie Sie mit ihr interagieren. Letztere werden nur nach Zustimmung gesetzt.",
      primaryBtn: {
          text: "Alle akzeptieren",
          role: "accept_all",
      },
      secondaryBtn: {
        text: "Individuelle Datenschutzeinstellungen",
        role: "c-settings",
      },
      settingsTitle: "Cookie Einstellungen",
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
    },
    en: {
      title: "We're using cookies!",
      description:
          "This website uses essential cookies to ensure its proper operation and tracking cookies to understand how you interact with it. The latter are set only after consent.",
      primaryBtn: {
          text: "Accept all",
          role: "accept_all",
      },
      secondaryBtn: {
        text: "Individual privacy settings",
        role: "c-settings",
      },
      settingsTitle: "Cookie Settings",
      save_settings_btn: "Save settings",
      accept_all_btn: "Accept all",
      reject_all_btn: "Activate essentials",
      close_btn_label: "Close",
      cookie_table_headers: [
        { col1: "Name" },
        { col2: "Cookies" },
        { col3: "Expiration" },
        { col4: "Description" },
      ],
    }
  },
  cookies: {
    cc: true,
  },
};

const sectionScaffolding = {
  de: {
    essential: {
      title: "Notwendige Cookies",
      description:
        "Diese Cookies sind für das ordnungsgemäße Funktionieren der Website unerlässlich. Ohne diese Cookies würde die Website nicht richtig funktionieren.",
      cookies: [],
    },
    analytics: {
      title: "Analytics Cookies",
      description:
        "Diese Cookies sammeln Informationen darüber, wie Sie die Website nutzen, welche Seiten Sie besucht und welche Links Sie angeklickt haben. Alle Daten sind anonymisiert und können nicht dazu verwendet werden, Sie zu identifizieren.",
      cookies: [],
    },
    marketing: {
      title: "Werbe Cookies",
      description:
        "Diese Cookies sammeln Informationen darüber, wer durch Werbung auf unsere Website gelangt. Alle Daten sind anonymisiert und können nicht dazu verwendet werden, Sie zu identifizieren.",
      cookies: [],
    },
  },
  en: {
    essential: {
      title: "Necessary cookies",
      description:
        "These cookies are essential for the proper functioning of the website. Without these cookies, the website would not function properly.",
      cookies: [],
    },
    analytics: {
      title: "Analytics cookies",
      description:
        "These cookies collect information about how you use the website, which pages you have visited, and which links you have clicked. All data is anonymized and cannot be used to identify you.",
      cookies: [],
    },
    marketing: {
      title: "Advertising cookies",
      description:
        "These cookies collect information about who comes to our website through advertising. All data is anonymized and cannot be used to identify you.",
      cookies: [],
    },
  }
};
