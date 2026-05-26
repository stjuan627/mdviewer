import type { APIRoute } from 'astro';

import { landingPageConfigs } from '@/lib/landing-pages/registry';
import type { LandingPagePath } from '@/lib/landing-pages/types';

const DEFAULT_SITE_URL = 'https://mdviewer.net';

const publicPaths = Array.from(
  new Set(
    Object.values(landingPageConfigs)
      .map((config) => config.path)
      .filter((path): path is LandingPagePath => Boolean(path))
  )
).sort();

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function buildAbsoluteUrl(path: LandingPagePath, site?: URL) {
  const base = site ?? new URL(DEFAULT_SITE_URL);

  if (path === '/') {
    return base.toString();
  }

  return new URL(path, base).toString();
}

function buildSitemap(paths: LandingPagePath[], site?: URL) {
  const urls = paths
    .map((path) => {
      const location = escapeXml(buildAbsoluteUrl(path, site));
      return `<url><loc>${location}</loc></url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`;
}

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  return new Response(buildSitemap(publicPaths, site), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
