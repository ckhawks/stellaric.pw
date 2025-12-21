"use client";

import Link from "next/link";
import { Terminal, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { Avatar } from "./ui/avatar";
import Image from "next/image";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/projects", label: "projects" },
    { href: "/blog", label: "blog" },
    { href: "/about", label: "about" },
    { href: "/broadcasts", label: "broadcasts" },
    { href: "/metrics", label: "metrics" },
    { href: "/gear", label: "gear" },
    { href: "/photography", label: "photography" },
    { href: "/links", label: "links" },
    { href: "/3d-models", label: "3d" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
          >
            <Image
              src="stellaric.svg"
              alt="Stellaric Logo"
              width={34}
              height={34}
              className="dark:invert border-none outline-none"
            />
            {/* <Terminal className="w-5 h-5" /> */}
            <span className="font-sans text-md font-bold">STELLARIC</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                /{link.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          <div className="flex items-center gap-4 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground hover:text-accent transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <nav className="lg:hidden border-t border-border py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block font-mono text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
              >
                /{link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
