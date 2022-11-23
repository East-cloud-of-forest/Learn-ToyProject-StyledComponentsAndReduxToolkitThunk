import styled from "styled-components";

const Main = () => {
  return (
    <StMain>
      <h1>
        Styled Components 와 Redux Toolkit Thunk 를 학습하기 위해 만든
        토이프로젝트로
      </h1>
      <h1>Firebase 와 연동한 CRUD 게시판 입니다.</h1>
    </StMain>
  );
};

const StMain = styled.main`
  margin-top: 7rem;
  text-align: center;

  h1 {
    font-size: 2rem;
    font-family: "S-CoreDreaml";
    margin: 1rem 0;
    font-weight: 500;
  }
`;

export default Main;
