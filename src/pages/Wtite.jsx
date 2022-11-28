import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import {
  asyncEditFirebase,
  asyncPostFirebase,
} from "../app/modules/Firebase/WritePostSlice";
import Button from "../components/Button";

const Wtite = () => {
  const params = useParams();
  const postId = params.id;
  const post = useSelector((state) => state.post.data);
  const writePostFu = (data) => {
    if (postId === undefined) {
      return dispatch(asyncPostFirebase(data));
    } else {
      return dispatch(asyncEditFirebase({ data: data, id: postId }));
    }
  };
  useEffect(() => {
    if (postId === undefined) return;
    setTitle(post.title);
    setText(post.text);
    setId(post.name);
    setHead(post.head);
    setLike(post.like);
    setView(post.view);
    setDate(post.date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [head, setHead] = useState("심심해서");
  const [like, setLike] = useState(0);
  const [view, setView] = useState(0);
  const [date, setDate] = useState(null);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const ip = useSelector((state) => state.ip.value);

  const changeValue = (set, e) => {
    set(e.target.value);
  };

  const sendPost = () => {
    const data = {
      date: date === null ? new Date().getTime() : date,
      head: head,
      ip: ip,
      like: like,
      name: id,
      password: password,
      text: text,
      title: title,
      view: view,
    };
    writePostFu(data).then(() => {
      nav("/board/");
    });
  };

  return (
    <StWtite>
      <h1>글 쓰기</h1>
      <div>
        <select
          value={head}
          onChange={(e) => {
            changeValue(setHead, e);
          }}
        >
          <option value="심심해서">심심해서</option>
          <option value="넣어본">넣어본</option>
          <option value="말머리">말머리</option>
        </select>
        <input
          type="text"
          placeholder="닉네임"
          onChange={(e) => {
            changeValue(setId, e);
          }}
          value={id}
        />
        <input
          type="password"
          placeholder="비밀번호"
          autoComplete="on"
          onChange={(e) => {
            changeValue(setPassword, e);
          }}
          value={password}
        />
      </div>
      <input
        type="text"
        placeholder="글 제목"
        onChange={(e) => {
          changeValue(setTitle, e);
        }}
        value={title}
      />
      <textarea
        rows="10"
        placeholder="글 내용"
        onChange={(e) => {
          changeValue(setText, e);
        }}
        value={text}
      ></textarea>
      <Button
        onClick={(e) => {
          e.preventDefault();
          nav(-1);
        }}
      >
        취소
      </Button>
      <Button
        onClick={(e) => {
          e.preventDefault();
          sendPost();
        }}
      >
        글 쓰기
      </Button>
    </StWtite>
  );
};

const StWtite = styled.form`
  margin: auto;
  max-width: 800px;
  margin-top: 7rem;
  text-align: center;

  h1 {
    text-align: center;
    margin-bottom: 5rem;
  }

  input {
    background-color: inherit;
    border-width: 0 0 1px 0;
    outline: none;
    color: ${({ theme }) => theme.color};
  }

  div {
    display: flex;
    margin-bottom: 2rem;

    select,
    option {
      background-color: ${({ theme }) => theme.backgroundColor};
      color: ${({ theme }) => theme.color};
      margin-right: 2rem;
      padding: 0 1rem;
      border-width: 0 0 1px 0;
      outline: none;
    }

    input {
      display: block;
      margin-right: 2rem;
    }
  }

  > input {
    width: 100%;
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  textarea {
    background-color: inherit;
    color: ${({ theme }) => theme.color};
    width: 100%;
    resize: none;
    margin-bottom: 2rem;
  }

  button {
    margin: 0 1rem;
  }
`;

export default Wtite;
