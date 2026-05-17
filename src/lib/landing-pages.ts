import { landingPageConfigs } from '@/lib/landing-pages/registry';

export type {
  LandingPageConfig,
  LandingSection,
  LandingSectionFaqItem,
  LandingSectionList,
  WorkbenchExportOption,
  WorkbenchLandingVariant,
} from '@/lib/landing-pages/types';

export { resolveCanonicalUrl } from '@/lib/landing-pages/shared';

export function getLandingPageConfig(slug: keyof typeof landingPageConfigs) {
  return landingPageConfigs[slug];
}
