import { homeLandingPage } from '@/lib/landing-pages/home';
import { markdownToHtmlLandingPage } from '@/lib/landing-pages/markdown-to-html';
import { markdownToImageLandingPage } from '@/lib/landing-pages/markdown-to-image';
import { markdownToPdfLandingPage } from '@/lib/landing-pages/markdown-to-pdf';
import type { LandingPageConfig } from '@/lib/landing-pages/types';

export const landingPageConfigs: Record<LandingPageConfig['slug'], LandingPageConfig> = {
  home: homeLandingPage,
  'markdown-to-html': markdownToHtmlLandingPage,
  'markdown-to-image': markdownToImageLandingPage,
  'markdown-to-pdf': markdownToPdfLandingPage,
};
