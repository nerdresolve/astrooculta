"use client";

import { Glyph, IconButton } from "@/components/ds";

import { useTheme } from "./use-theme.ts";

/** Botão flutuante que alterna cosmic ↔ lunar. Não depende de rota. */
export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <IconButton
      className="theme-toggle"
      label={theme === "cosmic" ? "Mudar para o tema claro" : "Mudar para o tema escuro"}
      onClick={toggle}
    >
      <Glyph name={theme === "cosmic" ? "sun" : "moon"} size={18} />
    </IconButton>
  );
}
