import { useState } from 'react';
import { Button, Container, Input, Text } from '../components';
import login from '../api/auth';
import Spinner from '../components/spinner';

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
          if (result.token && result.u_hash && props.onSuccess) {
            await props.onSuccess(result)
          }
          setPending(false)
        } catch (e) {
          setError((e as any).message)
          setPending(false)
        }
      }}
    >
      <Container align='center'>
        <input type='hidden' name='type' value='e-mail' />
        <Input name='login' placeholder='Login' onChange={() => setError('')} autoFocus />
        <Input name='password' placeholder='Password' type='password' onChange={() => setError('')} />
        {!!error && <Text status='error'>{error}</Text>}
        <Button type='submit' style={{ marginTop: 20 }} disabled={pending}>
          {pending ? <Spinner size={16} /> : 'Sign In'}
        </Button>
      </Container>
    </form>
  )
}