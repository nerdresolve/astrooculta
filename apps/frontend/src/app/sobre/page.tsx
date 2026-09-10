import type { Metadata } from "next";

import { AboutView } from "@/features/about/about-view.tsx";

export const metadata: Metadata = {
  title: "Sobre",
  description: "O que é Astro Oculta, no que acreditamos e como lemos.",
};

export default function AboutPage() {
  return <AboutView />;
}
