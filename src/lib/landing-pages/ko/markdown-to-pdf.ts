import { markdownToPdfInitialMarkdownKo } from '@/lib/landing-pages/content/ko/markdown-to-pdf';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const markdownToPdfTitleKo = '마크다운 PDF 변환 - 무료 온라인 Markdown PDF 변환기';
const markdownToPdfDescriptionKo =
  '무료 온라인 마크다운 PDF 변환기입니다. .md 파일을 붙여 넣거나 업로드하고, GFM 표와 코드, LaTeX 수식, Mermaid 다이어그램을 미리보기로 확인한 뒤 PDF로 저장하세요. 설치가 필요 없습니다.';

const faqItems: LandingSectionFaqItem[] = [
  {
    question: 'Markdown을 PDF로 변환하려면 프로그램을 설치해야 하나요?',
    answer:
      '아니요. 이 마크다운 PDF 변환기는 브라우저에서 바로 실행됩니다. 데스크톱 앱, CLI, Pandoc, wkhtmltopdf 설정 없이 Markdown을 붙여 넣고 미리보기로 확인한 뒤 Export PDF 버튼을 누르면 됩니다.',
  },
  {
    question: 'Markdown 파일이 서버로 업로드되나요?',
    answer:
      '아니요. Markdown 렌더링과 PDF 내보내기는 모두 브라우저 안에서 처리됩니다. 사용자가 직접 공개 공유 링크를 만들지 않는 한 콘텐츠는 기기 밖으로 나가지 않습니다.',
  },
  {
    question: '저장된 PDF의 텍스트를 선택하고 검색할 수 있나요?',
    answer:
      '예. 내보낸 PDF는 단순 이미지가 아니라 실제 텍스트를 포함합니다. 문장 복사, 주석 달기, 파일 내 전체 검색을 그대로 사용할 수 있습니다.',
  },
  {
    question: '코드 블록 구문 강조도 PDF에 유지되나요?',
    answer:
      '예. 코드 블록의 언어별 구문 강조가 실시간 미리보기에서 보이는 그대로 PDF에 반영됩니다.',
  },
  {
    question: 'LaTeX 수식과 Mermaid 다이어그램도 PDF로 변환할 수 있나요?',
    answer:
      '예. KaTeX로 렌더링된 LaTeX 수식과 Mermaid 다이어그램은 미리보기에서 SVG로 표시되고, PDF로 변환한 뒤에도 선명하게 유지됩니다.',
  },
  {
    question: 'A4, Letter, Legal 같은 용지 크기와 여백을 바꿀 수 있나요?',
    answer:
      '예. Export PDF를 누르면 브라우저 인쇄 대화상자가 열립니다. 그곳에서 A4, Letter, Legal 용지 크기, 방향, 여백 프리셋을 선택한 뒤 PDF로 저장할 수 있습니다.',
  },
  {
    question: '텍스트를 붙여 넣지 않고 .md 파일을 업로드할 수 있나요?',
    answer:
      '예. 워크벤치는 `.md`, `.markdown`, 일반 텍스트 파일 업로드를 지원합니다. 파일을 불러온 뒤 렌더링 결과를 확인하고 PDF로 내보내면 됩니다.',
  },
  {
    question: 'Pandoc, Typora, wkhtmltopdf와 무엇이 다른가요?',
    answer:
      'Pandoc과 wkhtmltopdf는 로컬 설치와 설정이 필요한 CLI 도구이고, Typora는 유료 데스크톱 앱입니다. 이 도구는 무료이며 브라우저에서 실행되고, GFM, LaTeX, Mermaid를 바로 지원합니다. 일회성으로 MD를 PDF로 빠르게 변환해야 할 때 더 부담 없이 사용할 수 있습니다.',
  },
];

export const markdownToPdfLandingPageKo: LandingPageConfig = {
  locale: 'ko',
  slug: 'markdown-to-pdf',
  path: '/markdown-to-pdf',
  prerender: true,
  title: markdownToPdfTitleKo,
  description: markdownToPdfDescriptionKo,
  heroTitle: '마크다운 PDF 변환기',
  heroDescription:
    'Markdown을 붙여 넣거나 .md 파일을 업로드하고, 실시간 미리보기로 확인한 뒤 PDF로 저장하세요. GFM 표, 코드 하이라이팅, LaTeX 수식, Mermaid 다이어그램이 PDF에도 그대로 반영됩니다.',
  initialMarkdown: markdownToPdfInitialMarkdownKo,
  schema: [
    ...buildSoftwareSchema(
      {
        title: markdownToPdfTitleKo,
        description: markdownToPdfDescriptionKo,
        path: '/markdown-to-pdf',
      },
      [
        '마크다운 PDF 변환',
        'MD PDF 변환',
        '마크다운 PDF 저장',
        '마크다운 PDF 변환 사이트',
        'Markdown PDF 변환',
        '.md PDF 내보내기',
        'LaTeX 수식 포함 Markdown PDF 변환',
        'Mermaid 다이어그램 포함 Markdown PDF 변환',
        'GFM Markdown PDF 저장',
        '코드 하이라이팅 PDF 내보내기',
        '브라우저 기반 마크다운 변환기',
        '설치 없는 Markdown to PDF',
      ]
    ),
    ...buildFaqSchema(faqItems),
  ],
  workbenchVariant: {
    exportOptions: ['pdf'],
  },
  sections: [
    {
      id: 'faq',
      kicker: 'FAQ',
      title: '마크다운 PDF 변환 자주 묻는 질문',
      description:
        '브라우저 기반 Markdown PDF 변환기를 사용하기 전에 자주 묻는 내용을 정리했습니다.',
      faqItems,
    },
  ],
};
