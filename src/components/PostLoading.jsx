import styled from "styled-components";
import Button from "./Button";

const PostLoading = () => {
  return (
    <StPost>
      <PostHeader>
        <div>
          <div></div>
          <div></div>
        </div>
        <div>
          <div></div>
          <p>
            <span></span>
            <span></span>
            <span></span>
          </p>
        </div>
      </PostHeader>
      <hr />
      <PostBody>
        <div></div>
        <br></br>
        <Button size="1.2rem">좋아요 👍</Button>
      </PostBody>
      <PostFooter>
        <Button>수정</Button>
        <Button>삭제</Button>
      </PostFooter>
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
    border-radius: 7px;
  }
  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &:nth-child(1) {
      height: 76px;
      justify-content: flex-start;
      div {
        height: 21px;
        width: 80px;
        background-color: grey;
        opacity: 0.5;
        margin-right: 1rem;
      }
    }
    &:nth-child(2) {
      div {
        height: 21px;
        width: 280px;
        background-color: grey;
        opacity: 0.5;
        margin-right: 1rem;
      }
    }
  }
  p {
    margin: 0;
    span {
      height: 21px;
      width: 280px;
      background-color: grey;
      opacity: 0.5;
      margin-left: 1rem;
      border-radius: 7px;
      width: 70px;
      display: inline-block;
    }
  }
`;

const PostBody = styled.div`
  text-align: left;
  padding: 0 1rem;

  div {
    height: 5rem;
  }

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

export default PostLoading;
