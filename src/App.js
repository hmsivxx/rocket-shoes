import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import "./config/ReactotronConfig";

import GlobalStyle from "./styles/global";
import Routes from "./routes";
import Header from "./components/Header";
import store from "./store";

function Test({ children }) {
  console.log("PAssei por aqui");
  return <div>{children}</div>;
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />

        <Routes />
        <GlobalStyle />
      </BrowserRouter>
    </Provider>
  );
}

export default App;