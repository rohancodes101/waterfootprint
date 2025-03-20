import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: { home: "Home", calculate: "Calculate Water Footprint", resources: "Resources" } },
    hi: { translation: { home: "होम", calculate: "जल पदचिह्न की गणना करें", resources: "संसाधन" } },
    te: { translation: { home: "హోమ్", calculate: "నీటి పాదముద్రను లెక్కించండి", resources: "వనరులు" } },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;