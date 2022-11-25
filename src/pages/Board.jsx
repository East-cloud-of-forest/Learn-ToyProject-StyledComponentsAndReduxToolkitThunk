import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/Button";

const Board = () => {
  const nav = useNavigate();
  return (
    <StBoard>
      <h1>게시판</h1>
      <Outlet />
      <BorderFooter>
        <Button
          onClick={() => {
            nav("/write");
          }}
        >
          글쓰기
        </Button>
      </BorderFooter>
    </StBoard>
  );
};

const StBoard = styled.main`
  text-align: center;
  padding: 0 1rem;
  max-width: 1200px;
  margin: auto;
  margin-top: 7rem;
`;

const BorderFooter = styled.div`
  display: flex;
  margin-top: 2rem;
  flex-direction: row-reverse;
`;

export default Board;
