import { createGlobalStyle, keyframes } from 'styled-components';

const Spin = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`

const SpinnerStyles = createGlobalStyle`
  .spinner_P7sC{
    transform-origin: center;
    animation: ${Spin} .75s infinite linear
  }
`

export default function Spinner({ size = 24, fill = '#fff', pause }: { size?: number, fill?: string, pause?: boolean }) {
  return (<svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <SpinnerStyles />
    <path
      d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
      className='spinner_P7sC'
      fill={fill}
    />
  </svg>)
}