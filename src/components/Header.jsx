import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import SideBar from "./SideBar";

const Header = ({ SetDarkTheme, darkTheme }) => {
  const [openSide, setOpenSide] = useState(null)

  return (
    <StHeader>
      <Button size="1.5rem" onClick={()=>{setOpenSide(!openSide)}}>📁</Button>
      <Button size="1.5rem">로고</Button>
      <Button
        size="1.5rem"
        onClick={() => {
          SetDarkTheme(!darkTheme);
        }}
      >
        {darkTheme ? "🌝" : "🌚"}
      </Button>
      <SideBar openSide={openSide} setOpenSide={setOpenSide} />
    </StHeader>
  );
};

const StHeader = styled.header`
  backdrop-filter: blur(5px);
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
  box-sizing: border-box;
`;

export default Header;
