import type {
  LandingPageConfig,
  LandingPagePath,
  LandingSectionFaqItem,
} from '@/lib/landing-pages/types';
import type { Locale } from '@/lib/i18n';
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  getAlternateLocaleUrls as buildAlternateLocaleUrls,
  resolveCanonicalUrl as resolveLocalizedCanonicalUrl,
} from '@/lib/i18n';

const canonicalSiteUrl = 'https://mdviewer.net';

function buildAbsoluteUrl(path: LandingPagePath) {
  if (path === '/') {
    return canonicalSiteUrl;
  }

  return `${canonicalSiteUrl}${path}`;
}

export function buildSoftwareSchema(
  config: Pick<LandingPageConfig, 'title' | 'description' | 'path'>,
  featureList: string[]
) {
  const url = buildAbsoluteUrl(config.path);

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'MD Viewer',
      url,
      description: config.description,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'MD Viewer',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url,
      description: config.description,
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      featureList,
    },
  ];
}

export function buildFaqSchema(faqItems: LandingSectionFaqItem[]) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    },
  ];
}

export function resolveCanonicalUrl(path: LandingPagePath, locale: Locale, site?: URL | string) {
  return resolveLocalizedCanonicalUrl(path, locale, site);
}

export function getAlternateLocaleUrls(path: LandingPagePath, site?: URL | string) {
  const alternates = buildAlternateLocaleUrls(path, site);

  return [
    ...SUPPORTED_LOCALES.map((locale) => ({
      locale,
      href: alternates[locale],
    })),
    {
      locale: 'x-default' as const,
      href: alternates[DEFAULT_LOCALE],
    },
  ];
}
