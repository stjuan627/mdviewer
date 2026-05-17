import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const A4_WIDTH_MM = 210;
const A4_HEIGHT_MM = 297;
const PAGE_MARGIN_MM = 12;

export function getPdfPageSliceOffsets(totalHeightPx: number, pageHeightPx: number) {
  if (totalHeightPx <= 0 || pageHeightPx <= 0) {
    return [];
  }

  const offsets: number[] = [];
  let currentOffset = 0;

  while (currentOffset < totalHeightPx) {
    offsets.push(currentOffset);
    currentOffset += pageHeightPx;
  }

  return offsets;
}

async function waitForImages(root: HTMLElement) {
  const images = Array.from(root.querySelectorAll('img'));

  await Promise.all(
    images.map((image) => {
      if (image.complete) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve) => {
        const cleanup = () => {
          image.removeEventListener('load', cleanup);
          image.removeEventListener('error', cleanup);
          resolve();
        };

        image.addEventListener('load', cleanup, { once: true });
        image.addEventListener('error', cleanup, { once: true });
      });
    })
  );
}

async function waitForFonts() {
  if (typeof document === 'undefined' || !('fonts' in document)) {
    return;
  }

  await document.fonts.ready;
}

function createPageCanvas(sourceCanvas: HTMLCanvasElement, startY: number, pageHeightPx: number) {
  const pageCanvas = document.createElement('canvas');
  const pageHeight = Math.min(pageHeightPx, sourceCanvas.height - startY);

  pageCanvas.width = sourceCanvas.width;
  pageCanvas.height = pageHeight;

  const context = pageCanvas.getContext('2d');

  if (!context) {
    throw new Error('Failed to create a PDF page canvas.');
  }

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
  context.drawImage(
    sourceCanvas,
    0,
    startY,
    sourceCanvas.width,
    pageHeight,
    0,
    0,
    pageCanvas.width,
    pageCanvas.height
  );

  return pageCanvas;
}

export async function exportElementToPdf(element: HTMLElement, filename = 'mdviewer-export.pdf') {
  await Promise.all([waitForFonts(), waitForImages(element)]);

  const canvas = await html2canvas(element, {
    backgroundColor: '#ffffff',
    scale: Math.max(2, window.devicePixelRatio || 1),
    useCORS: true,
    allowTaint: false,
    logging: false,
  });

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pageWidthMm = A4_WIDTH_MM - PAGE_MARGIN_MM * 2;
  const pageHeightMm = A4_HEIGHT_MM - PAGE_MARGIN_MM * 2;
  const pageHeightPx = Math.floor((canvas.width * pageHeightMm) / pageWidthMm);
  const pageOffsets = getPdfPageSliceOffsets(canvas.height, pageHeightPx);

  if (pageOffsets.length === 0) {
    throw new Error('Nothing to export.');
  }

  pageOffsets.forEach((offsetY, index) => {
    if (index > 0) {
      pdf.addPage();
    }

    const pageCanvas = createPageCanvas(canvas, offsetY, pageHeightPx);
    const pageHeightForPdfMm = (pageCanvas.height * pageWidthMm) / pageCanvas.width;

    pdf.addImage(
      pageCanvas.toDataURL('image/png'),
      'PNG',
      PAGE_MARGIN_MM,
      PAGE_MARGIN_MM,
      pageWidthMm,
      pageHeightForPdfMm,
      undefined,
      'FAST'
    );
  });

  pdf.save(filename);
}
