import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  asyncGetAddAllFirebase,
  asyncGetAllFirebase,
} from "../app/modules/Firebase/GetBoardDataSlice";
import Button from "../components/Button";

const PostList = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state.board);
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
          <col style={{ width: "*" }} />
          <col style={{ width: "15%" }} />
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
          {state.list.map((x) => (
            <tr key={x.id}>
              <td>
                <span>{x.data.head}</span>
              </td>
              <td>
                <div>
                  <div>
                    <div>
                      <span
                        onClick={() => {
                          nav("/board/" + x.id);
                        }}
                      >
                        {x.data.title}
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <div>
                  <div>{x.data.name}</div>
                  <span>({x.data.ip})</span>
                </div>
              </td>
              <td>{x.data.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {state.list.length !== state.counter && (
        <Button
          onClick={() => {
            addList();
          }}
          block
          size="1.2rem"
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
      padding: 0.5rem;

      &:nth-child(1) {
        span {
          font-size: 0.8rem;
          opacity: 0.7;
        }
      }
      &:nth-child(2) {
        > div {
          text-align: left;
          display: flex;
          > div {
            flex: 1;
            width: 1px;
            div {
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
              word-break: break-all;
              span {
                width: 100%;
                &:hover {
                  text-decoration: underline;
                  cursor: pointer;
                }
              }
            }
          }
        }
      }
      &:nth-child(3) {
        > div {
          display: flex;
          flex-direction: row;
          > div {
            width: 128px;
          }
          span {
            font-size: 0.8rem;
            margin-left: 0.5rem;
          }
        }
      }
      &:nth-child(4) {
        font-size: 0.8rem;
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
