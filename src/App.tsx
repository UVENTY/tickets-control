import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Login from './containers/login';
import Scan from './containers/scan';
import { Container } from './components';
import { getUser } from './api/auth';
import getEvent from './api/event';

function App() {
  const [ user, setUser ] = useState<any>(null)
  const [ event, setEvent ] = useState<any>(null)

  const onLogin = useCallback(async (data: any) => {
    localStorage.setItem('token', data.token)
    localStorage.setItem('u_hash', data.u_hash)
    const response = await getUser()
    const user = response.data?.user?.[data?.user?.u_id]
    setUser(user)
  }, [])

  useEffect(() => {
    const eventId = user?.sc_id
    if (!eventId) return
    getEvent(eventId).then(setEvent)
  }, [user?.sc_id])

  return (
    <>
      {!user ? <Login
        onSuccess={onLogin}
      /> : <Scan eventId={event?.id} username={user?.u_name} />}
    </>
  );
}

export default App;
