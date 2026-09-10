/**
 * Sonda de saúde do contêiner — é o que o healthcheck do compose consulta.
 *
 * `force-dynamic` porque o padrão do App Router seria pré-renderizar isto em
 * tempo de build e devolver sempre a mesma resposta, inclusive com o processo
 * já morrendo. Uma sonda que não pode falhar não serve como sonda.
 */
export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ status: "ok" });
}
