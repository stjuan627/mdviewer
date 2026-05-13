/// <reference types="astro/client" />
/// <reference types="@cloudflare/workers-types" />

declare module 'cloudflare:workers' {
  export const env: CloudflareEnv;
}

declare global {
  interface CloudflareEnv {
    DB: D1Database;
    ASSETS: Fetcher;
  }
}

declare namespace Cloudflare {
  interface Env extends CloudflareEnv {}
}

export {};
