import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDebounce } from "../use-debounce";

describe("useDebounce Hook", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should return initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("initial", 300));
    expect(result.current).toBe("initial");
  });

  it("should debounce value changes after specified delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "first", delay: 300 } }
    );

    expect(result.current).toBe("first");

    // Update value
    rerender({ value: "second", delay: 300 });

    // Should still be old value before timer expires
    expect(result.current).toBe("first");

    // Fast-forward by 150ms (not yet 300ms)
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(result.current).toBe("first");

    // Fast-forward remaining 150ms
    act(() => {
      vi.advanceTimersByTime(150);
    });
    expect(result.current).toBe("second");
  });

  it("should cancel previous timer on rapid value changes", () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      { initialProps: { value: "a" } }
    );

    rerender({ value: "ab" });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    rerender({ value: "abc" });
    act(() => {
      vi.advanceTimersByTime(100);
    });

    rerender({ value: "abcd" });
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Should resolve directly to the latest value "abcd"
    expect(result.current).toBe("abcd");
  });
});
