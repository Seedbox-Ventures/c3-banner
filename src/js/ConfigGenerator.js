import _ from "lodash";
import cookieConfigs from "./cookies";

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
      cookies: { ...defaults.cookies, ...cookies },
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
    "Diese Website verwendet essentielle Cookies, um ihren ordnungsgemäßen Betrieb zu gewährleisten und Tracking-Cookies, um zu verstehen, wie Sie mit ihr interagieren. Letztere werden nur nach Zustimmung gesetzt.",
  primaryBtn: {
    text: "Alle akzeptieren",
    role: "accept_all",
  },
  secondaryBtn: {
    text: "Individuelle Datenschutzeinstellungen",
    role: "c-settings",
  },
  cookies: {
    cc: true,
  },
};

const sectionScaffolding = {
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
};
