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

export type WorkbenchExportOption = 'html' | 'pdf';

export type WorkbenchLandingVariant = {
  exportOptions: WorkbenchExportOption[];
};

export type LandingPageSlug = 'home' | 'markdown-to-pdf';

export type LandingPagePath = '/' | '/markdown-to-pdf';

export type LandingPageConfig = {
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
