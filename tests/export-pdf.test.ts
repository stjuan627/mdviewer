import { describe, expect, it } from 'vitest';
import { getPdfPageSliceOffsets } from '@/lib/export-pdf';

describe('getPdfPageSliceOffsets', () => {
  it('returns one slice for content shorter than a page', () => {
    expect(getPdfPageSliceOffsets(900, 1200)).toEqual([0]);
  });

  it('returns slice offsets for every additional page', () => {
    expect(getPdfPageSliceOffsets(3200, 1000)).toEqual([0, 1000, 2000, 3000]);
  });

  it('returns an empty array for invalid dimensions', () => {
    expect(getPdfPageSliceOffsets(0, 1000)).toEqual([]);
    expect(getPdfPageSliceOffsets(1000, 0)).toEqual([]);
  });
});
