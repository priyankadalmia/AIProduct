"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { SiteSetting } from "@/lib/types";

const settingLabels: Record<string, string> = {
  site_name: "Site Name",
  site_tagline: "Site Tagline",
  hero_title: "Hero Title",
  hero_description: "Hero Description",
  cta_text: "CTA Button Text",
  footer_text: "Footer Text",
};

export default function AdminSettings() {
  const [settings, setSettings] = useState<SiteSetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .order("key");
    if (!error && data) {
      setSettings(data);
      const values: Record<string, string> = {};
      data.forEach((s) => (values[s.key] = s.value));
      setEditValues(values);
    }
    setLoading(false);
  }

  async function saveSetting(key: string) {
    setSaving(key);
    await supabase
      .from("site_settings")
      .update({ value: editValues[key], updated_at: new Date().toISOString() })
      .eq("key", key);
    setSaving(null);
  }

  if (loading) {
    return <div className="py-12 text-center text-text-secondary">Loading settings...</div>;
  }

  return (
    <div>
      <h2 className="text-lg font-semibold">Site Settings</h2>
      <p className="mt-1 text-sm text-text-secondary">
        Edit your site name, descriptions, and content. Changes reflect immediately on the main pages.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        {settings.map((setting) => {
          const isLongText = ["hero_description", "footer_text"].includes(setting.key);
          const hasChanged = editValues[setting.key] !== setting.value;

          return (
            <div
              key={setting.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <label className="block text-sm font-medium">
                {settingLabels[setting.key] || setting.key}
              </label>
              <p className="mt-0.5 text-xs text-text-secondary">Key: {setting.key}</p>
              {isLongText ? (
                <textarea
                  rows={3}
                  value={editValues[setting.key] || ""}
                  onChange={(e) =>
                    setEditValues({ ...editValues, [setting.key]: e.target.value })
                  }
                  className="mt-2 w-full resize-none rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark"
                />
              ) : (
                <input
                  type="text"
                  value={editValues[setting.key] || ""}
                  onChange={(e) =>
                    setEditValues({ ...editValues, [setting.key]: e.target.value })
                  }
                  className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary-dark focus:ring-1 focus:ring-primary-dark"
                />
              )}
              {hasChanged && (
                <div className="mt-3 flex items-center gap-2">
                  <button
                    onClick={() => saveSetting(setting.key)}
                    disabled={saving === setting.key}
                    className="rounded-full bg-primary-dark px-5 py-1.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark/90 disabled:opacity-50"
                  >
                    {saving === setting.key ? "Saving..." : "Save"}
                  </button>
                  <button
                    onClick={() =>
                      setEditValues({ ...editValues, [setting.key]: setting.value })
                    }
                    className="text-sm text-text-secondary hover:text-foreground"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
