import { markdownToImageInitialMarkdownKo } from '@/lib/landing-pages/content/ko/markdown-to-image';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const markdownToImageTitleKo = '마크다운 이미지 변환 - 무료 Markdown PNG 생성기';
const markdownToImageDescriptionKo =
  '무료 온라인 마크다운 이미지 변환 도구입니다. 코드, 표, 수식, Mermaid 다이어그램이 포함된 Markdown을 Twitter/X, LinkedIn, Slack, GitHub, 슬라이드에 공유하기 좋은 PNG로 내보내세요. 워터마크도 없고 설치도 필요하지 않습니다.';

const faqItems: LandingSectionFaqItem[] = [
  {
    question: 'Carbon, ray.so, polacode와 무엇이 다른가요?',
    answer:
      'Carbon, ray.so, polacode는 주로 하나의 코드 블록을 이미지로 만드는 도구입니다. 이 마크다운 이미지 변환기는 제목, 표, 작업 목록, 인용문, LaTeX 수식, Mermaid 다이어그램까지 포함한 GitHub Flavored Markdown 전체를 렌더링하고, 그 결과를 PNG로 내보냅니다.',
  },
  {
    question: 'PNG 대신 JPG나 JPEG로 내보낼 수 있나요?',
    answer:
      '아니요. 내보내기는 PNG만 지원합니다. Markdown 콘텐츠에는 작은 글자, 코드 하이라이팅, 표 선처럼 압축 노이즈에 민감한 요소가 많기 때문에 JPG보다 PNG가 더 적합합니다.',
  },
  {
    question: '내보낸 이미지에 워터마크가 들어가나요?',
    answer:
      '아니요. PNG에는 워터마크, 로고, 서명이 들어가지 않습니다. 다운로드되는 이미지는 렌더링된 Markdown 미리보기 그 자체입니다.',
  },
  {
    question: '고해상도 또는 Retina 화면에서도 선명한가요?',
    answer:
      '예. 이미지는 2배 device pixel로 rasterize되므로 고해상도 노트북, 4K 모니터, 발표 슬라이드, 소셜 플랫폼 재압축 후에도 텍스트가 선명하게 보입니다.',
  },
  {
    question: 'Markdown이 아주 길면 어떻게 되나요?',
    answer:
      '단일 캔버스 한계를 넘는 긴 콘텐츠는 mdviewer-export-1.png, mdviewer-export-2.png처럼 번호가 붙은 여러 PNG로 자동 분할됩니다. 긴 README나 변경 로그의 아랫부분이 눈에 띄지 않게 잘리는 문제를 방지해 줍니다.',
  },
  {
    question: '이미지용 테마를 고를 수 있나요?',
    answer:
      '예. 워크벤치에는 Paper, Blueprint, Nocturne 세 가지 테마가 있습니다. 툴바에서 테마를 고르면 PNG도 미리보기와 같은 스타일로 생성됩니다.',
  },
  {
    question: 'Markdown 내용이 서버에 업로드되나요?',
    answer:
      '아니요. Markdown 렌더링과 PNG 생성은 브라우저 안에서 처리됩니다. 사용자가 직접 공유 링크를 만들지 않는 한 원문과 이미지는 기기 밖으로 나가지 않습니다.',
  },
  {
    question: 'Twitter/X, LinkedIn, Slack, GitHub에 올릴 수 있나요?',
    answer:
      '예. PNG는 소셜 플랫폼, 채팅 도구, 이슈 트래커에서 널리 쓰이는 형식입니다. 고해상도 출력이라 일반 화면 캡처보다 재압축에 강하고, 미리보기 영역 기준 너비로 만들어져 의도치 않은 잘림을 줄여 줍니다.',
  },
  {
    question: '코드 구문 강조도 이미지에 유지되나요?',
    answer:
      '예. 펜스 코드 블록은 라이브 미리보기에서 구문 강조가 적용되며, PNG 내보내기는 그 결과를 그대로 담습니다.',
  },
  {
    question: 'LaTeX 수식이나 Mermaid 다이어그램도 이미지로 내보낼 수 있나요?',
    answer:
      '예. KaTeX 수식과 Mermaid 다이어그램은 PNG 생성 전에 미리보기에서 렌더링됩니다. 학술 메모나 아키텍처 흐름도도 별도 스크린샷 없이 하나의 이미지 자산으로 내보낼 수 있습니다.',
  },
];

export const markdownToImageLandingPageKo: LandingPageConfig = {
  locale: 'ko',
  slug: 'markdown-to-image',
  path: '/markdown-to-image',
  prerender: true,
  title: markdownToImageTitleKo,
  description: markdownToImageDescriptionKo,
  heroTitle: '마크다운 이미지 변환기',
  heroDescription:
    'Markdown 렌더링 결과를 바로 PNG로 내보내세요. 코드, 표, LaTeX 수식, Mermaid 다이어그램을 스크린샷 없이 선명한 공유 이미지로 만들 수 있습니다.',
  initialMarkdown: markdownToImageInitialMarkdownKo,
  schema: [
    ...buildSoftwareSchema(
      {
        title: markdownToImageTitleKo,
        description: markdownToImageDescriptionKo,
        path: '/markdown-to-image',
      },
      [
        '마크다운 이미지 변환',
        'Markdown PNG 변환',
        '마크다운 PNG 생성기',
        'Markdown 스크린샷 도구',
        'Carbon 대체 Markdown 도구',
        'ray.so 대체 Markdown 도구',
        '코드 스니펫 이미지',
        'README 이미지 변환',
        'Twitter용 Markdown 이미지',
        'LinkedIn용 Markdown 이미지',
        'Slack용 Markdown 이미지',
        'GitHub 이슈용 Markdown 이미지',
        'LaTeX 수식 Markdown 이미지',
        'Mermaid 다이어그램 Markdown 이미지',
        'Retina Markdown PNG 내보내기',
        '워터마크 없는 Markdown 이미지',
        '다크 모드 Markdown 이미지',
        '긴 Markdown 자동 분할 PNG',
      ]
    ),
    ...buildFaqSchema(faqItems),
  ],
  workbenchVariant: {
    exportOptions: ['image'],
  },
  sections: [
    {
      id: 'faq',
      kicker: 'FAQ',
      title: '마크다운 이미지 변환 자주 묻는 질문',
      description:
        '수동 스크린샷 없이 Markdown을 PNG로 내보내기 전에 사람들이 자주 묻는 질문을 모았습니다.',
      faqItems,
    },
  ],
};