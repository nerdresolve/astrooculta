"use client";

import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";

import { cx } from "./cx.ts";
import { IconButton } from "./icon-button.tsx";

export type DialogProps = {
  open?: boolean;
  title?: string;
  onClose: () => void;
  footer?: ReactNode;
  children?: ReactNode;
  className?: string;
};

/**
 * O protótipo do design system fechava só no clique fora. Aqui o diálogo também
 * fecha no Esc, trava o scroll do fundo e devolve o foco a quem o abriu — sem
 * isto, quem navega por teclado fica preso atrás do overlay.
 */
export function Dialog({ open = false, title, onClose, footer, children, className }: DialogProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;

    openerRef.current = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="ao-overlay" onClick={onClose}>
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cx("ao-dialog", className)}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="ao-dialog__close">
          <IconButton size="sm" bare label="Fechar" onClick={onClose}>
            ✕
          </IconButton>
        </div>
        {title && (
          <h3 className="ao-dialog__title" id={titleId}>
            {title}
          </h3>
        )}
        {children}
        {footer && <div style={{ display: "flex", gap: "var(--sp-3)", marginTop: "var(--sp-8)" }}>{footer}</div>}
      </div>
    </div>
  );
}
