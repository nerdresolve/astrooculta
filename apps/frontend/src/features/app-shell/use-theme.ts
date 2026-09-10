"use client";

import { useCallback, useEffect, useState } from "react";

export type Theme = "cosmic" | "lunar";

const STORAGE_KEY = "astro-oculta-theme";

/**
 * Lê e grava o tema no <html data-theme>.
 *
 * O valor inicial já foi aplicado pelo script síncrono do layout, antes da
 * primeira pintura — este hook só continua de onde ele parou. Por isso o
 * estado começa em "cosmic" e é corrigido no primeiro efeito: durante o SSR não
 * existe DOM para consultar, e chutar diferente causaria divergência de
 * hidratação.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("cosmic");

  useEffect(() => {
    const applied = document.documentElement.getAttribute("data-theme");
    if (applied === "lunar" || applied === "cosmic") setTheme(applied);
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "cosmic" ? "lunar" : "cosmic";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* Modo privado ou storage cheio: o tema vale só para esta sessão. */
      }
      return next;
    });
  }, []);

  return { theme, toggle };
}
