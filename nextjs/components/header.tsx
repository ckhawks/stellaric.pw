"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { Avatar } from "./ui/avatar";
import Image from "next/image";
import headerStyles from "./header.module.css";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    // { href: "/blog", label: "Blog" },
    // { href: "/broadcasts", label: "Broadcasts" },
    { href: "/dj-sets", label: "DJ Sets" },
    // { href: "/metrics", label: "Metrics" },
    // { href: "/gear", label: "Gear" },
    // { href: "/photography", label: "Photography" },
    // { href: "/links", label: "Links" },
    // { href: "/3d-models", label: "3D" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm dark:backdrop-brightness-50 background-brightness-250 header`}
      style={{
        backdropFilter: "saturate(180%) blur(10px)",
        background: "unset",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
          >
            <Image
              src="/stellaric.svg"
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
                className={`font-sans text-[14px] transition-colors ${
                  pathname === link.href
                    ? "font-bold text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label.toLocaleLowerCase()}
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
                className={`block font-sans text-[15px] transition-colors py-2 ${
                  pathname === link.href
                    ? "font-bold text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label.toLocaleLowerCase()}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
