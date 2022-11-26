import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import Modal from "./Modal";

const SideBar = ({ openSide, setOpenSide }) => {
  const nav = useNavigate();
  const onClicknav = (url) => {
    nav(url);
    setOpenSide(!openSide);
  };

  return (
    <Modal
      open={openSide}
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
    </Modal>
  );
};

const StSideBar = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.backgroundColor};
  width: 26rem;
  height: 100%;
  box-shadow: 5px 0px 10px ${({ theme }) => theme.shadowColor};
  transition: color, background-color 0.2s;
  transform-origin: left;
  transform: ${({ openSide }) => (openSide ? "translate(0%, 0%)" : "translate(-100%, 0%)")};
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
