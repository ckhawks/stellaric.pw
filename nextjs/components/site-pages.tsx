import { Fragment } from "react";
import Link from "next/link";
import {
  ChevronRight,
  Code2,
  Camera,
  Box,
  Music,
  BookOpen,
  Radio,
  Cpu,
  Link2,
  BarChart3,
  User,
} from "lucide-react";

interface PageItem {
  title: string;
  description: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  category?: string;
}

const pages: PageItem[] = [
  {
    category: "Personal",
    title: "About",
    description: "Learn more about me and what I do",
    href: "/about",
    icon: User,
  },
  {
    title: "Activity",
    description: "Writing on development, design, and creative work",
    href: "/blog",
    icon: BookOpen,
  },
  {
    category: "Creative Work",
    title: "Projects",
    description:
      "Deep dive into my work - frameworks, tools, and creative projects",
    href: "/projects",
    icon: Code2,
  },
  {
    title: "Photography",
    description: "Visual portfolio and photography work",
    href: "/photography",
    icon: Camera,
  },
  {
    title: "Broadcasts",
    description: "Stream archives and live event recordings",
    href: "/broadcasts",
    icon: Radio,
  },
  {
    title: "DJ Sets",
    description: "Music production and live broadcast sets",
    href: "/dj-sets",
    icon: Music,
  },
  {
    title: "3D Models",
    description: "3D asset packs and game-ready models",
    href: "/3d-models",
    icon: Box,
  },
  {
    category: "Reference & Tools",
    title: "Metrics",
    description: "Statistics and analytics about my work",
    href: "/metrics",
    icon: BarChart3,
  },
  {
    title: "Gear",
    description: "Equipment, tools, and setup details",
    href: "/gear",
    icon: Cpu,
  },
  {
    title: "Links",
    description: "Curated collection of resources and references",
    href: "/links",
    icon: Link2,
  },
];

export function SitePages() {
  // Group pages by category to determine odd/even
  const grouped = pages.reduce(
    (acc, page) => {
      const category = page.category || "uncategorized";
      if (!acc[category]) acc[category] = [];
      acc[category].push(page);
      return acc;
    },
    {} as Record<string, PageItem[]>
  );

  let currentCategory = "";

  return (
    <section className="space-y-8">
      {/* <h2 className="text-3xl font-bold">Explore the Site</h2> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 auto-rows-max">
        {pages.map((page, index) => {
          const Icon = page.icon;
          const showCategory =
            page.category && page.category !== currentCategory;
          if (page.category) currentCategory = page.category;

          // Check if this is the last item in its category and if category has odd count
          const category = page.category || "uncategorized";
          const categoryItems = grouped[category];
          const isLastInCategory =
            categoryItems[categoryItems.length - 1].href === page.href;
          const isOddCount = categoryItems.length % 2 === 1;
          const shouldCenter = isLastInCategory && isOddCount;

          return (
            <Fragment key={page.href}>
              {showCategory && (
                <h3
                  className="sm:col-span-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-2 pl-1"
                >
                  {page.category}
                </h3>
              )}
              <Link
                href={page.href}
                className="group flex items-center gap-4 p-4 border border-border rounded-lg bg-card md:bg-card/2 md:backdrop-blur hover:-backdrop-blur hover:border-accent hover:bg-accent/5 transition-all"
              >
                  <Icon className="w-5 h-5 group-hover:text-accent flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold group-hover:text-accent transition-colors">
                      {page.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {page.description}
                    </p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
              </Link>
            </Fragment>
          );
        })}
      </div>
    </section>
  );
}
