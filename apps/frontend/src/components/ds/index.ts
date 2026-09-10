/**
 * Design system Astro Oculta — porte TypeScript.
 *
 * Um ponto de entrada só, para as telas importarem de `@/components/ds`.
 * A API pública é a mesma do design system original; o que mudou foi o tipo.
 * As classes CSS vêm de `@/styles/astro-oculta-ds/components.css`.
 */
export { cx } from "./cx.ts";

export { Glyph, GLYPH_NAMES, type GlyphName, type GlyphProps } from "./glyph.tsx";
export { Button, type ButtonProps, type ButtonVariant, type ButtonSize } from "./button.tsx";
export { IconButton, type IconButtonProps } from "./icon-button.tsx";
export { Badge, type BadgeProps } from "./badge.tsx";
export { Tag, type TagProps } from "./tag.tsx";
export { Card, type CardProps, type CardVariant } from "./card.tsx";
export { OrnateFrame, type OrnateFrameProps } from "./ornate-frame.tsx";
export { Divider, type DividerProps } from "./divider.tsx";
export { Eyebrow, type EyebrowProps } from "./eyebrow.tsx";
export { Starfield, type StarfieldProps } from "./starfield.tsx";

export { Field, type FieldProps } from "./field.tsx";
export { Input, type InputProps, type TextareaProps } from "./input.tsx";
export { Select, type SelectProps, type SelectOption } from "./select.tsx";
export { Checkbox, type CheckboxProps } from "./checkbox.tsx";
export { Switch, type SwitchProps } from "./switch.tsx";

export { Tabs, type TabsProps } from "./tabs.tsx";
export { Dialog, type DialogProps } from "./dialog.tsx";
export { Toast, type ToastProps } from "./toast.tsx";
export { Tooltip, type TooltipProps } from "./tooltip.tsx";

export { QuizProgress, type QuizProgressProps } from "./quiz-progress.tsx";
export { QuizQuestion, type QuizQuestionProps } from "./quiz-question.tsx";
export { AnswerList, type Answer, type AnswerListProps } from "./answer-list.tsx";
export { SignBar, type SignBarProps } from "./sign-bar.tsx";
export { SignCard, type SignCardProps } from "./sign-card.tsx";
