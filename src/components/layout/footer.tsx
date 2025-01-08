"use client";

import { GithubIcon } from "@/components/icons/github-icon";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="w-full py-12 border-t bg-secondary/5">
      <div className="container px-4 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About
            </h3>
            <p className="text-sm text-muted-foreground">
              Code Snippet Generator is a free tool to create beautiful code
              snippets for your social media. Developed with passion for the
              developer community.
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <a
                  href="https://github.com/offroadlabs/snippet"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>

          {/* Services Column */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Services
            </h3>
            <p className="text-sm text-muted-foreground">
              Specialized in modern web application development, we provide
              expertise with cutting-edge technologies:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Next.js & React Applications</li>
              <li>Symfony & PHP APIs</li>
              <li>Custom Architecture & Development</li>
              <li>Consulting & Training</li>
            </ul>
          </div>

          {/* Contact Column - Kept in French for French audience */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Contact
            </h3>
            <p className="text-sm text-muted-foreground">
              Vous avez un projet ? Discutons-en !
            </p>
            <Button
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
              asChild
            >
              <a
                href="https://hub.timoner.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Prendre rendez-vous
              </a>
            </Button>
          </div>
        </div>

        {/* Copyright and signature */}
        <div className="pt-8 border-t border-border/50 flex flex-col items-center gap-2 text-sm text-muted-foreground">
          <p>
            <a
              href="https://timoner.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Sébastien TIMONER
            </a>{" "}
            © {new Date().getFullYear()}
          </p>
          <p>
            Crafted with{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              ❤️
            </span>{" "}
            in Aix-en-Provence, France
          </p>
        </div>
      </div>
    </footer>
  );
}
