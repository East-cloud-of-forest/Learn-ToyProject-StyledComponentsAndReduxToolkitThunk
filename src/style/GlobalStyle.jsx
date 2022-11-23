import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'S-CoreDream';
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

:root {
  ${({ theme }) => `
      background-color: ${theme.backgroundColor};
      color: ${theme.color};
    `}
  transition: color, background-color 0.2s;
}

* {
  font-family: 'S-CoreDreaml';
}

ul {
  list-style: none;
  padding: 0;
}

button {
  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }
}
`;

export default GlobalStyle;
