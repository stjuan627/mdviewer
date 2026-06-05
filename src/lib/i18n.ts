import { z } from 'zod';

export const SUPPORTED_LOCALES = ['en', 'zh-cn'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const localeSchema = z.enum(SUPPORTED_LOCALES);

export const localeToLangTag: Record<Locale, string> = {
  en: 'en',
  'zh-cn': 'zh-CN',
};

export function isLocale(value: string | null | undefined): value is Locale {
  return localeSchema.safeParse(value).success;
}

export function normalizeLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname: string) {
  if (pathname === '/zh-cn') {
    return '/';
  }

  if (pathname.startsWith('/zh-cn/')) {
    return pathname.slice('/zh-cn'.length) || '/';
  }

  return pathname || '/';
}

export function getLocaleFromPathname(pathname: string): Locale {
  return pathname === '/zh-cn' || pathname.startsWith('/zh-cn/') ? 'zh-cn' : DEFAULT_LOCALE;
}

export function localizePath(path: string, locale: Locale) {
  const normalizedPath = path === '' ? '/' : path;

  if (locale === DEFAULT_LOCALE) {
    return normalizedPath;
  }

  if (normalizedPath === '/') {
    return `/${locale}/`;
  }

  return `/${locale}${normalizedPath}`;
}

export function swapLocaleInPath(pathname: string, locale: Locale) {
  return localizePath(stripLocalePrefix(pathname), locale);
}

export function resolveCanonicalUrl(path: string, locale: Locale, site?: URL | string) {
  const localizedPath = localizePath(path, locale);

  if (!site) {
    return localizedPath === '/' ? 'https://mdviewer.net' : `https://mdviewer.net${localizedPath}`;
  }

  const base = typeof site === 'string' ? site : site.toString();
  return localizedPath === '/' ? base : new URL(localizedPath, base).toString();
}

export function getAlternateLocaleUrls(path: string, site?: URL | string) {
  return Object.fromEntries(
    SUPPORTED_LOCALES.map((locale) => [locale, resolveCanonicalUrl(path, locale, site)])
  ) as Record<Locale, string>;
}
