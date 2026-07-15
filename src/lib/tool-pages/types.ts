import type { LandingSection } from '@/lib/landing-pages/types';

export type ToolPageSlug = 'markdown-table-generator' | 'html-to-markdown';
export type ToolPagePath = '/markdown-table-generator' | '/html-to-markdown';

export type ToolPageConfig = {
  slug: ToolPageSlug;
  path: ToolPagePath;
  title: string;
  description: string;
  heroTitle: string;
  heroDescription: string;
  schema: Array<Record<string, unknown>>;
  sections: LandingSection[];
  references?: Array<{ label: string; href: string }>;
};
