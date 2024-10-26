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

export const Title = styled.h1`
  font-size: 22px;
  color: #fff;
  font-weight: 400;
  text-transform: uppercase;
  margin: 0 0 12px;
`

export const SubTitle = styled.h2`
  font-size: 12px;
  font-weight: 400;
  color: #F8F5EC;
  margin: 0 0 32px;
`

export const ScanArea = styled.div`
  width: 335px;
  height: 335px;
  margin: 32px auto;
  position: relative;

  .corner {
    position: absolute;
    width: 38px;
    height: 38px;
    z-index: 1;
    border: 1px solid transparent;
  }

  .lt {
    left: -1px;
    top: -1px;
    border-left-color: #fff;
    border-top-color: #fff;
  }

  .rt {
    right: -1px;
    top: -1px;
    border-right-color: #fff;
    border-top-color: #fff;
  }

  .lb {
    left: -1px;
    bottom: -1px;
    border-left-color: #fff;
    border-bottom-color: #fff;
  }

  .rb {
    right: -1px;
    bottom: -1px;
    border-right-color: #fff;
    border-bottom-color: #fff;
  }
`
export const Text = styled.div`
  color: #fff;
  font-size: 12px;
  text-align: center;
  margin: 0 32px;
`