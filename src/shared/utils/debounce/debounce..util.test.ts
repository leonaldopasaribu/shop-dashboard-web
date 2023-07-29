import { debounce } from "./debounce.util";

describe("debounce", () => {
  jest.useFakeTimers();

  it("should create debounce", () => {
    expect(debounce).toBeTruthy();
  });

  it("should call debounce with value 4 after the delay", () => {
    const mockDebounce = jest.fn();
    const debouncedFn = debounce(mockDebounce, 1000);

    debouncedFn(1);
    debouncedFn(2);
    debouncedFn(3);
    debouncedFn(4);

    jest.advanceTimersByTime(1000);

    expect(mockDebounce).toHaveBeenCalledWith(4);
  });

  it("should not to call debounce if called within the delay", () => {
    const mockDebounce = jest.fn();
    const debouncedFn = debounce(mockDebounce, 1000);

    debouncedFn(1);
    debouncedFn(2);
    debouncedFn(3);
    debouncedFn(4);

    jest.advanceTimersByTime(500);

    expect(mockDebounce).not.toHaveBeenCalled();
  });
});
