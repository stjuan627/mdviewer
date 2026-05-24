import type { Locale } from '@/lib/i18n';

export const THEME_IDS = ['paper', 'blueprint', 'nocturne'] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export const DEFAULT_THEME_ID: ThemeId = 'paper';

export const themeOptions: Array<{
  id: ThemeId;
  label: Record<Locale, string>;
  summary: Record<Locale, string>;
}> = [
  {
    id: 'paper',
    label: {
      en: 'Paper',
      'zh-cn': 'Paper',
    },
    summary: {
      en: 'Warm editorial',
      'zh-cn': '温暖排版',
    },
  },
  {
    id: 'blueprint',
    label: {
      en: 'Blueprint',
      'zh-cn': 'Blueprint',
    },
    summary: {
      en: 'Crisp technical',
      'zh-cn': '清晰技术风',
    },
  },
  {
    id: 'nocturne',
    label: {
      en: 'Nocturne',
      'zh-cn': 'Nocturne',
    },
    summary: {
      en: 'Dark reading',
      'zh-cn': '深色阅读',
    },
  },
];
