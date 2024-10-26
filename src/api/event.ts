import { axios } from '../utils';

export default async function getEvent(id: number | string) {
  const response = await axios.get('/data', { params: { fields: 2, key: id } })
  const event = response.data?.data?.data?.schedule?.[id]
  return { id, ...event }
}