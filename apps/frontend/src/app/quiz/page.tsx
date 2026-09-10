import type { Metadata } from "next";

import { QuizView } from "@/features/quiz/quiz-view.tsx";

export const metadata: Metadata = {
  title: "Quiz",
  description: "Nove perguntas baseadas na numerologia para descobrir o signo que representa a sua essência.",
};

export default function QuizPage() {
  return <QuizView />;
}
