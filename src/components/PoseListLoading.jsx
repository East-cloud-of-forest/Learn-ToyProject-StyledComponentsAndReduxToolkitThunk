import styled from "styled-components";

const PoseListLoading = () => {
  return (
    <StPoseListLoading>
      <div></div>
    </StPoseListLoading>
  );
};

const StPoseListLoading = styled.div`
  width: 100%;
  height: 424px;
  border-width: 2px 0 1px 0;
  border-style: solid;
  position: relative;

  > div {
    width: 100%;
    height: 53px;
    border-bottom: 1px solid;
  }
`;

export default PoseListLoading;
