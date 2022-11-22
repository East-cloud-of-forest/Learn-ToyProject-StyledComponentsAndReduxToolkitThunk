import styled from "styled-components";

const SideBar = () => {
  return (
    <SidebarBackground>
      <StSideBar />
    </SidebarBackground>
  );
};

const SidebarBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.backgroundColor + "80"};
`;

const StSideBar = styled.div`
  background-color: ${({ theme }) => theme.backgroundColor};
  width: 26rem;
  height: 100%;
  box-shadow: 5px 0px 10px ${({ theme }) => theme.shadowColor};
  transition: color, background-color 0.2s;
`;

export default SideBar;
