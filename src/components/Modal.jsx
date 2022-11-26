import styled from "styled-components";

const Modal = ({ children, open, onClick, center }) => {
  return (
    <ModalBackground open={open} onClick={onClick} center={center}>
      {children}
    </ModalBackground>
  );
};

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  cursor: pointer;
  backdrop-filter: blur(5px);
  z-index: 3;
  ${({ open }) =>
    open == null
      ? 'visibility: hidden;'
      : open
      ? "animation: open 0.3s forwards;"
      : "animation: close 0.3s forwards;"};
  background-color: ${({ theme }) =>
    theme.backgroundColor === "#ffffff"
      ? "rgba(0,0,0,0.1)"
      : "rgba(255,255,255,0.1)"};
  ${({ center }) =>
    center
      ? "display: flex;justify-content: center;align-items: center;"
      : null}

  @keyframes close {
    0% {
      opacity: 1;
      visibility: visible;
    }
    99% {
      opacity: 0;
      visibility: visible;
    }
    100% {
      opacity: 0;
      visibility: hidden;
    }
  }

  @keyframes open {
    0% {
      opacity: 0;
      visibility: hidden;
    }
    100% {
      opacity: 1;
      visibility: visible;
    }
  }
`;

export default Modal;
