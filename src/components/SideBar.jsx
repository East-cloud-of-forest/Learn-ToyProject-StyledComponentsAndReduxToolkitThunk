import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";

const SideBar = ({ openSide, setOpenSide }) => {
  const nav = useNavigate();
  const onClicknav = (url) => {
    nav(url);
    setOpenSide(!openSide);
  };

  return (
    <SidebarBackground
      openSide={openSide}
      onClick={() => setOpenSide(!openSide)}
    >
      <StSideBar openSide={openSide} onClick={(e) => e.stopPropagation()}>
        <div>
          <Button size="1.2rem" onClick={() => setOpenSide(!openSide)}>
            ❌
          </Button>
        </div>
        <ul>
          <li>
            <Button block size="1.2rem" onClick={() => onClicknav("/")}>
              홈
            </Button>
          </li>
          <li>
            <Button block size="1.2rem" onClick={() => onClicknav("/board")}>
              게시판
            </Button>
          </li>
        </ul>
      </StSideBar>
    </SidebarBackground>
  );
};
const SidebarBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  visibility: hidden;
  cursor: pointer;
  background-color: ${({ theme }) =>
    theme.backgroundColor === "#ffffff"
      ? "rgba(0,0,0,0.1)"
      : "rgba(255,255,255,0.1)"};
  ${({ openSide }) =>
    openSide == null
      ? null
      : openSide
      ? "animation: open 0.3s forwards;"
      : "animation: close 0.3s forwards;"};

  @keyframes close {
    0% {
      opacity: 1;
      visibility: visible;
    }
    99% {
      opacity: 0;
      visibility: visible;
    }
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  @keyframes open {
    0% {
      opacity: 0;
      visibility: hidden;
    }
    100% {
      opacity: 1;
      visibility: visible;
    }
  }
`;

const StSideBar = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  width: 26rem;
  height: 100%;
  box-shadow: 5px 0px 10px ${({ theme }) => theme.shadowColor};
  transition: color, background-color 0.2s;
  transform-origin: left;
  transform: ${({ openSide }) => (openSide ? "scale(1, 1)" : "scale(0, 1)")};
  transition: transform 0.3s;
  cursor: default;
  padding: 1rem;
  box-sizing: border-box;

  > div {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;

    ul {
      width: 100%;
      li {
        display: block;
      }
    }
  }
`;

export default SideBar;
