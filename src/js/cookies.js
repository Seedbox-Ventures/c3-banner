export const SECTION_TYPE_ESSENTIAL = "essential";
export const SECTION_TYPE_ANALYTICS = "analytics";
export const SECTION_TYPE_MARKETING = "marketing";

export default {
  cc: {
    name: "Cookie Consent",
    cookies: "cc_cookie",
    period: "6 Monate",
    info: "Cookie das die Cookieeinstellungen des Benutzers speichert.",
    activationCode: undefined,
    type: SECTION_TYPE_ESSENTIAL,
  },
  meta: {
    name: "Meta",
    cookies: "_fbp,act,c_user,datr,fr,m_pixel_ration,pl,presence,sb,spin,wd,xs",
    period: "Session / 1 Jahr",
    info: "Cookie von Meta, das für Website-Analysen, Ad-Targeting und Anzeigenmessung verwendet wird.",
    type: SECTION_TYPE_MARKETING,
  },
  ga: {
    name: "Google Analytics",
    cookies: "_ga,_gat,_gid",
    period: "2 Jahre",
    info: "Cookie von Google für Website-Analysen. Erzeugt statistische Daten darüber, wie der Besucher die Website nutzt.",
    type: SECTION_TYPE_ANALYTICS,
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
    period: "Session / 1 Jahr",
    info: "Hotjar ist ein Analysewerkzeug für das Benutzerverhalten von Hotjar Ltd. Wir verwenden Hotjar, um zu verstehen, wie Benutzer mit unserer Website interagieren.",
    type: SECTION_TYPE_ANALYTICS,
  },
  linkedin: {
    name: "LinkedIn",
    cookies: "li_gc",
    period: "Session / 1 Jahr",
    info: "Cookie von LinkedIn, das für Website-Analysen, Ad-Targeting und Anzeigenmessung verwendet wird.",
    type: SECTION_TYPE_MARKETING,
  },
  ma: {
    name: "Microsoft Advertising",
    cookies: "MUID",
    period: "1 Jahr",
    info: "Cookies von Microsoft Advertising um den Erfolg von Werbemaßnahmen nachzuvollziehen.",
    type: SECTION_TYPE_MARKETING,
  },
  stripe: {
    name: "Stripe",
    cookies:
      "site_sid, site-auth, double_cmd_f_uses, lang, stripe.csrf, has_intentionally_selected_curl, scfc, merchant, __stripe_orig_props, private_machine_identifier, _gcl_au, user, __stripe_mid, color-scheme, cookie-perms, recent-views, cid",
    period: "Session / 6 Monate",
    info: "Notwendige Cookies, für Bezahlvorgänge über unseren Zahlungsanbieter Stripe.",
    activationCode: undefined,
    type: SECTION_TYPE_ESSENTIAL,
  },
  tiktok: {
    name: "TikTok",
    cookies:
      "_abck, _ga, _ga_HV1FL86553, _ttp, cmpl_token, cookie-consent, from_way, msToken, odin_tt, passport_auth_status, passport_auth_status_ss, passport_auth_status_ss_ads, passport_csrf_token, passport_csrf_token_default, s_v_web_id, sessionid, sessionid_ads, sessionid_ss, sessionid_ss_ads, sid_guard, sid_guard_ads, sid_tt, sid_tt_ads, sid_ucp_v1, ssid_ucp_sso_v1_ads, ssid_ucp_v1, ssid_ucp_v1_ads, sso_auth_status_ss_ads, sso_uid_tt_ss_ads, store-country-code, store-idc, toutiao_sso_user_ss_ads, tt-target-idc, tt_csrf_token, tt_webid, tta_attr_ga_cid, tta_attr_id, tta_attr_id_mirror, ttwid, uid_tt, uid_tt_ads, uid_tt_ss, uid_tt_ss_",
    period: "Session / 2 Jahre",
    info: "TikTok ist ein Social Media Portal für das Streaming kurzers Videoinhalte.",
    type: SECTION_TYPE_MARKETING,
  },
};
