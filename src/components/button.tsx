import styled from 'styled-components';

const Button = styled.button`
  display: block;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  box-sizing: border-box;
  border: 1px solid #F8F5EC;
  background-color: transparent;
  color: #F8F5EC;
  text-align: center;
  font-size: 12px;
  font-weight: 700px;
  font-style: italic;
  text-transform: uppercase;
  cursor: pointer;

  &:disabled {
    opacity: .3;
    pointer-events: none;
    cursor: auto;
  }
`

export default Button