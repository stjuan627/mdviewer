import { atom, computed } from 'nanostores';
import { renderResult } from '@/lib/renderer';
import { normalizeMarkdown } from '@/lib/schemas';

export type WorkbenchShareState = {
  isSharing: boolean;
  shareUrl: string | null;
  error: string | null;
};

export type WorkbenchInitState = {
  markdown: string;
  view: MarkdownBoxView;
};

const initialShareState: WorkbenchShareState = {
  isSharing: false,
  shareUrl: null,
  error: null,
};

export const $draftMarkdown = atom('');
export const $markdown = atom('');
export const $view = atom<MarkdownBoxView>('article');
export const $shareState = atom<WorkbenchShareState>(initialShareState);

export const $rendered = computed([$markdown, $view], (markdown, view) => renderResult(markdown, view));

export function hydrateWorkbench(init: WorkbenchInitState) {
  $draftMarkdown.set(init.markdown);
  $markdown.set(init.markdown);
  $view.set(init.view);
  $shareState.set(initialShareState);
}

export function updateDraftMarkdown(markdown: string) {
  $draftMarkdown.set(markdown);
}

export function commitDraftMarkdown() {
  const currentDraft = $draftMarkdown.get();
  const normalized = normalizeMarkdown(currentDraft);

  if (normalized) {
    $markdown.set(normalized);
    return;
  }

  const currentMarkdown = $markdown.get();
  $draftMarkdown.set(currentMarkdown);
}

export function switchWorkbenchView(view: MarkdownBoxView) {
  $view.set(view);
  $shareState.set({ ...initialShareState });
}

export function startShare() {
  $shareState.set({
    isSharing: true,
    shareUrl: null,
    error: null,
  });
}

export function completeShare(shareUrl: string) {
  $shareState.set({
    isSharing: false,
    shareUrl,
    error: null,
  });
}

export function failShare(error: string | null = null) {
  $shareState.set({
    isSharing: false,
    shareUrl: null,
    error,
  });
}
