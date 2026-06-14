import { describe, it, expect, vi } from 'vitest';
import { createStore } from './store';

describe('createStore', () => {
  it('holds and updates its value', () => {
    const store = createStore(1);
    expect(store.get()).toBe(1);
    store.set(2);
    expect(store.get()).toBe(2);
  });

  it('notifies subscribers on set', () => {
    const store = createStore('a');
    const listener = vi.fn();
    store.subscribe(listener);
    store.set('b');
    expect(listener).toHaveBeenCalledWith('b');
  });

  it('stops notifying after unsubscribe', () => {
    const store = createStore(0);
    const listener = vi.fn();
    const off = store.subscribe(listener);
    store.set(1);
    off();
    store.set(2);
    expect(listener).toHaveBeenCalledTimes(1);
  });
});
