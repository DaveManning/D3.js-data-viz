import { describe, it, expect, beforeEach } from 'vitest';
import { getUrlParam, setUrlParam } from './persist';

describe('url persistence', () => {
  beforeEach(() => {
    window.history.replaceState(null, '', '/');
  });

  it('round-trips a parameter', () => {
    expect(getUrlParam('sel')).toBeNull();
    setUrlParam('sel', 'Pricing');
    expect(getUrlParam('sel')).toBe('Pricing');
  });

  it('removes a parameter when set to null', () => {
    setUrlParam('sel', 'x');
    setUrlParam('sel', null);
    expect(getUrlParam('sel')).toBeNull();
  });

  it('does not add history entries (uses replaceState)', () => {
    const before = window.history.length;
    setUrlParam('sel', 'a');
    setUrlParam('sel', 'b');
    expect(window.history.length).toBe(before);
  });
});
