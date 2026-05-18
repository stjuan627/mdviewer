export const EXPORT_BACKGROUND_COLOR = '#ffffff';
export const EXPORT_MIN_SCALE = 2;

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

export async function waitForExportReady(root: HTMLElement) {
  await Promise.all([waitForFonts(), waitForImages(root)]);
}

export function getExportScale() {
  if (typeof window === 'undefined') {
    return EXPORT_MIN_SCALE;
  }

  return Math.max(EXPORT_MIN_SCALE, window.devicePixelRatio || 1);
}
