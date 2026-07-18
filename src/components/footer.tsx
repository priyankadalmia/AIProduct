"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function Footer() {
  const [text, setText] = useState("BumpJournal — Cherishing every moment of your pregnancy journey");

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "footer_text")
      .single()
      .then(({ data }) => {
        if (data) setText(data.value);
      });
  }, []);

  return (
    <footer className="border-t border-border bg-muted/50 py-8">
      <div className="mx-auto max-w-6xl px-4 text-center text-sm text-text-secondary">
        <p>{text}</p>
      </div>
    </footer>
  );
}
