import { z } from 'zod';

export const SUPPORTED_LOCALES = ['en', 'zh-cn', 'ja', 'ko'] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const localeSchema = z.enum(SUPPORTED_LOCALES);

export const localeMetadata: Record<
  Locale,
  {
    langTag: string;
    label: string;
    shortLabel: string;
  }
> = {
  en: {
    langTag: 'en',
    label: 'English',
    shortLabel: 'EN',
  },
  'zh-cn': {
    langTag: 'zh-CN',
    label: '简体中文',
    shortLabel: '中',
  },
  ja: {
    langTag: 'ja',
    label: '日本語',
    shortLabel: 'JA',
  },
  ko: {
    langTag: 'ko',
    label: '한국어',
    shortLabel: 'KO',
  },
};

export const localeToLangTag: Record<Locale, string> = Object.fromEntries(
  Object.entries(localeMetadata).map(([locale, metadata]) => [locale, metadata.langTag])
) as Record<Locale, string>;

const nonDefaultLocales = SUPPORTED_LOCALES.filter((locale) => locale !== DEFAULT_LOCALE);

function normalizePath(pathname: string) {
  if (!pathname) {
    return '/';
  }

  if (pathname === '/') {
    return pathname;
  }

  return pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
}

export function isLocale(value: string | null | undefined): value is Locale {
  return localeSchema.safeParse(value).success;
}

export function normalizeLocale(value: string | null | undefined): Locale {
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname: string) {
  const normalizedPathname = normalizePath(pathname);

  for (const locale of nonDefaultLocales) {
    const prefix = `/${locale}`;

    if (normalizedPathname === prefix) {
      return '/';
    }

    if (normalizedPathname.startsWith(`${prefix}/`)) {
      return normalizedPathname.slice(prefix.length) || '/';
    }
  }

  return normalizedPathname;
}

export function getLocaleFromPathname(pathname: string): Locale {
  const normalizedPathname = normalizePath(pathname);

  for (const locale of nonDefaultLocales) {
    const prefix = `/${locale}`;

    if (normalizedPathname === prefix || normalizedPathname.startsWith(`${prefix}/`)) {
      return locale;
    }
  }

  return DEFAULT_LOCALE;
}

export function localizePath(path: string, locale: Locale) {
  const normalizedPath = normalizePath(path === '' ? '/' : path);

  if (locale === DEFAULT_LOCALE) {
    return normalizedPath;
  }

  if (normalizedPath === '/') {
    return `/${locale}`;
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
