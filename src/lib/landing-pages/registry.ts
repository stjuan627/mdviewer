import { homeLandingPage } from '@/lib/landing-pages/home';
import { markdownToHtmlLandingPage } from '@/lib/landing-pages/markdown-to-html';
import { markdownToImageLandingPage } from '@/lib/landing-pages/markdown-to-image';
import { markdownToPdfLandingPage } from '@/lib/landing-pages/markdown-to-pdf';
import type { LandingPageConfig } from '@/lib/landing-pages/types';
import type { Locale } from '@/lib/i18n';
import { homeLandingPageEs } from '@/lib/landing-pages/es/home';
import { markdownToHtmlLandingPageEs } from '@/lib/landing-pages/es/markdown-to-html';
import { markdownToImageLandingPageEs } from '@/lib/landing-pages/es/markdown-to-image';
import { markdownToPdfLandingPageEs } from '@/lib/landing-pages/es/markdown-to-pdf';
import { homeLandingPageJa } from '@/lib/landing-pages/ja/home';
import { markdownToHtmlLandingPageJa } from '@/lib/landing-pages/ja/markdown-to-html';
import { markdownToImageLandingPageJa } from '@/lib/landing-pages/ja/markdown-to-image';
import { markdownToPdfLandingPageJa } from '@/lib/landing-pages/ja/markdown-to-pdf';
import { homeLandingPageKo } from '@/lib/landing-pages/ko/home';
import { markdownToHtmlLandingPageKo } from '@/lib/landing-pages/ko/markdown-to-html';
import { markdownToImageLandingPageKo } from '@/lib/landing-pages/ko/markdown-to-image';
import { markdownToPdfLandingPageKo } from '@/lib/landing-pages/ko/markdown-to-pdf';
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
  es: {
    home: homeLandingPageEs,
    'markdown-to-html': markdownToHtmlLandingPageEs,
    'markdown-to-image': markdownToImageLandingPageEs,
    'markdown-to-pdf': markdownToPdfLandingPageEs,
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
  ko: {
    home: homeLandingPageKo,
    'markdown-to-html': markdownToHtmlLandingPageKo,
    'markdown-to-image': markdownToImageLandingPageKo,
    'markdown-to-pdf': markdownToPdfLandingPageKo,
  },
};
