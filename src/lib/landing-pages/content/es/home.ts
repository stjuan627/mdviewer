export const homeInitialMarkdownEs = `## Visor Markdown online con vista previa en tiempo real

MD Viewer es un **visor markdown online** gratis para abrir cualquier Markdown y verlo como HTML limpio al instante. Si necesitas una herramienta para leer README, RFC o archivos \`.md\`, aquí puedes pegar el contenido y ver el resultado renderizado en tiempo real, con tablas GFM, fórmulas LaTeX, diagramas Mermaid y bloques de código con resaltado de sintaxis.

Si quieres ajustar el contenido, el mismo espacio funciona también como editor ligero. Escribes a la izquierda, ves la vista previa a la derecha y luego copias HTML limpio, exportas PDF o compartes un enlace público. Sin cuenta, sin instalación y sin complicaciones.

## Un visor markdown que respeta el render real

Muchas herramientas para ver Markdown online fallan justo en lo importante: ignoran notas al pie, rompen tablas, muestran LaTeX como texto plano o no renderizan Mermaid. Esta herramienta usa la misma tubería de render para la vista previa, el HTML copiado y la página compartida. Lo que ves en pantalla es exactamente lo que verá quien abra tu enlace.

La vista previa se actualiza mientras pegas o escribes, con la latencia adecuada para mantener la fluidez incluso en documentos largos. Puedes abrir un README extenso con diagramas y ecuaciones y seguir trabajando sin sentir que el editor se ralentiza.

## Compatibilidad completa de renderizado

### GitHub Flavored Markdown (GFM)

Compatibilidad con CommonMark y con las extensiones de GFM que más se usan en documentación real:

- **Tablas** con alineación por columnas
- **Task lists** con \`- [ ]\` y \`- [x]\`
- **Bloques de código** con resaltado según el lenguaje
- **Autolinks** para URLs en bruto
- **Notas al pie** para referencias largas
- **Texto tachado** con \`~~texto~~\`

| Función | Compatible | Nota |
| -------------- | :-------: | ------------------------------ |
| Tablas | Sí | Sintaxis de alineación GFM |
| Task lists | Sí | Casillas visibles en HTML |
| Notas al pie | Sí | Numeración automática |
| Tachado | Sí | \`~~así~~\` |

Pega un README de GitHub y la vista previa lo mostrará como esperas: sin tablas rotas, sin checkboxes perdidos y sin notas al pie muertas.

### Fórmulas LaTeX

Las fórmulas inline como \`$E = mc^2$\` y las ecuaciones en bloque con \`$$ ... $$\` se renderizan con KaTeX. Matrices, sumatorios, integrales y símbolos griegos aparecen correctamente dentro de la vista previa Markdown.

$$
\\int_{0}^{\\infty} e^{-x^2}\\,dx = \\frac{\\sqrt{\\pi}}{2}
$$

Es una buena opción para apuntes académicos, documentación de machine learning, papers cortos y cualquier flujo donde Markdown necesite mostrar matemáticas reales.

### Diagramas Mermaid

Los flowcharts, diagramas de secuencia, diagramas de clases y diagramas de estado se renderizan como SVG dentro de la página. Si copias un bloque Mermaid desde otra documentación, el diagrama aparece en el acto.

\`\`\`mermaid
flowchart LR
  Pegar[Pegar markdown] --> Vista[Vista previa]
  Vista --> Copiar[Copiar HTML]
  Vista --> Compartir[Compartir enlace]
\`\`\`

Los diagramas viajan también con el enlace compartido y siguen viéndose nítidos en cualquier tamaño.

### Imágenes y contenido enriquecido

Las imágenes Markdown se muestran en línea y conservan sus URLs:

![Texto alternativo de ejemplo](https://picsum.photos/600/400)

El HTML copiado mantiene esas referencias y la página compartida las sirve de forma adaptable para móvil. Combinado con código, tablas, ecuaciones y diagramas, la herramienta te permite revisar o enseñar un documento técnico completo sin salir del navegador.

### Atajos de teclado

Cuando sí necesitas editar, puedes hacerlo sin despegar las manos del teclado:

| Atajo | Acción |
| -------------------- | ---------------------------- |
| **Cmd / Ctrl + B** | Negrita |
| **Cmd / Ctrl + I** | Cursiva |
| **Cmd / Ctrl + K** | Insertar enlace |
| **Cmd / Ctrl + E** | Código inline |
| **Cmd / Ctrl + S** | Confirmar borrador / guardar estado |
| **Cmd / Ctrl + /** | Alternar panel de vista previa |
| **Tab / Shift+Tab** | Indentar / desindentar listas |

### Temas de renderizado

Puedes cambiar entre varios temas que combinan color, tipografía y espaciado en un solo estilo visual. El mismo Markdown puede verse como una nota técnica, un texto editorial o una página más académica sin tocar CSS.

- **Esquema de color** para fondo, texto, enlaces, código y citas
- **Familia tipográfica** según el tono del contenido
- **Tamaño de fuente y altura de línea** para lectura cómoda
- **Escala de encabezados** desde un estilo discreto hasta uno más marcado

La elección del tema se conserva entre sesiones y también se aplica en la página pública compartida.

## Qué puedes hacer con este visor markdown online

- **Pegar cualquier Markdown y verlo renderizado** al instante: README, RFC, changelog, agenda o documentación técnica
- **Previsualizar un README antes de subirlo a GitHub**
- **Abrir Markdown que otra persona te envió** sin instalar una app de escritorio
- **Editar en el mismo lugar** cuando detectas algo que quieres corregir
- **Copiar HTML limpio** para un CMS, newsletter o sitio estático
- **Generar un enlace público** con render del lado del servidor
- **Trabajar completamente desde el navegador** hasta que el documento esté listo

## Cómo funciona la vista previa en vivo

1. Pega o escribe Markdown en el panel del editor.
2. La vista previa se renderiza de inmediato con una sola función: GFM, LaTeX, Mermaid, imágenes y código incluidos.
3. Pulsa **Copy HTML** para copiar el mismo HTML que ves en pantalla.
4. Pulsa **Share** para publicar una instantánea con URL estable.

Una sola tubería, una sola salida y sin sorpresas.

## Ejemplo: de Markdown a HTML limpio

\`\`\`ts
import { renderResult } from "@/lib/render";

const { html } = renderResult("# Hola\\n\\nPublica **HTML** limpio en un clic.");
// html es semántico, sanitizado e idéntico a la vista previa
\`\`\`

La misma función \`renderResult\` alimenta la vista previa, el HTML copiado y la página compartida. El HTML del cliente nunca se guarda como fuente autoritativa: los enlaces compartidos siempre se vuelven a renderizar desde el Markdown.

> La idea no era crear otro conversor más. Era tener una herramienta rápida, fiable y fácil de compartir.

## Casos de uso

- Ver un archivo \`.md\` sin abrir una app de Markdown de escritorio
- Revisar cómo quedará un README en GitHub antes de hacer push
- Leer un RFC o una nota de diseño enviada como Markdown bruto
- Comprobar una publicación técnica antes de publicarla
- Ver ecuaciones LaTeX y diagramas Mermaid sin instalar herramientas extra
- Convertir Markdown en HTML limpio para un CMS, un correo o una newsletter
- Compartir una página Markdown renderizada con un enlace público

## Por qué elegir este visor markdown online

- **Gratis y sin registro**
- **GFM + LaTeX + Mermaid + imágenes**, sin recortes
- **Vista previa igual al resultado final**
- **HTML limpio y semántico**
- **Enlaces compartibles** con render del lado del servidor
- **Varios temas visuales**
- **Edición ligera integrada**
- **Páginas compartidas aptas para móvil**
- **Interfaz ligera**, sin distracciones ni rastreo

## Empieza a ver tu Markdown

Sustituye el ejemplo de arriba por tu propio contenido. La vista previa se actualizará en tiempo real con texto, tablas, fórmulas, diagramas e imágenes. Cuando todo se vea bien, copia el HTML o comparte el enlace. Ese es el ciclo completo de este **visor markdown online**: la forma más rápida de probar un render profesional sin instalar nada.

[Más información en mdviewer.net](https://mdviewer.net)
`;
