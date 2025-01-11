"use client";

export function Description() {
  return (
    <div className="max-w-4xl mx-auto mb-8">
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-300">
          Transform your source code into elegant and professional snippets. Our
          snippet generator offers: • Syntax highlighting for over 30 languages
          • Custom styling and theming • Export to PNG, SVG or HTML • Quick copy
          to clipboard • Support for annotations and comments
        </p>

        <div className="mt-2 flex flex-wrap gap-2">
          <span className="text-sm text-primary">Supported languages:</span>
          <span className="text-sm text-secondary">TypeScript</span>
          <span className="text-sm text-secondary">JavaScript</span>
          <span className="text-sm text-secondary">Python</span>
          <span className="text-sm text-secondary">Java</span>
          <span className="text-sm text-secondary">and more...</span>
        </div>
      </div>
    </div>
  );
}
