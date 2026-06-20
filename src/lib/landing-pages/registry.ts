import { homeLandingPage } from '@/lib/landing-pages/home';
import { markdownToHtmlLandingPage } from '@/lib/landing-pages/markdown-to-html';
import { markdownToImageLandingPage } from '@/lib/landing-pages/markdown-to-image';
import { markdownToPdfLandingPage } from '@/lib/landing-pages/markdown-to-pdf';
import type { LandingPageConfig } from '@/lib/landing-pages/types';
import type { Locale } from '@/lib/i18n';
import { homeLandingPageJa } from '@/lib/landing-pages/ja/home';
import { markdownToHtmlLandingPageJa } from '@/lib/landing-pages/ja/markdown-to-html';
import { markdownToImageLandingPageJa } from '@/lib/landing-pages/ja/markdown-to-image';
import { markdownToPdfLandingPageJa } from '@/lib/landing-pages/ja/markdown-to-pdf';
import { homeLandingPageZhCn } from '@/lib/landing-pages/zh-cn/home';
import { markdownToHtmlLandingPageZhCn } from '@/lib/landing-pages/zh-cn/markdown-to-html';
import { markdownToImageLandingPageZhCn } from '@/lib/landing-pages/zh-cn/markdown-to-image';
import { markdownToPdfLandingPageZhCn } from '@/lib/landing-pages/zh-cn/markdown-to-pdf';

export const landingPageConfigs: Record<Locale, Record<LandingPageConfig['slug'], LandingPageConfig>> = {
  en: {
    home: homeLandingPage,
    'markdown-to-html': markdownToHtmlLandingPage,
    'markdown-to-image': markdownToImageLandingPage,
    'markdown-to-pdf': markdownToPdfLandingPage,
  },
  'zh-cn': {
    home: homeLandingPageZhCn,
    'markdown-to-html': markdownToHtmlLandingPageZhCn,
    'markdown-to-image': markdownToImageLandingPageZhCn,
    'markdown-to-pdf': markdownToPdfLandingPageZhCn,
  },
  ja: {
    home: homeLandingPageJa,
    'markdown-to-html': markdownToHtmlLandingPageJa,
    'markdown-to-image': markdownToImageLandingPageJa,
    'markdown-to-pdf': markdownToPdfLandingPageJa,
  },
};
