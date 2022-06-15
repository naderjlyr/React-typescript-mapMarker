import { render, fireEvent, screen } from "@testing-library/react";
import SearchInput from "../../components/SearchInput";
import { Provider } from "react-redux";
import store from "../../features/store";
describe("SearchInput Component", () => {
  test("should display the right search query", () => {
    render(
      <Provider store={store}>
        <SearchInput />
      </Provider>
    );
    const searchBar = screen.getByTestId("search-input") as HTMLInputElement;

    expect(searchBar.value).toBe("");
    fireEvent.change(searchBar, { target: { value: "Textkernel Jobs" } });
    expect(searchBar.value).toBe("Textkernel Jobs");
  });
});
