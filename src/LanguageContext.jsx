// src/context/LanguageContext.jsx
import { createContext, useState, useContext } from "react";
import translate from "translate-google";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en"); // Default language: English

  const translateText = async (text, targetLanguage) => {
    try {
      const result = await translate(text, { to: targetLanguage });
      return result;
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Fallback to original text on error
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, translateText }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}