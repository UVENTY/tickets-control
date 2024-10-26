import styled from 'styled-components';

export { default as Button } from './button'
export { default as Input } from './input'

export const Container = styled.div`
  height: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
  box-sizing: border-box;
`
