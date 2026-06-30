import { markdownToHtmlInitialMarkdownFr } from '@/lib/landing-pages/content/fr/markdown-to-html';
import { buildFaqSchema, buildSoftwareSchema } from '@/lib/landing-pages/shared';
import type { LandingPageConfig, LandingSectionFaqItem } from '@/lib/landing-pages/types';

const markdownToHtmlTitleFr = 'Convertisseur Markdown vers HTML gratuit en ligne | MD Viewer';
const markdownToHtmlDescriptionFr =
  'Convertisseur Markdown vers HTML gratuit pour transformer un fichier .md en HTML propre depuis le navigateur. Collez ou importez votre Markdown, vérifiez l’aperçu et copiez un HTML sémantique pour CMS, email ou application web.';

const markdownToHtmlFaqItemsFr: LandingSectionFaqItem[] = [
  {
    question: 'Ce convertisseur Markdown vers HTML est-il gratuit ?',
    answer:
      'Oui. Vous pouvez utiliser ce convertisseur Markdown vers HTML gratuitement, sans inscription, sans compte et sans limite d’utilisation pour ce workflow dans le navigateur.',
  },
  {
    question: 'Le résultat est-il un HTML propre et sémantique ?',
    answer:
      'Oui. Les titres sortent en `<h1>` à `<h6>`, les listes en `<ul>` et `<ol>`, les tableaux en `<table>` et le code en `<pre><code>`. Le rendu n’ajoute ni classes liées à un framework ni marqueurs d’hydratation.',
  },
  {
    question: 'Puis-je coller le HTML converti dans Notion, Webflow, Ghost ou WordPress ?',
    answer:
      'Oui. Le HTML exporté utilise des balises standard et fonctionne bien dans les blocs HTML ou embeds de Webflow, Ghost et WordPress. Notion accepte aussi souvent le collage direct.',
  },
  {
    question: 'Est-ce adapté aux newsletters ou aux emails ?',
    answer:
      'Oui, comme base propre. Si la destination est un email de production, il vaut mieux ajouter du CSS inline au HTML exporté pour améliorer la compatibilité entre clients de messagerie.',
  },
  {
    question: 'La coloration syntaxique des blocs de code est-elle conservée ?',
    answer:
      'Oui. Les blocs de code avec indication de langage gardent les classes utiles pour appliquer ensuite votre propre thème de coloration syntaxique.',
  },
  {
    question: 'Puis-je importer un fichier `.md` au lieu de coller le texte ?',
    answer:
      'Oui. Le workbench accepte les fichiers `.md`, `.markdown` et texte brut pour convertir du Markdown en HTML à partir d’un fichier local.',
  },
  {
    question: 'Mon Markdown est-il envoyé vers un serveur pendant la conversion ?',
    answer:
      'Non. La conversion Markdown vers HTML se fait localement dans votre navigateur, sauf si vous choisissez vous-même de créer un lien de partage public.',
  },
  {
    question: 'Quelle différence avec Pandoc ou un générateur de site statique ?',
    answer:
      'Pandoc vise surtout les flux CLI et les conversions par lot ; Astro, Hugo ou Eleventy supposent un projet complet. Ce convertisseur Markdown vers HTML répond au besoin ponctuel : ouvrir un onglet, coller du Markdown et repartir avec un HTML prêt à l’emploi.',
  },
  {
    question: 'Puis-je convertir du HTML vers Markdown ici ?',
    answer:
      'Non. Ce flux va dans un seul sens : de Markdown vers HTML. Pour l’inverse, il faut un outil spécialisé de conversion HTML vers Markdown.',
  },
];

export const markdownToHtmlLandingPageFr: LandingPageConfig = {
  locale: 'fr',
  slug: 'markdown-to-html',
  path: '/markdown-to-html',
  prerender: true,
  title: markdownToHtmlTitleFr,
  description: markdownToHtmlDescriptionFr,
  heroTitle: 'Convertisseur Markdown vers HTML',
  heroDescription:
    'Transformez votre Markdown en HTML propre depuis le navigateur. Collez ou importez votre fichier .md, vérifiez l’aperçu et copiez un HTML sémantique prêt pour un CMS, une newsletter ou une application web.',
  initialMarkdown: markdownToHtmlInitialMarkdownFr,
  schema: [
    ...buildSoftwareSchema(
      {
        title: markdownToHtmlTitleFr,
        description: markdownToHtmlDescriptionFr,
        path: '/markdown-to-html',
      },
      [
        'convertisseur markdown html',
        'convertisseur markdown vers html',
        'convertir markdown en html',
        'markdown vers html',
        'md en html',
        'markdown en html',
        'convertir un fichier md en html',
        'html sémantique depuis markdown',
        'readme en html',
        'markdown vers html pour wordpress',
        'markdown vers html pour notion',
      ]
    ),
    ...buildFaqSchema(markdownToHtmlFaqItemsFr),
  ],
  workbenchVariant: {
    exportOptions: ['html'],
  },
  sections: [
    {
      id: 'destinations',
      kicker: 'Où le coller',
      title: 'Comment utiliser le HTML converti dans les outils les plus courants',
      description:
        'Le HTML converti depuis Markdown reste générique et sémantique, mais chaque destination accepte ce contenu à un endroit différent. Voici le guide rapide pour les cas les plus fréquents.',
      columns: 3,
      cards: [
        {
          title: 'Notion',
          description: 'Notion convertit souvent le HTML collé en blocs natifs.',
          items: [
            'Copiez le HTML depuis le workbench.',
            'Collez-le dans une page Notion pour transformer titres, listes, tableaux et code en blocs natifs.',
          ],
        },
        {
          title: 'Webflow',
          description: 'Utilisez un bloc **Embed** pour le HTML brut.',
          items: [
            'Ajoutez un élément Embed à la page.',
            'Collez le HTML converti puis appliquez votre CSS Webflow.',
          ],
        },
        {
          title: 'Ghost',
          description: 'Ghost accepte le HTML via la **HTML card**.',
          items: [
            'Insérez une carte HTML puis collez le balisage converti.',
            'La structure sémantique reste conservée dans la publication finale.',
          ],
        },
        {
          title: 'WordPress',
          description: 'Utilisez le bloc **HTML personnalisé** dans Gutenberg.',
          items: [
            'Ajoutez un bloc HTML personnalisé puis collez le contenu exporté.',
            'Passez en aperçu pour vérifier le rendu des tableaux et des blocs de code.',
          ],
        },
        {
          title: 'Mailchimp / Substack',
          description: 'Ces outils acceptent en général le HTML dans des blocs de code.',
          items: [
            'Collez le HTML dans un bloc HTML ou Code de l’éditeur.',
            'Ajoutez du style inline si vous voulez un rendu plus cohérent selon les clients email.',
          ],
        },
        {
          title: 'Sites statiques et frameworks',
          description: 'Vous pouvez insérer le HTML dans Astro, MDX ou d’autres partials.',
          items: [
            'Enregistrez-le en `.html` ou insérez-le dans un composant.',
            'La structure générée reste prévisible pour laisser votre propre CSS prendre le relais.',
          ],
        },
      ],
    },
    {
      id: 'faq',
      kicker: 'FAQ',
      title: 'Questions fréquentes sur le convertisseur Markdown vers HTML',
      description:
        'Les questions pratiques les plus courantes avant d’utiliser un convertisseur Markdown vers HTML dans le navigateur avec un vrai contenu.',
      faqItems: markdownToHtmlFaqItemsFr,
    },
  ],
};
