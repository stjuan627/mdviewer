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
      es: 'Paper',
      'zh-cn': 'Paper',
      ja: 'Paper',
      ko: 'Paper',
    },
    summary: {
      en: 'Warm editorial',
      es: 'Editorial cálido',
      'zh-cn': '温暖排版',
      ja: '暖かいエディトリアル',
      ko: '따뜻한 편집 스타일',
    },
  },
  {
    id: 'blueprint',
    label: {
      en: 'Blueprint',
      es: 'Blueprint',
      'zh-cn': 'Blueprint',
      ja: 'Blueprint',
      ko: 'Blueprint',
    },
    summary: {
      en: 'Crisp technical',
      es: 'Técnico nítido',
      'zh-cn': '清晰技术风',
      ja: '鮮明なテクニカル',
      ko: '선명한 기술 문서 스타일',
    },
  },
  {
    id: 'nocturne',
    label: {
      en: 'Nocturne',
      es: 'Nocturne',
      'zh-cn': 'Nocturne',
      ja: 'Nocturne',
      ko: 'Nocturne',
    },
    summary: {
      en: 'Dark reading',
      es: 'Lectura en oscuro',
      'zh-cn': '深色阅读',
      ja: 'ダークリーディング',
      ko: '다크 읽기 모드',
    },
  },
];
