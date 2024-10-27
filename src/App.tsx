import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Login from './containers/login';
import Search from './containers/search';
import { getUser } from './api/auth';
import getEvent from './api/event';
import { checkTicket, getNotPurchasedTickets, updateTicket } from './api/ticket';

function App() {
  const [ searchType, setSearchType ] = useState<'scan' | 'input'>('scan')
  const [ user, setUser ] = useState<any>(null)
  const [ event, setEvent ] = useState<any>(null)
  const [ loading, setLoading ] = useState(false)
  const [ ticket, setTicket ] = useState<any>(null)
  const [ currentSearch, setCurrentSearch ] = useState<string>('')

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
    /* Promise.all([
      getEvent(eventId),
      getNotPurchasedTickets(eventId)
    ]).then(([event, notPurchased]) => {
      const newEvent = { ...event, notPurchased }
      console.log(newEvent)
      setEvent(newEvent)
    }) */
  }, [user?.sc_id])

  const handleSearch = (value: string) => {
    if (!user?.sc_id) return
    const [hallId, category, row, seat, id, time] = value.split(';')
    if (!id) return
    const seatId = [hallId, category, row, seat].join(';')
    setLoading(true)
    setCurrentSearch(value)
    /* if (event.notPurchased?.includes(seatId)) {
      setTicket({ id: seatId, status: 'error', message: 'Not purchased' })
    } */
    checkTicket(id).then(response => {
      if (response.code === '200') {
        const passed = response.data?.pass === '1'
        setTicket({ id: seatId, status: passed ? undefined : 'success', message: passed ? 'Used' : 'Purchased', t_id: response.data?.t_id, row, seat, passed })
      } else {
        setTicket({ id: seatId, status: 'error', message: 'Not found' })
      }
      setLoading(false)
    })
  }

  const handleTogglePassed = useCallback(async (ticket: any) => {
    setLoading(true)
    const response = await updateTicket(ticket.t_id, ticket.id, !ticket.passed)
    if (response.data?.code === '200') {
      setTicket((prev: any) => ({ ...prev, status: ticket.passed ? 'success' : undefined, message: !ticket.passed ? 'Used' : 'Purchased', passed: !ticket.passed }))
    }
    setLoading(false)
  }, [])

  return (
    <>
      {!user ?
        <Login
          onSuccess={onLogin}
        /> :
        <Search
          eventId={event?.id}
          username={user?.u_name}
          ticket={ticket}
          isLoading={loading}
          searchType={searchType}
          currentSearch={currentSearch}
          setSearhType={setSearchType}
          togglePassed={handleTogglePassed}
          search={handleSearch}
        />
      }
    </>
  );
}

export default App;
