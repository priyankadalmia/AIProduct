"use client";

import { useState, useEffect } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"pink" | "blue">("pink");

  useEffect(() => {
    const saved = localStorage.getItem("bj-theme") as "pink" | "blue" | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const toggle = () => {
    const next = theme === "pink" ? "blue" : "pink";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("bj-theme", next);
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 rounded-full bg-toggle-bg px-3 py-1.5 text-xs font-medium transition-colors"
      aria-label={`Switch to ${theme === "pink" ? "blue" : "pink"} theme`}
      title={`Switch to ${theme === "pink" ? "blue" : "pink"} theme`}
    >
      <span className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors ${theme === "pink" ? "bg-toggle-active text-white" : "bg-white/60"}`}>
        🩷
      </span>
      <span className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors ${theme === "blue" ? "bg-toggle-active text-white" : "bg-white/60"}`}>
        💙
      </span>
    </button>
  );
}
