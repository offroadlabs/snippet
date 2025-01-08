import { Metadata } from "next";
import { CodeSnippetGenerator } from "@/components/tools/code-snippet-generator";

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
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[rgba(158,195,58,1)] via-[rgba(36,135,199,1)] to-[rgba(158,195,58,1)] animate-gradient-x">
            Code Snippet Generator
          </h1>
          <p className="text-lg">
            <span className="text-primary">Create beautiful code snippets</span>{" "}
            <span className="text-secondary">
              for your social media in seconds
            </span>
          </p>
        </div>
        <div className="flex justify-center">
          <CodeSnippetGenerator description={description} />
        </div>
      </div>
    </main>
  );
}
