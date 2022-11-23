import React from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./style/GlobalStyle";
import Router from "./components/Router";
import Darktheme from "./style/Darktheme";
import Lighttheme from "./style/Lighttheme";
import { useSelector } from "react-redux";

function App() {
  const darkTheme = useSelector((state) => state.themeChange.darkTheme);

  return (
    <ThemeProvider theme={darkTheme ? Darktheme : Lighttheme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
