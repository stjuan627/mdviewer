import { describe, expect, it } from 'vitest';
import { buildImageExportPlan, getImageSliceOffsets, getMaxSafeCanvasHeight } from '@/lib/export-image';

describe('getImageSliceOffsets', () => {
  it('returns one slice for content shorter than the safe slice height', () => {
    expect(getImageSliceOffsets(900, 1200)).toEqual([0]);
  });

  it('returns a slice offset for each additional image segment', () => {
    expect(getImageSliceOffsets(3200, 1000)).toEqual([0, 1000, 2000, 3000]);
  });

  it('returns an empty array for invalid dimensions', () => {
    expect(getImageSliceOffsets(0, 1000)).toEqual([]);
    expect(getImageSliceOffsets(1000, 0)).toEqual([]);
  });
});

describe('getMaxSafeCanvasHeight', () => {
  it('returns a positive safe height for common export widths', () => {
    expect(getMaxSafeCanvasHeight(1200)).toBeGreaterThan(0);
  });

  it('returns zero when the render width already exceeds the safe canvas limits', () => {
    expect(getMaxSafeCanvasHeight(20000)).toBe(0);
  });
});

describe('buildImageExportPlan', () => {
  it('keeps normal previews as a single PNG', () => {
    expect(buildImageExportPlan(800, 1400, 2)).toEqual({
      renderScale: 2,
      sliceHeight: 1400,
      sliceOffsets: [0],
    });
  });

  it('splits oversized previews into multiple PNG slices', () => {
    expect(buildImageExportPlan(1200, 12000, 2)).toEqual({
      renderScale: 2,
      sliceHeight: 8192,
      sliceOffsets: [0, 8192],
    });
  });

  it('throws for invalid export dimensions', () => {
    expect(() => buildImageExportPlan(0, 1000, 2)).toThrow('Nothing to export.');
  });
});
