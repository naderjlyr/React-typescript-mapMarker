import { render, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchInput from "../../components/SearchInput";

describe("SearchInput Component", () => {
  test("should display the right search query", () => {
    render(<SearchInput onSearch={jest.fn()} />);
    const searchBar = screen.getByTestId("search-input") as HTMLInputElement;

    expect(searchBar.value).toBe("");
    fireEvent.change(searchBar, { target: { value: "Textkernel Jobs" } });
    expect(searchBar.value).toBe("Textkernel Jobs");
  });

  test("should trigger the onChange function on click or on Enter press", () => {
    const onSearch = jest.fn();
    render(<SearchInput onSearch={onSearch} />);

    const searchBar = screen.getByTestId("search-input") as HTMLInputElement;
    const searchButton = screen.getByTestId("search-icon");

    expect(searchButton).toBeVisible();
    expect(searchBar.value).toBe("");
    fireEvent.change(searchBar, { target: { value: "value for testing" } });
    userEvent.click(searchButton);
    expect(onSearch).toHaveBeenCalledWith(searchBar.value);
  });
});
