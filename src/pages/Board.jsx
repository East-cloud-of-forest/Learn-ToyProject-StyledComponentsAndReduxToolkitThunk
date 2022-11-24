import { Outlet } from "react-router-dom";
import styled from "styled-components";
import PostList from "../components/PostList";

const Board = () => {
  return (
    <StBoard>
      <h1>게시판</h1>
      <Outlet />
    </StBoard>
  );
};

const StBoard = styled.main`
  margin-top: 7rem;
  text-align: center;
  padding: 0 1rem;
`;

export default Board;
