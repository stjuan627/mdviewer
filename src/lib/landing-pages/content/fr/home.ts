export const homeInitialMarkdownFr = `## Éditeur Markdown en ligne avec aperçu en direct

MD Viewer est un **éditeur Markdown en ligne** gratuit qui rend n'importe quel Markdown en HTML propre et lisible en temps réel. Collez un README, une RFC, un changelog ou n'importe quel fichier \`.md\` et voyez le rendu immédiatement, avec tableaux GFM, formules LaTeX, diagrammes Mermaid et coloration syntaxique du code, comme sur GitHub ou dans une documentation technique classique.

Besoin d'ajuster la source ? La même interface sert aussi d'éditeur léger : vous tapez à gauche, vous suivez l'aperçu Markdown à droite, puis vous copiez un HTML propre ou partagez un lien public en un clic. Aucun compte, aucune installation, aucune contrainte.

## Un éditeur Markdown en ligne qui respecte vraiment le rendu

Beaucoup d'outils d'affichage Markdown en ligne éludent les points difficiles : notes de bas de page ignorées, tableaux cassés, LaTeX affiché en texte brut ou Mermaid absent. MD Viewer utilise le même pipeline de rendu pour l'aperçu, le HTML copié et la page partagée. Ce que vous voyez dans l'aperçu Markdown est exactement ce que vos lecteurs verront.

L'aperçu en direct se met à jour pendant que vous collez ou saisissez votre contenu, avec un léger différé pour rester fluide sur les longs documents. Déposez un README de plusieurs milliers de mots avec schémas et équations : l'interface reste réactive.

## Prise en charge complète du rendu

### GitHub Flavored Markdown (GFM)

Prise en charge de CommonMark et des extensions GFM que l'on retrouve dans la documentation réelle :

- **Tableaux** avec alignement des colonnes
- **Listes de tâches** avec \`- [ ]\` et \`- [x]\`
- **Blocs de code** avec coloration selon le langage
- **Liens automatiques** pour les URLs brutes
- **Notes de bas de page** pour les références longues
- **Texte barré** avec \`~~texte~~\`

| Fonction | Pris en charge | Note |
| -------------- | :-------: | ------------------------------ |
| Tableaux | oui | Syntaxe d'alignement GFM |
| Listes de tâches | oui | Cases visibles en HTML |
| Notes de bas de page | oui | Numérotation automatique |
| Texte barré | oui | \`~~comme ceci~~\` |

Collez un README GitHub et l'outil le rendra comme attendu : pas de cases manquantes, pas de tableaux cassés, pas de notes mortes.

### Équations LaTeX

Les formules inline comme \`$E = mc^2$\` et les équations en bloc avec \`$$ ... $$\` sont rendues avec KaTeX. Formules, matrices, sommes et symboles grecs s'affichent correctement dans l'aperçu Markdown, sans visualiseur séparé ni capture d'écran :

$$
\\int_{0}^{\\infty} e^{-x^2}\\,dx = \\frac{\\sqrt{\\pi}}{2}
$$

Pratique pour relire des articles académiques, des README orientés machine learning, des notes techniques et tout flux Markdown vers HTML qui a besoin de vraies maths.

### Diagrammes Mermaid

Les organigrammes, diagrammes de séquence, de classes, de Gantt et d'état sont rendus directement en SVG. Collez un bloc Mermaid depuis une autre doc et le diagramme apparaît aussitôt, sans passer par un autre outil :

\`\`\`mermaid
flowchart LR
  Coller[Coller le markdown] --> Apercu[Aperçu en direct]
  Apercu --> Copier[Copier le HTML]
  Apercu --> Partager[Partager le lien]
\`\`\`

Les diagrammes suivent aussi le lien partagé et restent nets à toutes les tailles.

### Images et contenus enrichis

Les images Markdown s'affichent directement à leur résolution native :

![Texte alternatif décrivant l'image](https://picsum.photos/600/400)

L'outil conserve les URLs d'image dans le HTML copié, et la page partagée les sert proprement sur mobile. Avec le code, les tableaux, les maths et les diagrammes, vous pouvez relire et partager un document technique complet sans quitter le navigateur.

### Raccourcis clavier

Quand vous avez besoin de modifier ce que vous consultez, la zone d'édition vous laisse les mains sur le clavier :

| Raccourci | Action |
| -------------------- | ---------------------------- |
| **Cmd / Ctrl + B** | Mettre en gras |
| **Cmd / Ctrl + I** | Mettre en italique |
| **Cmd / Ctrl + K** | Insérer un lien |
| **Cmd / Ctrl + E** | Code inline |
| **Cmd / Ctrl + S** | Valider le brouillon / enregistrer un état |
| **Cmd / Ctrl + /** | Afficher ou masquer l'aperçu |
| **Tab / Shift+Tab** | Indenter / désindenter une liste |

### Thèmes de rendu

Passez d'un thème à l'autre pour changer d'un coup la palette, la typographie et l'espacement. Le même Markdown peut ressembler à une documentation technique, à un essai éditorial, à un article académique ou à une page produit sans toucher au CSS. Chaque thème ajuste :

- **Les couleurs** du fond, du texte, des titres, des liens, du code et des citations
- **La famille de polices** selon le ton du document
- **La taille de police et la hauteur de ligne** pour un rythme de lecture compact ou aéré
- **L'échelle des titres** pour une hiérarchie discrète ou plus marquée

Le thème choisi est conservé entre les sessions et appliqué aussi à la page publique partagée. Vous sélectionnez un style, et le rendu Markdown semble prêt à être publié.

## Ce que vous pouvez faire avec cet éditeur Markdown en ligne

- **Coller n'importe quel Markdown et voir le rendu** : README, RFC, changelog, compte rendu, doc produit
- **Prévisualiser un README GitHub avant de le pousser**
- **Ouvrir le Markdown envoyé par quelqu'un d'autre** et le lire dans une page claire
- **Modifier sur place quand vous repérez une correction à faire**
- **Copier un HTML propre** pour un CMS, une newsletter ou un site statique
- **Créer un lien public** avec rendu côté serveur
- **Tout se fait dans le navigateur** jusqu'au moment où vous décidez de partager

## Comment fonctionne l'aperçu en direct

1. Collez ou tapez votre Markdown dans le panneau d'édition.
2. Le panneau d'aperçu se met à jour immédiatement via une fonction de rendu unique, avec GFM, LaTeX, Mermaid, images et coloration de code.
3. Cliquez sur **Copy HTML** pour récupérer exactement le balisage affiché.
4. Cliquez sur **Share** pour publier un instantané sur une URL stable.

Un seul pipeline, une seule sortie, aucune surprise.

## Exemple : du Markdown à un HTML propre

\`\`\`ts
import { renderResult } from "@/lib/render";

const { html } = renderResult("# Bonjour\\n\\nPubliez un **HTML** propre en un clic.");
// html est assaini, sémantique et identique au panneau d'aperçu
\`\`\`

La même fonction \`renderResult\` alimente l'aperçu, le HTML copié et la page partagée rendue côté serveur. Le HTML client n'est jamais considéré comme canonique : les pages partagées sont toujours rerendues à partir du Markdown sur le serveur.

> L'objectif n'était pas de créer un convertisseur de plus. Il fallait un outil Markdown assez fiable pour devenir un réflexe.

## Cas d'usage

- Lire un fichier \`.md\` envoyé par quelqu'un sans ouvrir d'application de bureau
- Vérifier le rendu d'un README GitHub avant un push
- Lire une RFC, une note de conception ou un ordre du jour reçu en Markdown brut
- Contrôler le rendu d'un article technique avant publication
- Prévisualiser des notes académiques ou de la documentation ML avec de vraies formules LaTeX
- Voir des diagrammes Mermaid sans installer d'outil en local
- Convertir du Markdown en HTML propre pour un CMS, un email ou une newsletter
- Partager une page Markdown rendue via un lien public adapté au mobile

## Pourquoi choisir cet outil Markdown

- **Gratuit, sans inscription**
- **GFM + LaTeX + Mermaid + images**, sans fonctionnalités sacrifiées
- **Aperçu en direct fidèle au résultat final**
- **HTML propre et assaini**, prêt à être collé
- **Liens partageables** avec rendu côté serveur
- **Plusieurs thèmes de rendu** intégrés
- **Édition légère quand il le faut**
- **Pages partagées confortables sur mobile**
- **Interface volontairement légère**, sans barre d'outils surchargée ni suivi inutile

## Commencez à visualiser votre Markdown

Collez votre Markdown ci-dessus pour remplacer cet exemple. L'aperçu Markdown se met à jour à mesure que vous tapez : texte, tableaux, formules, diagrammes et images s'affichent en temps réel. Quand tout vous convient, copiez le HTML ou partagez le lien. C'est toute la boucle de cet **éditeur Markdown en ligne** avec aperçu en direct : ouvrir, relire, corriger et partager sans rien installer.

[En savoir plus sur mdviewer.net](https://mdviewer.net)
`;
