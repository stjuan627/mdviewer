import { homeLandingPage } from '@/lib/landing-pages/home';
import { markdownToPdfLandingPage } from '@/lib/landing-pages/markdown-to-pdf';
import { markdownViewerLandingPage } from '@/lib/landing-pages/markdown-viewer';
import type { LandingPageConfig } from '@/lib/landing-pages/types';

export const landingPageConfigs: Record<LandingPageConfig['slug'], LandingPageConfig> = {
  home: homeLandingPage,
  'markdown-viewer': markdownViewerLandingPage,
  'markdown-to-pdf': markdownToPdfLandingPage,
};
