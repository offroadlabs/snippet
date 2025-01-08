import { Metadata } from "next";
import { AnimatedHero } from "@/components/home/animated-hero";
import { AnimatedGenerator } from "@/components/home/animated-generator";

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
  const description = `
    Transform your source code into elegant and professional snippets. 
    Our snippet generator offers:
    • Syntax highlighting for over 30 languages
    • Custom styling and theming
    • Export to PNG, SVG or HTML
    • Quick copy to clipboard
    • Support for annotations and comments
  `;

  return (
    <main className="min-h-screen py-12 bg-gradient-to-b from-primary/5 via-secondary/5 to-primary/5">
      <div className="container mx-auto max-w-[90rem] px-4">
        <AnimatedHero />
        <AnimatedGenerator description={description} />
      </div>
    </main>
  );
}
