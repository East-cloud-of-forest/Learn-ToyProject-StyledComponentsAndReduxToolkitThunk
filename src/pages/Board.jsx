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

  return (
    <StBoard>
      <h1>게시판</h1>
      <PostList>
        <caption>게시글리스트</caption>
        <colgroup>
          <col style={{ width: "10%" }} />
          <col style={{ width: "70%" }} />
          <col style={{ width: "10%" }} />
          <col style={{ width: "10%" }} />
        </colgroup>
        <thead>
          <tr>
            <th scope="col">말머리</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">날짜</th>
          </tr>
        </thead>
        <tbody>
          {board.map((x) => (
            <tr key={x.id}>
              <td>{x.data.head}</td>
              <td>
                <span>{x.data.title}</span>
              </td>
              <td>
                <span>{x.data.name}</span>
              </td>
              <td>{x.data.date}</td>
            </tr>
          ))}
        </tbody>
      </PostList>
    </StBoard>
  );
};

const StBoard = styled.main`
  margin-top: 7rem;
  text-align: center;
  padding: 0 1rem;
`;

const PostList = styled.table`
  max-width: 1200px;
  margin: auto;
  width: 100%;
  border-spacing: 0;

  thead {
    th {
      padding: 1rem 0;
      border-width: 2px 0 1px;
      border-style: solid;
    }
  }
  tbody {
    td {
      padding: 0.5rem 0;
      &:nth-child(2) {
        text-align: left;
      }
      span:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
    tr:last-child td {
      border-bottom: 1px solid;
    }
  }
`;

export default Board;
