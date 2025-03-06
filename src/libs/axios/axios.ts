import type { AxiosInstance } from 'axios'
import axios from 'axios'

/**
 * Create axios instance.
 */
const Axios: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8100',
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

    // const { accessToken } = useAuthStore.getState()

    // if (config.headers) {
    //   if (accessToken) config.headers['Authorization'] = `Bearer ${accessToken}`
    // }

    config.headers['Authorization'] =
      `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwaG9uZV9udW1iZXIiOiIxOTEiLCJ1c2VybmFtZSI6ImFkbWluIn0._JcH25k1zAW9JUIYwSvwMga2NMfAngQ0N1bHPp7S1D4`

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

// {
//   "id": 3,
//   "name": "Setting Cashback",
//   "actions": [
//     {
//       "id": 5,
//       "name": "Can view setting Cashback",
//       "preview_image": "",
//       "is_active": true
//     },
//     {
//       "id": 6,
//       "name": "Can edit setting Cashback general",
//       "preview_image": "",
//       "is_active": true
//     },
//     {
//       "id": 7,
//       "name": "Can edit setting Cashback provider",
//       "preview_image": "",
//       "is_active": true
//     }
//   ]
// }
