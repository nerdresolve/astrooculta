import type { Metadata } from "next";

import { SignsView } from "@/features/signs/signs-view.tsx";

export const metadata: Metadata = {
  title: "Signos",
  description: "Os doze signos do zodíaco: elemento, regente e a essência de cada um.",
};

export default function SignsPage() {
  return <SignsView />;
}
