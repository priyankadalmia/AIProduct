import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

function createNoopClient(): SupabaseClient {
  const emptyResult = { data: null, error: null };
  const chainable: Record<string, unknown> = {};
  const handler: ProxyHandler<Record<string, unknown>> = {
    get(_, prop) {
      if (prop === "then") {
        return (resolve: (v: typeof emptyResult) => void) => {
          resolve(emptyResult);
          return Promise.resolve(emptyResult);
        };
      }
      return (..._args: unknown[]) => new Proxy(chainable, handler);
    },
  };
  return new Proxy({} as SupabaseClient, {
    get(_, prop) {
      if (prop === "from") {
        return () => new Proxy(chainable, handler);
      }
      return () => new Proxy(chainable, handler);
    },
  });
}

export const supabase: SupabaseClient =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : createNoopClient();
