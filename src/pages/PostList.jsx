import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  asyncGetAddAllFirebase,
  asyncGetAllFirebase,
} from "../app/modules/FirebaseSlice";
import Button from "../components/Button";

const PostList = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.Firebase);
  useEffect(() => {
    dispatch(asyncGetAllFirebase());
  }, [dispatch]);
  const addList = () => {
    dispatch(asyncGetAddAllFirebase({ start: state.start, size: 5 }));
  };

  return (
    <StPostList>
      <table>
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
          {state.board.map((x) => (
            <tr key={x.id}>
              <td>{x.data.head}</td>
              <td>
                <span
                  onClick={() => {
                    nav("/board/" + x.id);
                  }}
                >
                  {x.data.title}
                </span>
              </td>
              <td>
                <span>{x.data.name}</span>
              </td>
              <td>{x.data.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {state.board.length !== state.counter && (
        <Button
          onClick={() => {
            addList();
          }}
          block
          size='1.2rem'
        >
          ➕ 더보기
        </Button>
      )}
    </StPostList>
  );
};

const StPostList = styled.div`
  width: 100%;
  table {
    width: 100%;
    border-spacing: 0;
  }

  caption {
    display: none;
  }
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
      &:nth-child(1),
      &:nth-child(4) {
        font-size: 0.8rem;
      }
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

  button {
    padding: 1.5rem 0;
    margin-top: 1rem;
  }
`;

export default PostList;
