export interface Store<T> {
  /** Current value. */
  get(): T;
  /** Replace the value and notify subscribers. */
  set(next: T): void;
  /** Subscribe to changes; returns an unsubscribe function. */
  subscribe(listener: (value: T) => void): () => void;
}

/**
 * A minimal reactive store — the shared state that links views in a dashboard.
 * One view writes a selection; subscribed views re-render. No framework, no
 * dependencies.
 */
export function createStore<T>(initial: T): Store<T> {
  let value = initial;
  const listeners = new Set<(value: T) => void>();

  return {
    get: () => value,
    set: (next) => {
      value = next;
      for (const listener of listeners) listener(value);
    },
    subscribe: (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}
