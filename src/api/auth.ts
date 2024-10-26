import { axios } from '../utils';

export async function getTokens(auth_hash: string) {
  const data = new FormData()
  data.append('auth_hash', auth_hash)
  const response = await axios.post('/token', data)
  return response.data?.data
}

export async function getUser(id?: number) {
  const response = await axios.post(`/user/${id || 'authorized'}`)
  return response.data
}

export default async function login(params: FormData) {
  const { data }: any = await axios.post('/auth', params, { headers: { Guest: true  } })
  if (data?.status === 'error') {
    throw new Error(data.message)
  }
  const user = data.auth_user
  if (user?.u_role !== '6') {
    throw new Error('wrong role, access denied')
  }
  const { token, u_hash } = await getTokens(data.auth_hash)
  return {
    token,
    u_hash,
    user
  }
}