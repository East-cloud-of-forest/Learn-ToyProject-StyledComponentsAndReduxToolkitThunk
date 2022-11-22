import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './style/GlobalStyle';
import Header from './components/Header';
import Router from './components/Router';
import Darktheme from './style/Darktheme';
import Lighttheme from './style/Lighttheme';

function App() {
  const [darkTheme, SetDarkTheme] = useState(true)

  return (
    <ThemeProvider theme={darkTheme?Darktheme:Lighttheme}>
      <GlobalStyle darkTheme={darkTheme} />
      <Header SetDarkTheme={SetDarkTheme} darkTheme={darkTheme} />
      <Router />
    </ThemeProvider>
  );
}

export default App;
