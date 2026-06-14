import { resolveElement } from '@/utils/dom';

export interface StoryContent {
  /** Panel heading. */
  heading: string;
  /** One paragraph per line of narrative. */
  lines: string[];
}

/**
 * A narrative panel that sits beside charts to explain the current selection.
 * A custom UI component; pairs with a store so the story updates as a dashboard
 * selection changes.
 */
export function renderStoryPanel(el: HTMLElement | string, content: StoryContent): HTMLElement {
  const target = resolveElement(el);

  const panel = document.createElement('div');
  panel.className = 'viz-story';

  const heading = document.createElement('h3');
  heading.textContent = content.heading;
  panel.append(heading);

  for (const line of content.lines) {
    const p = document.createElement('p');
    p.textContent = line;
    panel.append(p);
  }

  target.replaceChildren(panel);
  return panel;
}
