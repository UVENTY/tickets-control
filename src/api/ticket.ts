import { axios } from '../utils';

export async function checkTicket(tid: string) {
  const response = await axios.post('/ticket/check/', { code: tid })
  return response.data
}

export async function getTicketStatus(sc_id: string, seat: string) {
  const response = await axios.post('/ticket/select', { sc_id })
}