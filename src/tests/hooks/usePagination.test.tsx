import { act, renderHook } from "@testing-library/react";
import usePagination from "../../hooks/usePagination";

describe("usePagination hook test", () => {
  const items = [
    { id: 1, name: "Spechy" },
    { id: 2, name: "Textkernel" },
  ];

  test("should be defined", () => {
    expect(usePagination).toBeDefined();
  });

  test("renders the hook correctly and checks types", () => {
    const { result } = renderHook(() => usePagination({ items, size: 1 }));
    expect(result.current.current).toBe(1);
    expect(typeof result.current.current).toBe("number");
    expect(typeof result.current.next).toBe("function");
  });

  test("should go to the next page", () => {
    const { result } = renderHook(() => usePagination({ items, size: 1 }));
    act(() => {
      result.current.next();
    });
    expect(result.current.current).toBe(2);
  });
});
