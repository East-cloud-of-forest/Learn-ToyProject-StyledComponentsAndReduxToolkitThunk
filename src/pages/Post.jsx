import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { loginPostFirebase } from "../app/api/Firebase";
import {
  asyncDeleteFirebase,
  asyncGetOneFirebase,
  asyncPostAddLikeFirebase,
} from "../app/modules/Firebase/GetPostDataSlice";
import Button from "../components/Button";
import Modal from "../components/Modal";

const Post = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const post = useSelector((state) => state.post.data);
  useEffect(() => {
    dispatch(asyncGetOneFirebase(params.id));
  }, [dispatch, params.id]);
  const addLike = () => {
    dispatch(asyncPostAddLikeFirebase({ id: params.id, like: post.like }));
  };

  // 수정 삭제 시 비밀번호 입력 모달 여닫기
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(null);
  const [failLogin, setFailLogin] = useState(false);
  const [loginMode, setLoginMode] = useState(null);
  const closeLogin = () => {
    setModalOpen(!modalOpen);
    setTimeout(() => {
      setPassword("");
      setFailLogin(false);
      setLoginMode(null);
    }, 300);
  };
  // 비밀번호 입력시 검증
  const loginFirebasePost = async () => {
    setFailLogin(false);
    const result = await loginPostFirebase(params.id, password);
    if (result) {
      // 삭제인지 수정인지 판단
      if (loginMode === "delete") {
        dispatch(asyncDeleteFirebase(params.id)).then(() => {
          nav("/board");
        });
      } else if (loginMode === "edit") {
        nav("/write/" + params.id);
      }
    } else {
      setFailLogin(!result);
    }
  };

  return (
    <StPost>
      <PostHeader>
        <div>
          <h4>
            <span>[{post.head}]</span> {post.title}
          </h4>
        </div>
        <div>
          <p>
            {post.name} <span>({post.ip})</span> | <span>{new Date(+post.date).toLocaleString()}</span>
          </p>
          <p>
            <span>조회수 {post.view}</span>
            <span>좋아요 {post.like}</span>
            <span>댓글 </span>
          </p>
        </div>
      </PostHeader>
      <hr />
      <PostBody>
        {post.text}
        <br></br>
        <Button
          size="1.2rem"
          onClick={() => {
            addLike();
          }}
        >
          좋아요 👍
        </Button>
      </PostBody>
      <PostFooter>
        <Button
          onClick={() => {
            setModalOpen(!modalOpen);
            setLoginMode("edit");
          }}
        >
          수정
        </Button>
        <Button
          onClick={() => {
            setModalOpen(!modalOpen);
            setLoginMode("delete");
          }}
        >
          삭제
        </Button>
      </PostFooter>
      <hr />
      <Modal
        open={modalOpen}
        onClick={() => {
          closeLogin();
        }}
        center
      >
        <Login
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <input
            type="password"
            autoComplete="on"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div>
            <Button
              onClick={(e) => {
                e.preventDefault();
                closeLogin();
              }}
            >
              취소
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                loginFirebasePost();
              }}
            >
              확인
            </Button>
            {failLogin && <span>비밀번호가 맞지 않습니다.</span>}
          </div>
        </Login>
      </Modal>
    </StPost>
  );
};

const StPost = styled.div`
  hr {
    margin: 2rem 0;
    height: 1px;
    border: 0;
    background-color: ${({ theme }) => theme.color};
    opacity: 0.3;
  }
`;

const PostHeader = styled.div`
  width: 100%;
  div {
    display: flex;
    justify-content: space-between;
  }
  h4 {
    font-size: 1.2rem;
    align-items: center;
    display: flex;
    span {
      font-size: 0.95rem;
      margin-right: 1rem;
      opacity: 0.7;
    }
  }
  p {
    margin: 0;
    &:nth-child(1) {
      span {
        font-size: 0.9rem;
        &:nth-child(1) {
          opacity: 0.7;
        }
      }
    }
    &:nth-child(2) {
      span {
        margin-left: 0.5rem;
        padding-right: 0.5rem;
        border-right: 1px solid;
        &:last-child {
          border: none;
        }
      }
    }
  }
`;

const PostBody = styled.div`
  text-align: left;
  padding: 0 1rem;

  button {
    display: block;
    margin: auto;
    padding: 1.5rem;
    margin-top: 3rem;
  }
`;

const PostFooter = styled.div`
  text-align: right;
  button {
    margin: 0 0.5rem;
  }
`;

const Login = styled.form`
  width: 270px;
  height: 150px;
  background-color: ${({ theme }) => theme.backgroundColor};
  border: 1px solid;
  border-radius: 7px;
  cursor: default;
  box-sizing: border-box;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  input {
    background-color: inherit;
    border-width: 0 0 1px 0;
    outline: none;
    color: ${({ theme }) => theme.color};
    text-align: center;
  }
  div {
    display: flex;
    justify-content: space-around;
    width: 100%;
    position: relative;
    span {
      position: absolute;
      bottom: -75%;
      font-size: 0.8rem;
      color: red;
      animation: error 0.5s;
    }
    @keyframes error {
      0% {
        transform: translate(0%, 0%);
      }
      15% {
        transform: translate(-10%, 0%);
      }
      30% {
        transform: translate(10%, 0%);
      }
      45% {
        transform: translate(-10%, 0%);
      }
      60% {
        transform: translate(10%, 0%);
      }
      75% {
        transform: translate(-10%, 0%);
      }
      90% {
        transform: translate(10%, 0%);
      }
      100% {
        transform: translate(0%, 0%);
      }
    }
  }
`;

export default Post;
