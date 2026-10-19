import { renderHook, act } from '@testing-library/react';
import { useDebounce } from './useDebounce';
import { vi } from 'vitest';

describe('useDebounce hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('hoãn cập nhật giá trị sau thời gian quy định', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: 'initial', delay: 300 } }
    );

    expect(result.current).toBe('initial');

    // Cập nhật giá trị mới
    rerender({ value: 'updated', delay: 300 });

    // Khi thời gian chưa chạm mốc 300ms, giá trị vẫn là cũ
    act(() => {
      vi.advanceTimersByTime(200); // Đổi từ jest sang vi
    });
    expect(result.current).toBe('initial');

    // Sau khi đủ 300ms, giá trị cập nhật sang mới
    act(() => {
      vi.advanceTimersByTime(100); // Đổi từ jest sang vi
    });
    expect(result.current).toBe('updated');
  });
});