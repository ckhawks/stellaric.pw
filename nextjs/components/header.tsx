"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Terminal, Menu, X, MessageCircle } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import { Avatar } from "./ui/avatar";
import Image from "next/image";
import { Button } from "./ui/button";
import { useChatContext } from "@/context/chat-context";
import headerStyles from "./header.module.css";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isChatOpen, setIsChatOpen, unreadCount } = useChatContext();

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    // { href: "/blog", label: "Blog" },
    { href: "/broadcasts", label: "Broadcasts" },
    { href: "/dj-sets", label: "DJ Sets" },
    // { href: "/metrics", label: "Metrics" },

    { href: "https://photos.stlr.cx/", label: "Photos", external: true },

    // { href: "/photography", label: "Photography" },
    // { href: "/links", label: "Links" },
    { href: "/3d-models", label: "3D" },
    { href: "/light", label: "Light" },
    { href: "/gear", label: "Gear" },
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
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[14px] transition-colors text-muted-foreground hover:text-foreground"
                >
                  {link.label.toLocaleLowerCase()}
                </a>
              ) : (
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
              )
            )}
            <ThemeToggle />
            <div className="relative">
              <Button
                onClick={() => setIsChatOpen(!isChatOpen)}
                variant="ghost"
                size="sm"
                className={`h-9 px-2 transition-colors cursor-pointer ${
                  isChatOpen
                    ? "bg-accent/20 text-accent"
                    : "text-foreground hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white"
                }`}
                title="Toggle chat"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
              {!isChatOpen && unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-background text-accent rounded-full flex items-center justify-center text-[10px] font-bold border border-accent">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-4 lg:hidden ">
            <ThemeToggle />
            <div className="relative">
              <Button
                onClick={() => setIsChatOpen(!isChatOpen)}
                variant="ghost"
                size="sm"
                className={`h-9 px-2 transition-colors cursor-pointer ${
                  isChatOpen
                    ? "bg-accent/20 text-accent"
                    : "text-foreground hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white"
                }`}
                title="Toggle chat"
              >
                <MessageCircle className="w-4 h-4" />
              </Button>
              {!isChatOpen && unreadCount > 0 && (
                <div className="absolute -top-1 -right-1 h-4 w-4 bg-background text-accent rounded-full flex items-center justify-center text-[10px] font-bold border border-accent">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </div>
              )}
            </div>
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
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block font-sans text-[15px] transition-colors py-2 text-muted-foreground hover:text-foreground"
                >
                  {link.label.toLocaleLowerCase()}
                </a>
              ) : (
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
              )
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
