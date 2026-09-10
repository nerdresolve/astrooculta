import type { Metadata } from "next";

import { ResultView } from "@/features/quiz/result-view.tsx";

export const metadata: Metadata = {
  title: "Seu resultado",
  description: "O signo que representa a sua essência, segundo as nove vibrações.",
};

/** As respostas chegam pela URL: `r` é o código, `n` o nome opcional. */
export default async function ResultPage({
  searchParams,
}: {
  searchParams: Promise<{ r?: string; n?: string }>;
}) {
  const { r = "", n } = await searchParams;
  return <ResultView code={r} name={n} />;
}
