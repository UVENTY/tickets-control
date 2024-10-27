import styled from 'styled-components';

export { default as Button } from './button'
export { default as Input } from './input'

export const Container = styled.div<{ align?: 'start' | 'center' | 'end' }>`
  height: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.align !== 'center' ? `flex-${props.align}` : props.align};
  gap: 20px;
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

export const ScanArea = styled.div`
  width: 100%;
  margin: 12px auto;
  position: relative;

  svg {
    path {
      stroke: #fff;
    }

    &:last-child {
      display: none;
    }
  }
`
export const Text = styled.div<{ size?: string | number, status?: 'success' | 'error' | 'hint', inline?: boolean, align?: string }>`
  color: ${props => props.status === 'success' ? '#53BC6B' : (props.status === 'error' ? '#F15B6D' : (props.status === 'hint' ? 'rgba(255, 255, 255, .3)' : '#fff'))};
  display: ${props => props.inline ? 'inline-block' : 'block'};
  font-size: ${props => props.size || '14px'};
  text-align: ${props => props.align || 'left'};
  margin: 0 3px;
`