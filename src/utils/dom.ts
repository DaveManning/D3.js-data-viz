/** Resolve a DOM element from an element or a CSS selector, or throw. */
export function resolveElement(el: HTMLElement | string): HTMLElement {
  const target = typeof el === 'string' ? document.querySelector(el) : el;
  if (!target) {
    throw new Error(`No element found for "${String(el)}"`);
  }
  return target as HTMLElement;
}
