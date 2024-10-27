import { axios } from '../utils'

export const getTripBySeatMap = (data: any) =>
  Object.values(data.trip).reduce((tickets: Record<string, any>, group: any) => {
    const { seats_sold = {} } = group.t_options || {}
    Object.entries(seats_sold).forEach(([section, rows]) => {
      Object.entries(rows as any).forEach(([row, seats]) => {
        Object.keys(seats as any).forEach((seat: string) => {
          const range = seat.split(';').map(Number).filter(Boolean)
          if (range.length < 1) return
          Array.from(
            { length: range.length === 2 ? range[1] - range[0] + 1 : 1 },
            (_, i) => i + range[0]
          ).forEach(seat => {
            const id = [group.stadium, section, row, seat].join(';')
            tickets[id] = group.t_id
          })
        })
      })
    })
    return tickets
  }, {})


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