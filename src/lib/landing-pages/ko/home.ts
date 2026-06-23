import { homeInitialMarkdownKo } from '@/lib/landing-pages/content/ko/home';
import { buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig } from '@/lib/landing-pages/types';

export const homeLandingPageKo: LandingPageConfig = {
  locale: 'ko',
  slug: 'home',
  path: '/',
  prerender: true,
  title: '온라인 마크다운 뷰어 - 실시간 마크다운 미리보기 | MD Viewer',
  description:
    '무료 온라인 마크다운 뷰어입니다. README, .md 파일을 붙여넣기만 하면 GFM, LaTeX 수식, Mermaid 다이어그램을 실시간으로 미리보고, HTML 복사, PDF/PNG 내보내기, 공유 링크 생성까지 할 수 있습니다.',
  heroTitle: '온라인 마크다운 뷰어',
  heroDescription:
    'Markdown을 붙여 넣고 바로 렌더링 결과를 확인하세요. GFM, LaTeX, Mermaid, 코드 하이라이팅을 지원하며 HTML 복사, PDF/PNG 내보내기, 공유 링크 생성까지 한 화면에서 처리할 수 있습니다.',
  initialMarkdown: homeInitialMarkdownKo,
  schema: buildSoftwareSchema(
    {
      title: '온라인 마크다운 뷰어 - 실시간 마크다운 미리보기 | MD Viewer',
      description:
        '무료 온라인 마크다운 뷰어입니다. README, .md 파일을 붙여넣기만 하면 GFM, LaTeX 수식, Mermaid 다이어그램을 실시간으로 미리보고, HTML 복사, PDF/PNG 내보내기, 공유 링크 생성까지 할 수 있습니다.',
      path: '/',
    },
    [
      '온라인 마크다운 뷰어',
      '마크다운 뷰어 사이트',
      '마크다운 미리보기',
      '마크다운 에디터',
      'md 파일 열기',
      'GFM, LaTeX, Mermaid 렌더링',
      'Markdown HTML 복사',
      'PDF 내보내기',
      'PNG 내보내기',
      '마크다운 공유 링크 생성',
    ]
  ),
  workbenchVariant: {
    exportOptions: ['html', 'pdf', 'image'],
  },
  sections: [],
};
