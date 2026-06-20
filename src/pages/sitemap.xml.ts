import type { APIRoute } from 'astro';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES, localizePath, localeToLangTag } from '@/lib/i18n';
import { landingPageConfigs } from '@/lib/landing-pages/registry';
import type { LandingPagePath } from '@/lib/landing-pages/types';

const DEFAULT_SITE_URL = 'https://mdviewer.net';

const publicPaths = Array.from(
  new Set(
    Object.values(landingPageConfigs)
      .flatMap((configsBySlug) => Object.values(configsBySlug))
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

function buildAlternateLinks(path: LandingPagePath, site?: URL) {
  const alternateEntries = [
    ...SUPPORTED_LOCALES.map((locale) => ({
      hreflang: localeToLangTag[locale],
      href: buildAbsoluteUrl(localizePath(path, locale) as LandingPagePath, site),
    })),
    {
      hreflang: 'x-default',
      href: buildAbsoluteUrl(localizePath(path, DEFAULT_LOCALE) as LandingPagePath, site),
    },
  ];

  return alternateEntries
    .map(
      (entry) =>
        `<xhtml:link rel="alternate" hreflang="${escapeXml(entry.hreflang)}" href="${escapeXml(entry.href)}" />`
    )
    .join('');
}

function buildSitemap(paths: LandingPagePath[], site?: URL) {
  const urls = paths
    .map((path) => {
      const location = escapeXml(buildAbsoluteUrl(path, site));
      const alternates = buildAlternateLinks(path, site);
      return `<url><loc>${location}</loc>${alternates}</url>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`;
}

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  return new Response(buildSitemap(publicPaths, site), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
