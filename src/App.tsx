import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Login from './containers/login';
import Scan from './containers/scan';
import { Container } from './components';
import { getUser } from './api/auth';
import getEvent from './api/event';
import { checkTicket } from './api/ticket';

function App() {
  const [ user, setUser ] = useState<any>(null)
  const [ event, setEvent ] = useState<any>(null)
  const [ status, setStatus ] = useState<'idle' | 'searching' | 'checking' | 'found' | 'error'>('idle')
  const [ ticket, setTicket ] = useState<any>(null)

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

  const handleScan = useCallback(async (value: string) => {
    const [hallId, category, row, seat, id, time] = value.split(';')
    const seatId = [hallId, category, row, seat].join(';')
    setStatus('searching')
    setTicket(null)
    const response = await checkTicket(id)
    if (response.code === '200') {
      setStatus('found')
      setTicket(response.data)
    } else {
      setStatus('error')
    }
  }, [])

  return (
    <>
      {!user ?
        <Login
          onSuccess={onLogin}
        /> :
        <Scan
          eventId={event?.id}
          username={user?.u_name}
          onScan={handleScan}
          status={status}
          ticket={ticket}
        />
      }
    </>
  );
}

export default App;
