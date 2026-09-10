import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SIGNS, SIGNS_BY_ID, type SignId } from "@/content/signs.ts";
import { SignDetailView } from "@/features/signs/sign-detail-view.tsx";

/* Doze rotas conhecidas em tempo de build — nenhuma precisa de servidor. */
export function generateStaticParams() {
  return SIGNS.map((sign) => ({ sign: sign.id }));
}

function findSign(id: string) {
  return SIGNS.find((sign) => sign.id === id);
}

export async function generateMetadata({ params }: { params: Promise<{ sign: string }> }): Promise<Metadata> {
  const { sign: id } = await params;
  const sign = findSign(id);

  if (!sign) return { title: "Signo não encontrado" };

  return {
    title: sign.name,
    description: sign.essence,
  };
}

export default async function SignPage({ params }: { params: Promise<{ sign: string }> }) {
  const { sign: id } = await params;
  const sign = findSign(id);

  if (!sign) notFound();

  return <SignDetailView sign={SIGNS_BY_ID[sign.id as SignId]} />;
}
