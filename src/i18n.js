import i18next from "i18next";
import HttpBackend from "i18next-http-backend";

i18next
  .use(HttpBackend)
  .init({
    lng: "en",
    fallbackLng: "en",
    debug: false,
    ns: ["common"],
    defaultNS: "common",
    backend: {
      loadPath: "/locales/{{lng}}/{{ns}}.json", // Loads from /public/locales/
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;
