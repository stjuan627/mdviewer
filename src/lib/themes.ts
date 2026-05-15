export const THEME_IDS = ['paper', 'blueprint', 'nocturne'] as const;

export type ThemeId = (typeof THEME_IDS)[number];

export const DEFAULT_THEME_ID: ThemeId = 'paper';

export const themeOptions: Array<{
  id: ThemeId;
  label: string;
  summary: string;
}> = [
  {
    id: 'paper',
    label: 'Paper',
    summary: 'Warm editorial',
  },
  {
    id: 'blueprint',
    label: 'Blueprint',
    summary: 'Crisp technical',
  },
  {
    id: 'nocturne',
    label: 'Nocturne',
    summary: 'Dark reading',
  },
];
