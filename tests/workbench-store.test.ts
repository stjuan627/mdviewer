import { beforeEach, describe, expect, it } from 'vitest';
import {
  $draftMarkdown,
  $markdown,
  $rendered,
  $shareState,
  commitDraftMarkdown,
  completeShare,
  failShare,
  hydrateWorkbench,
  startShare,
  updateDraftMarkdown,
} from '@/lib/workbench-store';

describe('workbench store', () => {
  beforeEach(() => {
    hydrateWorkbench({
      markdown: '# Hello',
    });
  });

  it('hydrates draft and committed markdown together', () => {
    expect($draftMarkdown.get()).toBe('# Hello');
    expect($markdown.get()).toBe('# Hello');
    expect($shareState.get()).toEqual({
      isSharing: false,
      shareUrl: null,
      error: null,
    });
  });

  it('commits normalized draft into rendered state', () => {
    updateDraftMarkdown('## Updated\r\n\r\nBody\n');
    commitDraftMarkdown();

    expect($markdown.get()).toBe('## Updated\n\nBody');
    expect($rendered.get().html).toContain('Updated');
    expect($rendered.get().html).toContain('Body');
  });

  it('tracks share lifecycle', () => {
    startShare();
    expect($shareState.get()).toEqual({
      isSharing: true,
      shareUrl: null,
      error: null,
    });

    failShare('创建分享失败');
    expect($shareState.get()).toEqual({
      isSharing: false,
      shareUrl: null,
      error: '创建分享失败',
    });

    completeShare('/share/ok');
    expect($shareState.get()).toEqual({
      isSharing: false,
      shareUrl: '/share/ok',
      error: null,
    });
  });
});
