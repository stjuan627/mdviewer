import { markdownToHtmlInitialMarkdownKo } from '@/lib/landing-pages/content/ko/markdown-to-html';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const markdownToHtmlTitleKo = '마크다운 HTML 변환기 - 무료 온라인 MD to HTML 도구';
const markdownToHtmlDescriptionKo =
  '무료 온라인 마크다운 HTML 변환기입니다. .md 파일을 붙여 넣거나 업로드한 뒤 렌더링 미리보기를 확인하고, CMS, 이메일, 웹앱에 바로 넣을 수 있는 깨끗한 HTML을 복사하세요. 설치나 회원가입은 필요 없습니다.';

const faqItems: LandingSectionFaqItem[] = [
  {
    question: '이 변환기는 무료인가요?',
    answer:
      '예. 이 마크다운 HTML 변환기는 회원가입, 계정 생성, 사용량 제한 없이 무료로 사용할 수 있습니다. 마크다운을 붙여 넣고 렌더링 미리보기를 확인한 뒤 HTML을 복사하면 됩니다.',
  },
  {
    question: '출력되는 HTML은 의미론적이고 깨끗한 구조인가요?',
    answer:
      '예. 제목은 `<h1>`부터 `<h6>`까지, 목록은 `<ul>` / `<ol>`, 표는 올바른 `<table>` 마크업으로, 코드는 `<pre><code>`로 렌더링됩니다. 프레임워크 전용 클래스, 하이드레이션 마커, 추적 속성을 포함하지 않아 CMS, 이메일 템플릿, 자체 웹앱에 붙여 넣기 쉽습니다.',
  },
  {
    question: '변환한 HTML을 Notion, Webflow, Ghost, WordPress에 붙여 넣을 수 있나요?',
    answer:
      '예. 출력 HTML은 표준 태그를 사용하므로 대부분의 리치 텍스트 편집기와 CMS가 처리할 수 있습니다. Notion은 붙여 넣은 HTML을 블록으로 변환하고, Webflow, Ghost, WordPress는 HTML embed, HTML card, Custom HTML 블록에서 사용할 수 있습니다.',
  },
  {
    question: '이 HTML을 이메일 뉴스레터에도 사용할 수 있나요?',
    answer:
      '변환된 HTML은 Mailchimp, Substack, Beehiiv, 트랜잭션 메일 템플릿에 넣기 좋은 의미론적 기본 구조입니다. 다만 Outlook이나 Gmail까지 시각적으로 완전히 맞추려면 최종 발송 전에 CSS를 인라인으로 적용해 테스트하는 것이 좋습니다.',
  },
  {
    question: '코드 블록 구문 강조 정보도 유지되나요?',
    answer:
      '예. ```` ```ts ````처럼 언어 힌트가 있는 펜스 코드 블록은 HTML 클래스에도 언어 정보가 남습니다. 따라서 코드를 다시 파싱하지 않고도 자체 CSS 테마로 구문 강조를 적용할 수 있습니다.',
  },
  {
    question: '텍스트를 붙여 넣는 대신 `.md` 파일을 업로드할 수 있나요?',
    answer:
      '예. 워크벤치는 `.md`, `.markdown`, 일반 텍스트 파일 업로드를 지원합니다. 파일을 불러온 뒤 HTML 미리보기를 확인하고, 결과를 복사하거나 `.html` 파일로 다운로드할 수 있습니다.',
  },
  {
    question: '변환 중 Markdown 내용이 서버로 업로드되나요?',
    answer:
      '아니요. 마크다운 HTML 변환은 브라우저에서 로컬로 실행됩니다. 사용자가 직접 공유 링크를 만들지 않는 한 콘텐츠는 기기 밖으로 나가지 않습니다.',
  },
  {
    question: 'Pandoc이나 정적 사이트 생성기와 무엇이 다른가요?',
    answer:
      'Pandoc은 스크립트 기반 일괄 변환에 강한 CLI 도구이고, Astro나 Hugo 같은 정적 사이트 생성기는 프로젝트 설정과 빌드 과정이 필요합니다. 이 도구는 Markdown을 한 번 변환해서 바로 HTML로 가져가는 작업에 특화되어 있습니다. 브라우저에서 Markdown을 붙여 넣고 설치 없이 바로 HTML 조각을 복사할 수 있습니다.',
  },
  {
    question: '여기서 HTML을 Markdown으로 다시 변환할 수도 있나요?',
    answer:
      '아니요. 이 도구는 Markdown에서 HTML로 가는 한 방향 변환 전용입니다. 반대 방향이 필요하다면 HTML to Markdown 전용 도구나 라이브러리를 사용하는 것이 좋습니다. 이 워크플로에서는 Markdown 원본을 그대로 유지하는 방식을 취합니다.',
  },
];

export const markdownToHtmlLandingPageKo: LandingPageConfig = {
  locale: 'ko',
  slug: 'markdown-to-html',
  path: '/markdown-to-html',
  prerender: true,
  title: markdownToHtmlTitleKo,
  description: markdownToHtmlDescriptionKo,
  heroTitle: '마크다운 HTML 변환기',
  heroDescription:
    'Markdown을 붙여 넣거나 .md 파일을 업로드한 뒤, 렌더링 미리보기로 확인하고 깨끗한 HTML을 복사하세요. CMS, 이메일, 위키, 웹앱에 바로 넣기 좋은 의미론적 마크업을 브라우저에서 만듭니다.',
  initialMarkdown: markdownToHtmlInitialMarkdownKo,
  schema: [
    ...buildSoftwareSchema(
      {
        title: markdownToHtmlTitleKo,
        description: markdownToHtmlDescriptionKo,
        path: '/markdown-to-html',
      },
      [
        '마크다운 HTML 변환',
        '마크다운 HTML 변환기',
        'Markdown to HTML',
        'MD HTML 변환',
        'MD HTML 변환기',
        '.md HTML 변환',
        '온라인 Markdown HTML 변환',
        '무료 마크다운 변환기',
        'Markdown HTML 복사',
        'README HTML 변환',
        'GitHub Markdown HTML 변환',
        'GFM HTML 변환',
        '의미론적 HTML 변환',
        '깨끗한 HTML 출력',
        'CMS용 Markdown HTML 변환',
        '이메일용 Markdown HTML 변환',
        'Notion HTML 붙여넣기',
        'WordPress Markdown HTML 변환',
        '브라우저 기반 Markdown HTML 변환',
        '설치 없는 Markdown to HTML',
      ]
    ),
    ...buildFaqSchema(faqItems),
  ],
  workbenchVariant: {
    exportOptions: ['html'],
  },
  sections: [
    {
      id: 'destinations',
      kicker: '붙여넣기 위치',
      title: '변환한 HTML을 자주 쓰는 서비스에 붙여 넣는 방법',
      description:
        '변환 결과는 범용적인 의미론적 HTML입니다. 다만 서비스마다 HTML을 넣는 위치가 조금씩 다르므로 자주 쓰는 목적지별로 정리했습니다.',
      columns: 3,
      cards: [
        {
          title: 'Notion',
          description: 'Notion은 붙여 넣은 HTML을 Notion 블록으로 변환합니다.',
          items: [
            '위 워크벤치에서 HTML을 복사합니다.',
            'Notion 페이지에 붙여 넣으면 제목, 목록, 표, 코드 블록이 Notion 블록으로 변환됩니다.',
          ],
        },
        {
          title: 'Webflow',
          description: '원시 HTML에는 **Embed** 요소를 사용합니다.',
          items: [
            '페이지에 Embed 요소를 배치합니다.',
            '변환한 HTML을 붙여 넣고 기존 Webflow CSS 클래스로 스타일을 맞춥니다.',
          ],
        },
        {
          title: 'Ghost',
          description: 'Ghost 편집기의 **HTML card**를 사용합니다.',
          items: [
            'HTML 카드를 삽입하고 변환한 마크업을 붙여 넣습니다.',
            'Ghost는 게시된 글 안에서도 의미론적 구조를 유지합니다.',
          ],
        },
        {
          title: 'WordPress',
          description: 'Gutenberg의 **Custom HTML** 블록이나 클래식 편집기의 HTML 보기를 사용합니다.',
          items: [
            'Custom HTML 블록을 추가하고 변환한 HTML을 붙여 넣습니다.',
            '미리보기로 전환해 표와 코드 블록이 올바르게 렌더링되는지 확인합니다.',
          ],
        },
        {
          title: 'Mailchimp / Substack',
          description: '대부분의 뉴스레터 도구는 코드 또는 HTML 블록에 붙여 넣은 HTML을 지원합니다.',
          items: [
            '캠페인 편집기의 Code 또는 HTML 블록에 붙여 넣습니다.',
            'Outlook과 Gmail에서도 동일하게 보이도록 하려면 최종 발송 전에 인라인 스타일을 추가해 테스트합니다.',
          ],
        },
        {
          title: '정적 사이트와 프레임워크',
          description: 'HTML을 MDX, Astro, 또는 프레임워크의 부분 템플릿 안에서 사용합니다.',
          items: [
            '`.html` 파일로 저장하거나 컴포넌트 안에 직접 넣습니다.',
            '클래스와 태그 구조가 예측 가능하므로 자체 CSS 테마를 적용하기 쉽습니다.',
          ],
        },
      ],
    },
    {
      id: 'faq',
      kicker: 'FAQ',
      title: '마크다운 HTML 변환기 FAQ',
      description:
        '브라우저 기반 마크다운 HTML 변환기를 실제 콘텐츠에 사용하기 전에 자주 묻는 질문을 정리했습니다.',
      faqItems,
    },
  ],
};
