import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { asyncGetFirebase } from "../app/modules/FirebaseSlice";

const Board = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetFirebase());
  }, [dispatch]);
  const board = useSelector((state) => state.Firebase.board);
  console.log(board);

  return (
    <StBoard>
      <h1>게시판</h1>
      <ul>
        {board.map((x) => (
          <li key={x.id}>{x.data[1]}</li>
        ))}
      </ul>
    </StBoard>
  );
};

const StBoard = styled.main`
  margin-top: 7rem;
  text-align: center;
`;

export default Board;
