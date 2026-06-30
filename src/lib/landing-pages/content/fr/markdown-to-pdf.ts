export const markdownToPdfInitialMarkdownFr = `## Convertir Markdown en PDF directement dans votre navigateur

Ce **convertisseur Markdown en PDF** gratuit fonctionne dans un seul onglet de navigateur. Collez un README, une proposition commerciale, un compte rendu, une RFC ou un document académique, puis exportez un PDF propre sans installer Pandoc, wkhtmltopdf, Typora ni aucune autre application de bureau. La prévisualisation visible à l'écran est celle qui sert à l'export final, car le rendu et le PDF reposent sur la même chaîne de rendu.

Si vous cherchez *"convertir Markdown en PDF"*, *"Markdown en PDF"*, *"MD en PDF"* ou *"exporter un fichier .md en PDF"*, le flux est conçu pour ce besoin précis : coller, vérifier, exporter. Pas de compte, pas d'installation, pas d'envoi automatique vers un serveur tiers.

## Pourquoi convertir Markdown en PDF ?

Markdown est parfait pour rédiger, versionner et collaborer, mais le PDF reste le format qu'on envoie réellement. Clients, relecteurs, enseignants, recruteurs et équipes attendent un document final qu'ils peuvent ouvrir sans lecteur Markdown, annoter dans leur outil habituel, imprimer et archiver. Convertir Markdown en PDF permet de faire ce dernier passage sans refaire toute la mise en page.

Cas d'usage fréquents pour convertir Markdown en PDF :

- **Partager un document propre** que tout le monde peut ouvrir sans visualiseur Markdown
- **Imprimer des notes de version, propositions ou factures** avec des sauts de page prévisibles
- **Archiver des spécifications techniques** ou des RFC dans un format stable
- **Déposer un devoir, un mémoire ou un rapport** quand la plateforme exige un PDF
- **Envoyer un document lisible** avec tableaux, code, formules et diagrammes dans un seul fichier
- **Créer un CV ou une lettre de motivation** à partir d'une source Markdown
- **Transformer un README GitHub en document imprimable** tout en gardant tableaux GFM, listes de tâches et code coloré
- **Diffuser des comptes rendus et ordres du jour** dans un PDF simple à transférer

## Comment fonctionne le convertisseur Markdown en PDF

Le processus se résume à trois étapes et reste dans votre navigateur du début à la fin :

1. **Collez votre Markdown** ou importez un fichier \`.md\`
2. **Vérifiez le rendu** des titres, listes, tableaux, blocs de code, formules et diagrammes
3. **Exportez le PDF** depuis le bouton **Export PDF** du workbench

Comme l'export utilise le moteur d'impression PDF natif du navigateur, la typographie, les sauts de page et les polices intégrées restent proches de ce que vous avez validé dans la prévisualisation.

| Étape | Action | Résultat |
| --- | --- | --- |
| 1 | Coller ou importer du Markdown | Prévisualisation rendue en direct |
| 2 | Contrôler la mise en page | Validation des titres, tableaux et blocs de code |
| 3 | Cliquer sur Export PDF | Fichier PDF paginé à télécharger |

## Ce qui est bien restitué dans le PDF

Beaucoup d'outils de conversion Markdown en PDF échouent justement sur les points qui comptent : tableaux déformés, code sans coloration syntaxique, formules affichées en texte brut ou diagrammes Mermaid absents. Ce convertisseur gère les éléments attendus d'un bon rendu Markdown et les conserve dans le PDF :

### GitHub Flavored Markdown (GFM)

Prise en charge de CommonMark et des extensions GFM les plus utiles :

- **Titres** avec hiérarchie cohérente sur plusieurs pages
- **Tableaux** avec alignement des colonnes
- **Listes de tâches** avec \`- [ ]\` et \`- [x]\`
- **Blocs de code** avec coloration syntaxique selon le langage
- **Liens automatiques** pour les URL brutes
- **Notes de bas de page** pour les citations longues
- **Texte barré** avec \`~~texte~~\`

\`\`\`ts
// Les blocs de code gardent leur coloration dans le PDF exporté
function convertMarkdownToPdf(markdown: string): Promise<Blob> {
  const html = renderMarkdown(markdown);
  return browser.printToPdf(html);
}
\`\`\`

### Formules mathématiques LaTeX

Les formules en ligne comme \`$E = mc^2$\` et les équations affichées sont rendues via KaTeX puis exportées proprement :

$$
\\int_{0}^{\\infty} e^{-x^2}\\,dx = \\frac{\\sqrt{\\pi}}{2}
$$

Pratique pour convertir Markdown en PDF quand vous préparez des notes de cours, une documentation ML ou un document technique.

### Diagrammes Mermaid

Les organigrammes, diagrammes de séquence et diagrammes d'état sont rendus en SVG net dans la prévisualisation puis restent lisibles dans le PDF :

\`\`\`mermaid
flowchart LR
  MD[Markdown source] --> Preview[Prévisualisation]
  Preview --> PDF[Export PDF]
  PDF --> Send[Envoi]
\`\`\`

### Citations, encadrés et typographie

> La prévisualisation et le PDF viennent du même moteur de rendu. Il n'existe pas de "mode PDF" séparé qui change la mise en forme au dernier moment.

Les citations, l'emphase, le \`code\` en ligne et la typographie enrichie restent présents après conversion.

## Markdown en PDF face aux autres outils

| Outil | Installation requise | Prévisualisation | GFM + LaTeX + Mermaid | Coût |
| --- | --- | --- | --- | --- |
| **Ce convertisseur** | Non | Oui | Oui | Gratuit |
| Pandoc | Oui | Non | Partiel | Gratuit |
| wkhtmltopdf | Oui | Non | Non | Gratuit |
| Typora | Oui | Oui | Oui | Payant |
| VS Code + extension | Oui | Oui | Partiel | Gratuit |
| MS Word "Enregistrer en PDF" | Oui | Partielle | Pas de Markdown natif | Payant |

Pour une exportation ponctuelle, convertir Markdown en PDF dans le navigateur reste souvent le chemin le plus rapide.

## Vérification finale avant export

- [x] Collez ou importez votre Markdown
- [ ] Vérifiez les espacements, tableaux et blocs de code
- [ ] Contrôlez le rendu des formules LaTeX et des diagrammes Mermaid
- [ ] Cliquez sur **Export PDF** dans le workbench
- [ ] Choisissez le format de papier et les marges dans la boîte d'impression
- [ ] Enregistrez le PDF puis envoyez-le

Remplacez cet exemple par votre propre contenu pour commencer à convertir Markdown en PDF.
`;
