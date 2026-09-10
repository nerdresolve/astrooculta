import type { Metadata } from "next";

import { BlogView } from "@/features/blog/blog-view.tsx";

export const metadata: Metadata = {
  title: "Blog",
  description: "Textos sobre astrologia, numerologia e tarô, com atenção ao presente.",
};

export default function BlogPage() {
  return <BlogView />;
}
