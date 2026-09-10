/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    /* A arte já sai otimizada de `npm run art`: WebP em dois tamanhos, na
       resolução exata que o site usa. Sem `unoptimized`, o Next recomprime
       por cima com q=75 — dupla compressão, que degrada o gradiente e o
       detalhe fino sem economizar quase nada. */
    unoptimized: true,
  },
};

export default nextConfig;
