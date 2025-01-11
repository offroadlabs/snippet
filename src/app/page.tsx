import { Metadata } from "next";
import { AnimatedHero } from "@/components/home/animated-hero";
import { AnimatedGenerator } from "@/components/home/animated-generator";
import { Description } from "@/components/home/description";

export const metadata: Metadata = {
  title: "Code Snippet Generator | Free Developer Tool",
  description:
    "Create beautifully formatted and styled code snippets. Multi-language support, syntax highlighting, and various export formats. Perfect for documentation, code sharing and teaching.",
  keywords:
    "code generator, snippet, syntax highlighting, code formatting, developer, programming, development tool",
  openGraph: {
    title: "Code Snippet Generator",
    description:
      "Create and share beautifully formatted code snippets with syntax highlighting",
    type: "website",
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen py-12 bg-gradient-to-b from-primary/5 via-secondary/5 to-primary/5">
      <div className="container mx-auto max-w-[90rem] px-4">
        <AnimatedHero />
        <Description />
        <AnimatedGenerator />
      </div>
    </main>
  );
}
