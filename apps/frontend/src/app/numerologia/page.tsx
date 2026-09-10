import type { Metadata } from "next";

import { NumerologyView } from "@/features/numerology/numerology-view.tsx";

export const metadata: Metadata = {
  title: "Numerologia",
  description: "As nove vibrações numerológicas, de um a nove, e como elas sustentam o quiz.",
};

export default function NumerologyPage() {
  return <NumerologyView />;
}
