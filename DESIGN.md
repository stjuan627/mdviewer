---
design_tokens:
  colors:
    brand:
      primary: "#2C2421"
      secondary: "#5C544F"
      accent: "#D7C4B2"
    background:
      base: "#FCFBF8"
      surface: "#FFFFFF"
      surface_muted: "#F9F6F0"
      surface_accent: "#FDF6EC"
      sidebar_active: "#F0E5D8"
    text:
      primary: "#2C2421"
      secondary: "#5C544F"
      muted: "#8C847F"
    status:
      success: "#34A853"
      success_bg: "#E8F5E9"
    border:
      subtle: "#EAE0D5"
      medium: "#D7C4B2"
  typography:
    font_family:
      heading: "'Playfair Display', 'Merriweather', serif"
      body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
      mono: "'JetBrains Mono', 'Fira Code', monospace"
    font_size:
      h1: "2.75rem"
      h2: "1.75rem"
      h3: "1.25rem"
      body: "0.9375rem"
      sm: "0.8125rem"
  spacing:
    xs: "4px"
    sm: "8px"
    md: "16px"
    lg: "24px"
    xl: "32px"
    xxl: "64px"
  borders:
    radius:
      sm: "6px"
      md: "8px"
      lg: "12px"
    width:
      thin: "1px"
  shadows:
    sm: "0 1px 2px rgba(44, 36, 33, 0.05)"
    md: "0 4px 12px rgba(44, 36, 33, 0.04), 0 1px 3px rgba(44, 36, 33, 0.02)"
---

# Design System: mdviewer.net

## 1. Overview
mdviewer.net 是一个专为创作者、写作者和开发者设计的在线 Markdown 工作台。
它的视觉核心是**“温暖、专注、无干扰”**（Calm, capable space to write and refine）。
与传统的极客风格 Markdown 编辑器不同，它采用了类似书籍排版的 Serif 标题字体和温暖的奶油色调（Cream/Beige）背景，结合咖啡杯等生活化插画元素，传递出一种放松、沉浸的写作氛围。

## 2. Colors (颜色系统)
- **Base (基础底色)**: 采用暖调奶油白 `#FCFBF8`，避免纯白的刺眼，保护长期写作的视力。
- **Text & Contrast (文本与对比)**: 摒弃纯黑，使用深咖啡色 `#2C2421` 作为主要文字和核心按钮颜色，保持高对比度的同时增加温润感。
- **Accents (点缀色)**: 侧边栏的选中态、卡片的高亮背景使用了温暖的燕麦色/米色（如 `#F0E5D8`, `#FDF6EC`），让视觉层次柔和过渡。

## 3. Typography (排版规范)
- **Headings (标题)**: 必须使用优雅的衬线字体（Serif），赋予产品“文学性”和“正式感”。适用于页面主标题（H1）、模块标题。
- **Body & UI (正文与界面)**: 使用现代无衬线字体（Sans-serif，如 Inter），确保在密集界面中保持极佳的可读性。
- **Editor & Code (编辑器与代码)**: 使用等宽字体（Monospace），行高需设置得当（建议 `1.6` 以上），提供清晰的编辑体验。

## 4. Spacing & Layout (间距与布局)
- 遵循 8px 间距系统。
- 页面留白充足（Generous Whitespace），组件之间（如工作台区域与下方工具卡片之间）应有至少 `64px` 的间距，以营造呼吸感。
- 侧边栏（Sidebar）宽度固定在适中尺寸（约 `260px`），保持视觉稳定。

## 5. Borders & Radius (边框与圆角)
- **Cards & Containers (卡片与容器)**: 采用较柔和的中等圆角（`8px` - `12px`），例如主编辑工作区和功能卡片。
- **Buttons (按钮)**: 采用较小圆角（`6px`），保持操作控件的精致感。
- **Borders (边框)**: 使用极浅的米色边框 `#EAE0D5` 进行区域划分，而不是强烈的线条。

## 6. Shadows & Elevation (阴影与层级)
- 阴影设计极其克制，仅用于主工作区（Workbench Editor Container）和悬浮提示卡片，以极其微弱的透明度（`0.04` - `0.05` 的深棕色阴影）呈现，避免脏乱感，维持页面扁平但有微妙深度的特征。

## 7. Components (核心组件规范)
### Buttons (按钮)
- **Primary**: 深棕色背景 `#2C2421`，白色文字，鼠标悬浮时略微变亮。用于核心转化动作（如 "Export", "Explore All Tools"）。
- **Secondary/Ghost**: 透明背景，文字和边框使用深棕色或次级文字颜色。用于辅助动作。

### Markdown Editor & Preview (编辑器与预览区)
- 必须并排或清晰分隔（使用极细的竖线或深浅背景区分）。
- 编辑器顶部有工具栏（Toolbar），图标需要简洁纤细。
- 预览区的引用块（Blockquote）左侧使用暖米色粗边框和浅色背景，与整体色调呼应。

### Navigation/Sidebar (侧边栏导航)
- 背景与主页面融为一体或仅有极细的分割线。
- 激活项（Active Item）要有清晰的整行圆角背景色（如 `#F0E5D8`）和加深的文字颜色。
- 底部常驻用户信息和折叠按钮。

## 8. Iconography (图标系统)
- 线条图标为主，线段需保持较细（1.5px - 2px），风格现代、圆润。
- 在“更多工具”卡片中，图标可以结合柔和的低饱和度彩色背景色块（如浅绿、浅蓝、浅黄、浅紫），为页面增加适度活力。

## 9. Tone of Voice (文案基调)
- 简洁（Concise）、鼓舞人心（Empowering）、清晰（Clear）。
- 示例："Write, preview, and perfect your Markdown. Fast, clean, and distraction-free."
