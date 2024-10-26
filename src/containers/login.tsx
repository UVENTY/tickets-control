import { useState } from 'react';
import login from '../api/login';
import { Button, Container, Input } from '../components';
import styled from 'styled-components';

const ErrorText = styled.div`
  padding: 10;
  margin-bottom: 10px;
  color: #F15B6D;
  margin-bottom: -20px;
  text-align: center;
`

export default function Login(props: {
  onSuccess?: (result: { user: any, token: string, u_hash: string }) => any
}) {
  const [ error, setError ] = useState<string>('')
  const [ pending, setPending ] = useState<boolean>(false)
  
  return (
    <form
      method='post'
      action='/auth'
      onSubmit={async e => {
        e.preventDefault()
        setPending(true)
        const data = new FormData(e.currentTarget)
        try {
          const result = await login(data)
          if (result.token && result.u_hash) {
            props.onSuccess && props.onSuccess(result)
          }
        } catch (e) {
          setError((e as any).message)
        } finally {
          setPending(false)
        }
      }}
    >
      <Container>
        <input type='hidden' name='type' value='e-mail' />
        <Input name='login' placeholder='Login' onChange={() => setError('')} />
        <Input name='password' placeholder='Password' type='password' onChange={() => setError('')} />
        {!!error && <ErrorText>{error}</ErrorText>}
        <Button type='submit' style={{ marginTop: 20 }} disabled={pending}>Sign In</Button>
      </Container>
    </form>
  )
}