export const markdownToPdfInitialMarkdownEs = `## Markdown a PDF para convertir .md en PDF desde el navegador

Este **convertidor markdown a pdf** gratis funciona en una sola pestaña del navegador. Pega un README, una propuesta, una minuta de reunión, un RFC o un texto académico y exporta un PDF limpio sin instalar Pandoc, wkhtmltopdf, Typora ni ninguna app de escritorio. La vista previa que ves es la misma que se exporta al PDF.

Si buscabas *"markdown a pdf"*, *"convertir markdown a pdf"*, *"md a pdf online"* o *"exportar markdown a pdf"*, esta es la secuencia pensada para esa tarea: pegar, revisar y exportar.

## ¿Por qué convertir Markdown a PDF?

Markdown es cómodo para escribir y versionar, pero PDF sigue siendo el formato que más gente espera recibir. Clientes, revisores, profesores y equipos suelen querer un archivo terminado que puedan abrir, anotar, imprimir y archivar. Esta herramienta cierra ese último paso.

Razones comunes para exportar Markdown como PDF:

- **Compartir un documento pulido** sin pedir al lector un visor Markdown
- **Imprimir propuestas, notas o documentación**
- **Archivar especificaciones técnicas** o RFC
- **Entregar trabajos académicos** en el formato que suelen pedir las plataformas educativas
- **Enviar un documento limpio** con tablas, código, fórmulas y diagramas
- **Generar un CV o una carta** desde una fuente Markdown
- **Convertir un README de GitHub** en un documento imprimible
- **Pasar actas o agendas** a un PDF fácil de reenviar

## Cómo funciona el convertidor Markdown a PDF

El flujo tiene tres pasos y se queda dentro del navegador:

1. **Pegar Markdown** o subir un archivo \`.md\`
2. **Revisar la vista previa renderizada** con títulos, tablas, código, fórmulas y diagramas
3. **Exportar PDF** desde el botón principal del editor

Como la exportación usa el motor nativo de impresión a PDF del navegador, la tipografía y el layout se parecen a lo que ya aprobaste en la vista previa.

| Paso | Acción | Resultado |
| --- | --- | --- |
| 1 | Pegar o subir Markdown | Vista previa en vivo |
| 2 | Revisar el layout | Validación antes de exportar |
| 3 | Pulsar Export PDF | Archivo PDF paginado |

## Qué se renderiza correctamente en el PDF

Muchas herramientas online fallan justo en las tablas, el código, las fórmulas o Mermaid. Esta herramienta mantiene esas piezas y las lleva al archivo final:

### GitHub Flavored Markdown (GFM)

- **Encabezados** con jerarquía consistente
- **Tablas** con alineación de columnas
- **Task lists** con \`- [ ]\` y \`- [x]\`
- **Bloques de código** con resaltado según lenguaje
- **Autolinks**
- **Notas al pie**
- **Texto tachado**

\`\`\`ts
function convertMarkdownToPdf(markdown: string): Promise<Blob> {
  const html = renderMarkdown(markdown);
  return browser.printToPdf(html);
}
\`\`\`

### Fórmulas LaTeX

Las fórmulas inline y en bloque se renderizan con KaTeX y llegan limpias al PDF:

$$
\\int_{0}^{\\infty} e^{-x^2}\\,dx = \\frac{\\sqrt{\\pi}}{2}
$$

### Diagramas Mermaid

Los flowcharts y diagramas de secuencia se renderizan como SVG nítido antes de entrar en el PDF:

\`\`\`mermaid
flowchart LR
  MD[Markdown] --> Preview[Vista previa]
  Preview --> PDF[Exportar PDF]
  PDF --> Send[Enviar]
\`\`\`

### Citas, destacados y tipografía

> La vista previa y el PDF nacen de la misma tubería de render. No existe un "modo PDF" separado que cambie el resultado.

Las citas, el texto en énfasis y el código inline también se conservan.

## Markdown a PDF frente a otras herramientas

| Herramienta | Requiere instalación | Vista previa | GFM + LaTeX + Mermaid | Coste |
| --- | --- | --- | --- | --- |
| **Este convertidor** | No | Sí | Sí | Gratis |
| Pandoc | Sí | No | Parcial | Gratis |
| wkhtmltopdf | Sí | No | No | Gratis |
| Typora | Sí | Sí | Sí | De pago |
| VS Code + extensión | Sí | Sí | Parcial | Gratis |

Para una exportación puntual, un **convertidor markdown a pdf** en el navegador suele ser el camino más rápido.

## Checklist final antes de exportar

- [x] Pega o sube tu Markdown
- [ ] Revisa espaciado, tablas y bloques de código
- [ ] Comprueba fórmulas LaTeX y Mermaid
- [ ] Pulsa **Export PDF**
- [ ] Elige tamaño de papel y márgenes en el diálogo de impresión
- [ ] Guarda el PDF y compártelo

Sustituye este ejemplo por tu propio contenido y empieza a usar este **convertidor markdown a pdf**.
`;
