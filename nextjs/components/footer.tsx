import Link from "next/link";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer
      className="border-t border-border mt-24 bg-background md:bg-background/3 md:backdrop-blur"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-row flex-col items-center justify-between gap-4">
          <div className="flex flex-col gap-2 items-start">
            <div className="flex flex-col text-sm text-muted-foreground items-start">
              <Image
                src="stellaric.svg"
                alt="Stellaric Logo"
                width={34}
                height={34}
                className="dark:invert border-none outline-none mb-4"
              />
              {/* <span className="text-accent">$</span> */}
              <span>Stellaric © {new Date().getFullYear()}</span>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <Link
                href="https://github.com"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Github className="w-5 h-5 opacity-70" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://twitter.com"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Twitter className="w-5 h-5 opacity-70" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://linkedin.com"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Linkedin className="w-5 h-5 opacity-70" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:hello@stellaric.pw"
                className="text-muted-foreground hover:text-accent transition-colors"
              >
                <Mail className="w-5 h-5 opacity-70" />
                <span className="sr-only">Email</span>
              </Link>
            </div>

            {/* <div className="mt-8 text-xs text-muted-foreground text-center sm:text-left">
              <code>
                BUILD_VERSION: 1.0.0 | UPTIME: 99.9% | STATUS: OPERATIONAL
              </code>
            </div> */}
          </div>
          <div className="mt-1 text-xs text-muted-foreground text-center sm:text-left text-muted-foreground">
            <code className="font-mono" style={{ color: "#969696ff" }}>
              　　　　 　／＞ __　フ
              <br />
              　　　 　　| 　_　_ l
              <br /> 　 　　 　／` ミ＿xノ
              <br />
              　　 　 /　　　 　 |<br /> 　　　 /　 ヽ　　 ﾉ<br />
              　 　 |　　|　|　|
              <br />
              　／￣|　　 |　|　|
              <br /> 　| (￣ヽ＿_ヽ_)__)
              <br /> 　　 二つ
              <br />
            </code>
          </div>
        </div>
      </div>
    </footer>
  );
}
