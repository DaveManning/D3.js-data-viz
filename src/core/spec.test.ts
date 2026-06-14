import { describe, it, expect } from 'vitest';
import { frame } from './spec';

describe('frame', () => {
  it('emits title only when provided', () => {
    expect(frame({})).toEqual({});
    expect(frame({ title: 'Sales' })).toEqual({ title: 'Sales' });
  });

  it('applies width/height defaults', () => {
    expect(frame({}, { width: 800, height: 400 })).toEqual({ width: 800, height: 400 });
  });

  it('lets explicit options override the defaults', () => {
    expect(frame({ width: 500 }, { width: 800, height: 400 })).toEqual({ width: 500, height: 400 });
  });

  it('omits width/height when neither option nor default is set', () => {
    expect(frame({ title: 'x' })).toEqual({ title: 'x' });
  });
});
