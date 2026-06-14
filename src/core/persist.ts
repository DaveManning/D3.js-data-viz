/**
 * URL query-string persistence for dashboard state. Selections live in the URL
 * so a view is shareable and survives reload — no storage, no backend. Writes
 * use `history.replaceState`, so they never add history entries or navigate.
 */

/** Read a query-string parameter, or null if absent. */
export function getUrlParam(name: string): string | null {
  return new URLSearchParams(window.location.search).get(name);
}

/** Set (or, with null/empty, remove) a query-string parameter in place. */
export function setUrlParam(name: string, value: string | null): void {
  const url = new URL(window.location.href);
  if (value === null || value === '') {
    url.searchParams.delete(name);
  } else {
    url.searchParams.set(name, value);
  }
  window.history.replaceState(null, '', url.toString());
}
