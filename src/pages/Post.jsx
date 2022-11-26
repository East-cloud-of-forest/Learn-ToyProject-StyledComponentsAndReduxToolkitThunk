import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { asyncGetOneFirebase } from "../app/modules/FirebaseSlice";
import Button from "../components/Button";

const Post = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.Firebase.post);
  useEffect(() => {
    dispatch(asyncGetOneFirebase(params.id));
  }, [dispatch, params.id]);

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
            {post.name} <span>({post.ip})</span> | <span>{post.date}</span>
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
        <Button size="1.2rem">좋아요 버튼</Button>
      </PostBody>
      <hr />
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

export default Post;
