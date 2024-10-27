import { axios } from '../utils'

export async function checkTicket(tid: string) {
  const response = await axios.post('/ticket/check/', { code: tid })
  return response.data
}

export async function getNotPurchasedTickets(sc_id: string) {
  const response = await axios.post('/schedule/ticket/select', { sc_id })
  return response.data?.data?.ticket?.map((ticket: any) => ticket.seat)
}

export async function updateTicket(t_id: string, seat: string, passed: boolean) {
  const data = JSON.stringify([{ seat, pass: Number(passed) }])
  const response = await axios.post(`/trip/get/${t_id}/ticket/edit`, { data })
  return response
}