import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./style/GlobalStyle";
import Router from "./components/Router";
import Darktheme from "./style/Darktheme";
import Lighttheme from "./style/Lighttheme";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetIp } from "./app/modules/GetIpSlice";

function App() {
  const darkTheme = useSelector((state) => state.themeChange.darkTheme);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetIp());
  }, [dispatch]);

  return (
    <ThemeProvider theme={darkTheme ? Darktheme : Lighttheme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
}

export default App;
