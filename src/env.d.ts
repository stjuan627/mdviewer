/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

declare module 'cloudflare:workers' {
  export const env: CloudflareEnv;
}

declare global {
  interface CloudflareEnv {
    DB: D1Database;
    ASSETS: Fetcher;
    CF_ACCOUNT_ID?: string;
    CF_BROWSER_RUN_API_TOKEN?: string;
  }
}

declare namespace Cloudflare {
  interface Env extends CloudflareEnv {}
}

export {};
