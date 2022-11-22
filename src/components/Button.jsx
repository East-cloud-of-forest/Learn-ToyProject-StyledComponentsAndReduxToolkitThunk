import styled from 'styled-components';

const Button = ({children, size, onClick}) => {
  return (<StButton size={size} onClick={onClick}>
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
  padding: 0.5rem;
  transition: background-color 0.1s;
`

export default Button;
