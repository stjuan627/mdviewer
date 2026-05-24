import { landingPageConfigs } from '@/lib/landing-pages/registry';
import type { Locale } from '@/lib/i18n';

export type {
  LandingPageConfig,
  LandingSection,
  LandingSectionFaqItem,
  LandingSectionList,
  WorkbenchExportOption,
  WorkbenchLandingVariant,
} from '@/lib/landing-pages/types';

export { getAlternateLocaleUrls, resolveCanonicalUrl } from '@/lib/landing-pages/shared';

export function getLandingPageConfig(
  slug: keyof (typeof landingPageConfigs)['en'],
  locale: Locale
) {
  return landingPageConfigs[locale][slug];
}
