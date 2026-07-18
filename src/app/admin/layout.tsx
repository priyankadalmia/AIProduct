"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const adminLinks = [
  { href: "/admin", label: "Site Settings", icon: "⚙️" },
  { href: "/admin/journal", label: "Journal Entries", icon: "📖" },
  { href: "/admin/milestones", label: "Milestones", icon: "🎯" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Admin Portal</h1>
          <p className="mt-1 text-text-secondary">Manage your BumpJournal content</p>
        </div>
        <Link
          href="/"
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-muted"
        >
          ← Back to Site
        </Link>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <nav className="flex gap-2 overflow-x-auto lg:w-56 lg:shrink-0 lg:flex-col">
          {adminLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors ${
                pathname === link.href
                  ? "bg-primary/20 text-primary-dark"
                  : "text-text-secondary hover:bg-muted hover:text-foreground"
              }`}
            >
              <span>{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
