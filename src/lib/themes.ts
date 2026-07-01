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
      fr: 'Paper',
      es: 'Paper',
      de: 'Paper',
      'zh-cn': 'Paper',
      ja: 'Paper',
      ko: 'Paper',
    },
    summary: {
      en: 'Warm editorial',
      fr: 'Éditorial chaleureux',
      es: 'Editorial cálido',
      de: 'Warme Editorial-Ansicht',
      'zh-cn': '温暖排版',
      ja: '暖かいエディトリアル',
      ko: '따뜻한 편집 스타일',
    },
  },
  {
    id: 'blueprint',
    label: {
      en: 'Blueprint',
      fr: 'Blueprint',
      es: 'Blueprint',
      de: 'Blueprint',
      'zh-cn': 'Blueprint',
      ja: 'Blueprint',
      ko: 'Blueprint',
    },
    summary: {
      en: 'Crisp technical',
      fr: 'Technique net',
      es: 'Técnico nítido',
      de: 'Klare Technik-Ansicht',
      'zh-cn': '清晰技术风',
      ja: '鮮明なテクニカル',
      ko: '선명한 기술 문서 스타일',
    },
  },
  {
    id: 'nocturne',
    label: {
      en: 'Nocturne',
      fr: 'Nocturne',
      es: 'Nocturne',
      de: 'Nocturne',
      'zh-cn': 'Nocturne',
      ja: 'Nocturne',
      ko: 'Nocturne',
    },
    summary: {
      en: 'Dark reading',
      fr: 'Lecture sombre',
      es: 'Lectura en oscuro',
      de: 'Dunkle Leseansicht',
      'zh-cn': '深色阅读',
      ja: 'ダークリーディング',
      ko: '다크 읽기 모드',
    },
  },
];
