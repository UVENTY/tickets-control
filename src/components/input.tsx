import styled from 'styled-components';

const Input = styled.input<{ status?: 'success' | 'error' }>`
  display: block;
  width: 100%;
  height: 32px;
  background-color: #F8F5EC1A;
  border-radius: 4px;
  box-sizing: border-box;
  border: none;
  padding-left: 12px;
  color: ${props => props.status === 'success' ? '#53BC6B' : (props.status === 'error' ? '#F15B6D' : '#fff')}
`

export default Input