import store from "./features/store";
import { Header } from "@textkernel/oneui";
import CardsList from "./components/CardsList";
import MemoizedMap from "./components/LeafletMap";
import "@textkernel/oneui/dist/oneui.min.css";
import "./App.scss";
import { Provider } from "react-redux";
export function App() {
  return (
    <div className="app-container">
      <Header
        className="cm-header"
        logo={{
          link: "/",
          src: "https://www.reshot.com/download/icons/BSFLAQ93J7/reshot-icon-maps-BSFLAQ93J7.svg",
          title: "Jobfeed",
        }}
      ></Header>

      <div className="main-content">
        <CardsList />
        <div className="map-container">
          <MemoizedMap />
        </div>
      </div>
    </div>
  );
}

const AppWrapper = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default AppWrapper;
