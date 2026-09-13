import { useEffect, useState, useMemo } from "react";
import { api } from "../lib/apiClient";
import { useLanguage } from "../context/LanguageContext";

export function useSectionContent(key, fallback) {
  const [rawContent, setRawContent] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const { translateObject, language } = useLanguage();

  useEffect(() => {
    let cancelled = false;

    api
      .get(`/api/sections/${key}`)
      .then((section) => {
        if (!cancelled && section?.data) setRawContent(section.data);
      })
      .catch(() => {
        // API down or section not seeded yet — keep the fallback content.
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [key]);

  const translatedContent = useMemo(() => {
    return translateObject(rawContent);
  }, [rawContent, translateObject, language]);

  return [translatedContent, loading];
}
