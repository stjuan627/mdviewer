import type { Locale } from '@/lib/i18n';

export type LandingSectionList = {
  title: string;
  description?: string;
  items: string[];
};

export type LandingSectionFaqItem = {
  question: string;
  answer: string;
};

export type LandingSection = {
  id: string;
  kicker: string;
  title: string;
  description: string;
  columns?: 2 | 3;
  cards?: LandingSectionList[];
  faqItems?: LandingSectionFaqItem[];
};

export type WorkbenchExportOption = 'html' | 'pdf' | 'image';

export type WorkbenchLandingVariant = {
  exportOptions: WorkbenchExportOption[];
};

export type LandingPageSlug = 'home' | 'markdown-to-pdf' | 'markdown-to-html' | 'markdown-to-image';

export type LandingPagePath = '/' | '/markdown-to-pdf' | '/markdown-to-html' | '/markdown-to-image';

export type LandingPageConfig = {
  locale: Locale;
  slug: LandingPageSlug;
  path: LandingPagePath;
  prerender: boolean;
  title: string;
  description: string;
  heroTitle?: string;
  heroDescription?: string;
  initialMarkdown: string;
  schema: Array<Record<string, unknown>>;
  workbenchVariant: WorkbenchLandingVariant;
  sections: LandingSection[];
};
