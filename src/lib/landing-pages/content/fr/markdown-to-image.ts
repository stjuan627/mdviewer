export const markdownToImageInitialMarkdownFr = `## Markdown en image : transformez un fichier .md en image partageable sans capture d'écran

Ce générateur **Markdown en image** fonctionne dans le navigateur pour les moments où le Markdown brut est trop brouillon à partager et où la capture manuelle prend trop de temps. Collez un README, une note de version, un extrait de code, un diagramme d'architecture, une checklist ou un tableau, puis récupérez un PNG propre à publier sur X, LinkedIn, Slack, Discord, GitHub ou dans des slides. Pour un usage quotidien, ce flux évite les allers-retours entre éditeur, fenêtre de preview et outil de capture.

Si vous cherchez *"Markdown en image"*, *"convertir Markdown en image"*, *"Markdown vers image"*, *"Markdown en PNG"*, *"capture Markdown"* ou une **alternative à Carbon qui comprend le Markdown complet**, ce workflow est fait pour vous.

## Pourquoi convertir du Markdown en image plutôt qu'en HTML ou en PDF ?

[Markdown vers **HTML**](/markdown-to-html) sert à publier dans un environnement qui sait déjà rendre le balisage. [Markdown vers **PDF**](/markdown-to-pdf) sert aux documents que l'on ouvre, fait défiler et archive. Ce rendu en image couvre l'espace entre les deux : fils de discussion, réseaux sociaux, tickets, slides, pages de statut et comptes rendus, quand la personne en face veut juste voir le contenu sans avoir à le restituer elle-même.

Raisons fréquentes d'utiliser un tel outil :

- Publier un extrait propre sur **X, LinkedIn, Bluesky, Threads ou Mastodon** sans exposer les \`# titres\` et les \`*astérisques*\`.
- Partager un résumé de revue de code, une trace d'erreur ou un log dans **Slack, Discord ou Microsoft Teams** sous la forme d'une image unique.
- Joindre un aperçu rendu d'un fichier \`.md\` à une **issue GitHub, un ticket Linear ou une page Notion** pour conserver la mise en forme.
- Remplacer les **captures manuelles** de l'aperçu GitHub, du preview VS Code ou d'un site de documentation par un export propre et répétable.
- Transformer un **bloc de code, un diagramme Mermaid ou une équation LaTeX** en ressource visuelle autonome pour une présentation ou un cours.

C'est souvent par ces termes que les utilisateurs francophones arrivent ici : *Carbon* et *ray.so* sont utiles pour un petit bloc de code, mais ils ne rendent pas du Markdown complet. Pas de tableaux, pas de listes de tâches, pas de maths, pas de Mermaid, pas de citations. Ce convertisseur, si.

## Outil de capture Markdown, sans faire de capture

L'intérêt de ce flux est justement d'arrêter d'utiliser l'outil de capture. Un bon export est un vrai PNG rastérisé à partir de l'aperçu rendu, pas une photo de votre écran :

- L'export lit **directement l'aperçu rendu**, donc les titres, tableaux et blocs de code gardent leur mise en page quel que soit votre zoom.
- Le contenu long sort en **une image haute, ou en plusieurs PNG numérotés** si la page dépasse la limite de rastérisation du canvas.
- L'image est générée en **résolution Retina 2x**, pour garder un texte net sur écrans haute densité, vidéoprojecteurs et fils d'actualité.
- Il n'y a **ni filigrane, ni branding, ni signature** incrustés dans le fichier final.

\`\`\`ts
// L'export PNG lit l'aperçu rendu, pas l'écran
export async function partagerExtrait(markdown: string) {
  const png = await renderToPng(markdown, { theme: 'paper', scale: 2 });
  return png; // une image propre, sans filigrane
}
\`\`\`

## Une alternative à Carbon / ray.so qui parle le Markdown complet

Les outils d'image pour snippets comme Carbon, ray.so ou polacode sont construits autour d'un seul bloc de code. Dès qu'un extrait contient un titre, une liste, un tableau, un paragraphe d'explication ou un diagramme Mermaid, ces outils deviennent trop limités.

Ici, le point de départ est le GitHub Flavored Markdown complet. Une carte exportée peut donc inclure :

- Un **titre** qui introduit l'extrait
- Un **paragraphe explicatif**
- Le **bloc de code avec coloration syntaxique**
- Un **tableau**, une **liste de tâches** ou un **encart**
- Un **diagramme Mermaid** ou une **équation LaTeX**

\`\`\`ts
// Tableaux, code et texte partent ensemble dans l'export
function highlight(snippet: string): string {
  return shiki.codeToHtml(snippet, { lang: 'ts' });
}
\`\`\`

| Fonctionnalité | Carbon / ray.so | Cet outil Markdown en image |
| --- | --- | --- |
| Rendu d'un bloc de code | Oui | Oui |
| Titres, listes, tableaux, citations | Non | Oui |
| Listes de tâches GFM \`- [ ]\` | Non | Oui |
| Maths LaTeX (KaTeX) | Non | Oui |
| Diagrammes Mermaid | Non | Oui |
| Documents Markdown longs | Non | Oui (découpage auto) |
| Filigrane / habillage imposé | Parfois | Aucun |

## Trois thèmes intégrés pour le PNG exporté

L'image reprend le même thème que celui choisi dans l'aperçu. Le style du fichier final correspond donc exactement à ce que vous avez validé à l'écran. Pour garder un rendu **Markdown en PNG** cohérent, trois préréglages sont disponibles dans l'atelier :

- **Paper** : ambiance éditoriale chaude, idéale pour tutoriels, newsletters, notes produit et contenus où le rendu doit sembler soigné plutôt que purement technique.
- **Blueprint** : style technique net et contraste élevé, adapté aux changelogs, RFC et annonces d'ingénierie.
- **Nocturne** : vrai **mode sombre**, optimisé pour les posts riches en code et les cartes de type dev-social.

Choisissez le thème avant l'export ; le PNG rendu correspond à l'aperçu pixel par pixel.

## Ce qui est préservé lors de la conversion Markdown vers PNG

Comme l'export rastérise directement l'aperçu rendu, et non un mode image séparé, tout ce que vous voyez à l'écran se retrouve dans le PNG. C'est ce qui rend cet export plus fiable qu'une capture improvisée :

### GitHub Flavored Markdown

- **Titres** avec un rythme vertical cohérent
- **Tableaux** avec alignement des colonnes
- **Listes de tâches** avec cases \`- [ ]\` et \`- [x]\`
- **Blocs de code** avec coloration syntaxique selon le langage
- **Citations** et encarts
- **Notes de bas de page**, **autolinks** et **texte barré**

### Équations LaTeX

Les formules inline comme \`$E = mc^2$\` et les équations en bloc sont rendues via KaTeX avant la capture, ce qui permet d'exporter un extrait académique en PNG propre sans passer par une capture depuis un lecteur PDF.

$$
\\sigma(x) = \\frac{1}{1 + e^{-x}}
$$

### Diagrammes Mermaid

Les diagrammes de flux et de séquence sont d'abord rendus en SVG net dans l'aperçu, puis rastérisés proprement lors de la génération du PNG :

\`\`\`mermaid
flowchart LR
  Source[Markdown] --> Preview[Aperçu thémé]
  Preview --> Slice[Découpage auto si haut]
  Slice --> PNG[Télécharger .png]
  PNG --> Share[X / Slack / GitHub]
\`\`\`

## Détails de sortie : dimensions, découpage et qualité

Quelques points pratiques sur le PNG obtenu :

- La **largeur** dépend de la colonne d'aperçu, pas de votre viewport. Le rendu est donc plus prévisible qu'une capture de fenêtre.
- Les contenus très hauts sont **découpés automatiquement** en plusieurs fichiers PNG (\`-1.png\`, \`-2.png\`, ...) lorsqu'une seule image dépasserait la limite sûre de rastérisation.
- La **résolution 2x** est adaptée aux écrans Retina et aux réseaux sociaux qui recompresseront ensuite l'image.
- Le **format** reste volontairement limité au PNG. Le JPG ajouterait des artefacts de compression autour du petit texte et du code colorisé, ce qui va à l'encontre d'un bon flux d'export.
- **Confidentialité** : le rendu et la rastérisation se font dans votre navigateur. Le Markdown source et le PNG final ne quittent pas votre appareil sauf création explicite d'un lien de partage.

## Checklist avant export

- [x] Collez votre Markdown ou importez un fichier \`.md\` / \`.markdown\`
- [ ] Choisissez un thème : **Paper** (chaud), **Blueprint** (technique) ou **Nocturne** (sombre)
- [ ] Vérifiez l'espacement autour du code, des tableaux et de Mermaid
- [ ] Confirmez que les équations LaTeX et les emojis s'affichent comme prévu
- [ ] Cliquez sur **Export** dans l'en-tête de l'atelier, puis choisissez **Image (PNG)**
- [ ] Si l'aperçu est très haut, attendez-vous à plusieurs PNG numérotés
- [ ] Déposez le fichier dans X, LinkedIn, Slack, Discord, GitHub ou vos slides

Remplacez cet exemple par votre propre contenu Markdown, changez de thème et exportez dès que l'aperçu correspond au rendu que vous voulez publier.
`;
