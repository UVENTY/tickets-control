import axiosHttp, { AxiosRequestHeaders } from 'axios'
import omit from 'lodash/omit'
import { API_URL } from './const'

export const axios = axiosHttp.create({
  baseURL: API_URL
})

axios.interceptors.request.use(config => {
  const { headers, data } = config
  if (!headers?.guest) {
    const formData = (data instanceof URLSearchParams || data instanceof FormData) ? data : getFormData(data)
    const token = localStorage.getItem('token')
    const u_hash = localStorage.getItem('u_hash')
    if (token && u_hash) {
      formData.append('token', token)
      formData.append('u_hash', u_hash)
    }
    config.data = formData
  } else {
    config.headers = omit(config.headers, ['guest']) as AxiosRequestHeaders
  }
  return config
})

export function getFormData(data: any, formData = new FormData(), parentKey?: string) {
  if (data && typeof data === 'object' && !(data instanceof Date) && !(data instanceof File) && !(data instanceof Blob)) {
    Object.keys(data).forEach(key => {
      getFormData(data[key], formData, parentKey ? `${parentKey}[${key}]` : key);
    });
  } else if (parentKey) {
    let value = data === null ? '' : data
    if (value instanceof Date) {
      value = value.toString()
    }
    formData.append(parentKey, value)
  }
  return formData
}