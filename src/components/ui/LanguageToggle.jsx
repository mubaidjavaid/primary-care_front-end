import { useEffect } from "react";
import i18n from "../../i18n";
import { useUiStore } from "../../store/uiStore";

export default function LanguageToggle() {
  const language = useUiStore((state) => state.language);
  const setLanguage = useUiStore((state) => state.setLanguage);

  useEffect(() => {
    i18n.changeLanguage(language);
    document.body.dir = language === "ur" ? "rtl" : "ltr";
  }, [language]);

  return (
    <div className="inline-flex rounded-badge border border-medical-border p-1 text-xs font-semibold">
      <button
        type="button"
        className={`rounded-badge px-2 py-1 ${language === "en" ? "bg-navy-700 text-white" : "text-slate-600"}`}
        onClick={() => setLanguage("en")}
      >
        EN
      </button>
      <button
        type="button"
        className={`rounded-badge px-2 py-1 ${language === "ur" ? "bg-navy-700 text-white" : "text-slate-600"}`}
        onClick={() => setLanguage("ur")}
      >
        اردو
      </button>
    </div>
  );
}
