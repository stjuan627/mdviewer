import type { LandingPageConfig, LandingPagePath } from '@/lib/landing-pages/types';

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

export function resolveCanonicalUrl(path: LandingPagePath, site?: URL | string) {
  if (!site) {
    return buildAbsoluteUrl(path);
  }

  const base = typeof site === 'string' ? site : site.toString();

  if (path === '/') {
    return base;
  }

  return new URL(path, base).toString();
}
