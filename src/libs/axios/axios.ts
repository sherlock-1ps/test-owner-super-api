import { useAuthStore } from '@/store/authStore'
import type { AxiosInstance } from 'axios'
import axios from 'axios'

/**
 * Create axios instance.
 */
const Axios: AxiosInstance = axios.create({
  baseURL: `https://api-dev.arawanglobal.com/backend-api-gateway-test`,
  timeout: 15100
})

/**
 * Axios also provides a request interceptor, allows changes to the request data before it is sent to the server
 * This is only applicable for request methods 'POST', 'PUT', 'PATCH' and 'DELETE'
 * The last function in the array must return a string or an instance of Buffer, ArrayBuffer,
 * FormData or Stream
 * You may modify the headers object.
 */
Axios.interceptors.request.use(
  async reqConfig => {
    const config = reqConfig

    const accessToken = useAuthStore.getState().accessToken;


    if (config.headers) {
      if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`
    }



    return config
  },
  err => {
    return Promise.reject(err)
  }
)

Axios.interceptors.response.use(
  res => {
    const { error } = res.data

    if (error) console.log(`AXIOS INTERCEPTOR :`, error)

    // if (error?.code === ErrorCode.UNAUTHORIZED || error?.code === ErrorCode.INVALID_AUTHORIZATION) {
    //   useAuthStore.getState().clearAuth()

    //   if (typeof window !== 'undefined') {
    //     // For clear cookies
    //     window.location.href = '/'
    //   }
    // }

    return res
  },
  err => {
    return Promise.reject(err)
  }
)

export default Axios
