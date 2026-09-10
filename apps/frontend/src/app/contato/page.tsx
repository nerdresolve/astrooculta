import type { Metadata } from "next";

import { ContactView } from "@/features/contact/contact-view.tsx";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Astro Oculta pelo WhatsApp, e-mail ou pelo formulário.",
};

export default function ContactPage() {
  return <ContactView />;
}
