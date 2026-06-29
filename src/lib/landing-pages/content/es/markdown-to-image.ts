export const markdownToImageInitialMarkdownEs = `## Markdown a imagen: convierte .md en PNG para compartir sin capturas de pantalla

Esta herramienta de **markdown a imagen** genera PNG limpios a partir de Markdown renderizado. Pega un README, una nota de versión, un fragmento de código, una tabla, una checklist o un diagrama y descárgalo como imagen lista para compartir en X, LinkedIn, Slack, Discord, GitHub o una presentación.

Si llegaste buscando *"markdown a imagen"*, *"markdown a png"*, *"captura markdown"* o una alternativa a Carbon que entienda Markdown completo, este flujo está pensado para eso.

## ¿Por qué convertir Markdown a imagen en lugar de HTML o PDF?

[Markdown a HTML](/markdown-to-html) sirve para publicar. [Markdown a PDF](/markdown-to-pdf) sirve para documentos que alguien leerá, archivará o imprimirá. **Markdown a imagen** sirve para el terreno intermedio: redes sociales, chats, tickets, actualizaciones de estado y diapositivas, donde la otra persona solo necesita ver el contenido sin renderizar nada.

Razones frecuentes para usar este generador:

- Publicar un fragmento pulido en **X, LinkedIn, Bluesky o Threads**
- Compartir un resumen técnico o un error en **Slack, Discord o Teams**
- Adjuntar una instantánea renderizada a un **issue de GitHub** o un ticket
- Sustituir **capturas manuales** del README o de la vista previa de VS Code
- Convertir un **bloque de código, una tabla o un diagrama Mermaid** en un activo visual

## Captura Markdown sin usar la herramienta de recorte

La idea es dejar de depender de capturas manuales. La salida es un PNG rasterizado desde la vista previa renderizada, no una foto de tu pantalla:

- La exportación lee la **vista previa renderizada**, por lo que títulos, tablas y código mantienen su layout.
- El contenido largo puede salir como **una imagen alargada o varias imágenes PNG numeradas** cuando supera el límite del lienzo.
- La imagen se genera a **resolución tipo retina (2x)** para que el texto se vea nítido.
- **No hay marcas de agua ni branding** incrustado en el archivo final.

\`\`\`ts
export async function compartirSnippet(markdown: string) {
  const png = await renderToPng(markdown, { theme: 'paper', scale: 2 });
  return png;
}
\`\`\`

## Una alternativa a Carbon o ray.so que entiende Markdown completo

Herramientas como Carbon, ray.so o polacode están pensadas para un solo bloque de código. En cuanto añades un título, una tabla, una lista o un diagrama, dejan de ser suficientes. Esta herramienta parte de GitHub Flavored Markdown completo, así que una tarjeta puede incluir:

- Un **encabezado** para contextualizar
- Un **párrafo explicativo**
- Un **bloque de código** con resaltado de sintaxis
- Una **tabla**, una lista de tareas o una cita
- Un **diagrama Mermaid** o una **fórmula LaTeX**

\`\`\`ts
function highlight(snippet: string): string {
  return shiki.codeToHtml(snippet, { lang: 'ts' });
}
\`\`\`

| Función | Carbon / ray.so | Esta herramienta |
| --- | --- | --- |
| Bloque de código | Sí | Sí |
| Encabezados, listas, tablas, citas | No | Sí |
| Task lists GFM | No | Sí |
| LaTeX (KaTeX) | No | Sí |
| Mermaid | No | Sí |
| Documentos Markdown largos | No | Sí, con división automática |
| Marca de agua | A veces | No |

## Tres temas integrados para exportar PNG

La imagen hereda el mismo tema que eliges en la vista previa, así que el estilo final coincide con lo que has revisado.

- **Paper**: estilo editorial cálido para tutoriales, newsletters y contenido divulgativo
- **Blueprint**: estilo técnico más nítido para changelogs, RFC y notas de ingeniería
- **Nocturne**: modo oscuro real para piezas con mucho código

## Qué se conserva al convertir Markdown a PNG

Como la exportación rasteriza la misma vista previa, todo lo que ves acaba en el PNG:

### GitHub Flavored Markdown

- **Encabezados**
- **Tablas**
- **Task lists**
- **Bloques de código** con resaltado
- **Blockquotes**
- **Notas al pie**, **autolinks** y **tachado**

### Fórmulas LaTeX

Las fórmulas inline y en bloque se renderizan antes de generar la imagen:

$$
\\sigma(x) = \\frac{1}{1 + e^{-x}}
$$

### Diagramas Mermaid

Los diagramas Mermaid se renderizan primero como SVG y luego pasan al PNG final:

\`\`\`mermaid
flowchart LR
  Fuente[Markdown] --> Preview[Vista previa]
  Preview --> Slice[Auto-slice si es largo]
  Slice --> PNG[Descargar PNG]
  PNG --> Share[Compartir]
\`\`\`

## Detalles de salida: dimensiones, división y calidad

- El **ancho** depende de la columna de vista previa, no del tamaño actual de tu ventana
- El contenido alto se **divide automáticamente** en varias imágenes
- La **resolución 2x** se ve mejor en pantallas retina y tras la recompresión de redes sociales
- El formato es **solo PNG** porque mantiene texto y bordes más limpios que JPG
- La **privacidad** se conserva: render y rasterización ocurren en tu navegador

## Checklist antes de exportar

- [x] Pega Markdown o sube un archivo \`.md\`
- [ ] Elige un tema: **Paper**, **Blueprint** o **Nocturne**
- [ ] Revisa el espaciado de código, tablas y Mermaid
- [ ] Confirma que fórmulas y emojis se ven bien
- [ ] Pulsa **Export** y elige **Image (PNG)**
- [ ] Si el contenido es largo, espera varias PNG numeradas

Sustituye este ejemplo por tu contenido y prueba ya el flujo de **markdown a imagen**.
`;
