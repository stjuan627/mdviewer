import { toCanvas } from 'html-to-image';
import { EXPORT_BACKGROUND_COLOR, getExportScale, waitForExportReady } from '@/lib/export-render';

const MAX_CANVAS_DIMENSION_PX = 16_384;
const MAX_CANVAS_AREA_PX = 134_217_728;

export type ImageExportResult = {
  fileCount: number;
};

export type ImageExportPlan = {
  renderScale: number;
  sliceHeight: number;
  sliceOffsets: number[];
};

function getCanvasDimensions(element: HTMLElement) {
  const width = Math.ceil(element.getBoundingClientRect().width);
  const height = Math.ceil(element.scrollHeight);

  return { width, height };
}

export function getImageSliceOffsets(totalHeightPx: number, sliceHeightPx: number) {
  if (totalHeightPx <= 0 || sliceHeightPx <= 0) {
    return [];
  }

  const offsets: number[] = [];
  let currentOffset = 0;

  while (currentOffset < totalHeightPx) {
    offsets.push(currentOffset);
    currentOffset += sliceHeightPx;
  }

  return offsets;
}

export function getMaxSafeCanvasHeight(renderWidthPx: number) {
  if (renderWidthPx <= 0 || renderWidthPx > MAX_CANVAS_DIMENSION_PX || renderWidthPx > MAX_CANVAS_AREA_PX) {
    return 0;
  }

  return Math.floor(Math.min(MAX_CANVAS_DIMENSION_PX, MAX_CANVAS_AREA_PX / renderWidthPx));
}

export function buildImageExportPlan(contentWidthPx: number, contentHeightPx: number, scale = getExportScale()): ImageExportPlan {
  if (contentWidthPx <= 0 || contentHeightPx <= 0 || scale <= 0) {
    throw new Error('Nothing to export.');
  }

  const renderWidthPx = Math.ceil(contentWidthPx * scale);
  const maxSafeCanvasHeightPx = getMaxSafeCanvasHeight(renderWidthPx);

  if (maxSafeCanvasHeightPx <= 0) {
    throw new Error('Preview is too wide to export as PNG.');
  }

  const safeSliceHeightPx = Math.max(1, Math.floor(maxSafeCanvasHeightPx / scale));
  const sliceHeight = Math.min(contentHeightPx, safeSliceHeightPx);
  const sliceOffsets = getImageSliceOffsets(contentHeightPx, sliceHeight);

  if (sliceOffsets.length === 0) {
    throw new Error('Nothing to export.');
  }

  return {
    renderScale: scale,
    sliceHeight,
    sliceOffsets,
  };
}

async function downloadCanvasAsPng(canvas: HTMLCanvasElement, filename: string) {
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, 'image/png');
  });

  const link = document.createElement('a');
  document.body.appendChild(link);

  try {
    if (blob) {
      const objectUrl = URL.createObjectURL(blob);
      link.href = objectUrl;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(objectUrl);
      return;
    }

    link.href = canvas.toDataURL('image/png');
    link.download = filename;
    link.click();
  } finally {
    document.body.removeChild(link);
  }
}

async function captureCanvas(
  element: HTMLElement,
  scale: number,
  width: number,
  height: number,
  totalHeight: number,
  offsetY: number,
  shouldExpandToFullHeight: boolean
) {
  return toCanvas(element, {
    backgroundColor: EXPORT_BACKGROUND_COLOR,
    pixelRatio: scale,
    cacheBust: true,
    skipAutoScale: true,
    includeStyleProperties: [
      'background',
      'background-color',
      'border',
      'border-bottom',
      'border-left',
      'border-radius',
      'border-right',
      'border-spacing',
      'border-top',
      'border-collapse',
      'box-shadow',
      'box-sizing',
      'color',
      'display',
      'font',
      'font-family',
      'font-size',
      'font-style',
      'font-weight',
      'height',
      'line-height',
      'margin',
      'max-height',
      'min-height',
      'overflow',
      'overflow-x',
      'overflow-y',
      'padding',
      'position',
      'table-layout',
      'text-decoration',
      'text-underline-offset',
      'transform',
      'vertical-align',
      'white-space',
      'width',
    ],
    width,
    height,
    style: shouldExpandToFullHeight
      ? {
          width: `${width}px`,
          height: `${totalHeight}px`,
          maxHeight: 'none',
          overflow: 'visible',
          background: EXPORT_BACKGROUND_COLOR,
          scrollBehavior: 'auto',
        }
      : {
          width: `${width}px`,
          height: `${height}px`,
          maxHeight: 'none',
          overflow: 'hidden',
          background: EXPORT_BACKGROUND_COLOR,
          scrollBehavior: 'auto',
          transform: `translateY(-${offsetY}px)`,
          transformOrigin: 'top left',
        },
    filter: (node) => {
      if (!(node instanceof HTMLElement)) {
        return true;
      }

      return !node.classList.contains('pdf-export-overlay');
    },
  });
}

function getImageFilename(index: number, totalFiles: number, filename: string) {
  if (totalFiles === 1) {
    return filename;
  }

  const extensionIndex = filename.lastIndexOf('.');

  if (extensionIndex === -1) {
    return `${filename}-${index + 1}`;
  }

  const basename = filename.slice(0, extensionIndex);
  const extension = filename.slice(extensionIndex);
  return `${basename}-${index + 1}${extension}`;
}

export async function exportElementToImage(element: HTMLElement, filename = 'mdviewer-export.png'): Promise<ImageExportResult> {
  const { width, height } = getCanvasDimensions(element);

  await waitForExportReady(element);

  const plan = buildImageExportPlan(width, height);
  const fileCount = plan.sliceOffsets.length;

  if (fileCount === 1) {
    const canvas = await captureCanvas(
      element,
      plan.renderScale,
      width,
      height,
      height,
      0,
      true
    );
    await downloadCanvasAsPng(canvas, filename);

    return {
      fileCount,
    };
  }

  const sliceHeight = Math.max(1, Math.floor(Math.min(plan.sliceHeight, element.clientHeight || plan.sliceHeight)));
  const sliceOffsets = getImageSliceOffsets(height, sliceHeight);

  for (const [index, offsetY] of sliceOffsets.entries()) {
    const remainingHeight = height - offsetY;
    const canvas = await captureCanvas(
      element,
      plan.renderScale,
      width,
      Math.min(sliceHeight, remainingHeight),
      height,
      offsetY,
      false
    );
    await downloadCanvasAsPng(canvas, getImageFilename(index, sliceOffsets.length, filename));
  }

  return {
    fileCount: sliceOffsets.length,
  };
}
