import styled from 'styled-components';

const Button = ({children, size, onClick, block}) => {
  return (<StButton size={size} onClick={onClick} block={block}>
    {children}
  </StButton>);
};

const StButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  color: inherit;
  font-size: ${({size})=>size};
  border-radius: 11px;
  user-select: none;
  padding: 0.5rem;
  transition: background-color 0.1s;
  ${({block})=>block&&'width:100%;display:block;'}
`

export default Button;
