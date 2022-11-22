import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
  ${({ theme }) => `
      background-color: ${theme.backgroundColor};
      color: ${theme.color};
    `}
  transition: color, background-color 0.2s
}

button {
  &:hover {
    background-color: ${({ theme }) => theme.hoverColor};
  }
}
`;

export default GlobalStyle;
