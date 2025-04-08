import { useAuthStore } from '@/store/authStore'
import type { AxiosInstance } from 'axios'
import axios from 'axios'

const Axios: AxiosInstance = axios.create({
  baseURL: `http://52.220.124.2:8080`,
  timeout: 15100,
})

const ipUrl = process.env.NEXT_PUBLIC_IP_URL || "https://api64.ipify.org?format=json"

let failedQueue: any[] = []
let cachedIP: string | null = null

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

const getPublicIP = async (): Promise<string | null> => {
  if (cachedIP) return cachedIP

  try {
    const res = await fetch(ipUrl)
    const data = await res.json()
    cachedIP = data?.ip

    return cachedIP
  } catch (err) {
    console.error('IP fetch failed:', err)

    return null
  }
}

Axios.interceptors.request.use(
  async reqConfig => {
    const config = reqConfig
    const accessToken = useAuthStore.getState().accessToken
    const ip = await getPublicIP()



    if (config.headers && accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    if (config.headers && ip) {
      config.headers['X-Client-IP'] = ip
    }

    return config
  },
  err => Promise.reject(err)
)

Axios.interceptors.response.use(
  res => {
    const { error } = res.data
    if (error) console.log(`AXIOS INTERCEPTOR :`, error)

    return res
  },
  async err => {

    if (typeof window !== 'undefined') {
      const errorCode = err.response?.data?.code
      if (errorCode === 'TOKEN_DESTROYED') {

        useAuthStore.getState().clearTokens()
        window.location.href = '/login'
      }
    }
    // console.log("originalRequest", !originalRequest._retry);


    // const errorCode = err.response?.data?.code

    // console.log("errorCode", errorCode);
    // console.log("isRefreshing", isRefreshing);



    // if (errorCode === 'TOKEN_DESTROYED' && !originalRequest._retry) {
    //   if (isRefreshing) {
    //     return new Promise(function (resolve, reject) {
    //       failedQueue.push({ resolve, reject })
    //     })
    //       .then(token => {
    //         originalRequest.headers['Authorization'] = 'Bearer ' + token
    //         return Axios(originalRequest)
    //       })
    //       .catch(err => Promise.reject(err))
    //   }

    //   originalRequest._retry = true
    //   isRefreshing = true

    //   try {
    //     const response = await Axios.get('/refreshToken')

    //     console.log("response", response);



    //     const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data
    //     setTokens(newAccessToken, newRefreshToken)

    //     Axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`
    //     processQueue(null, newAccessToken)

    //     originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
    //     return Axios(originalRequest)
    //   } catch (refreshError) {
    //     processQueue(refreshError, null)
    //     clearTokens()
    //     if (typeof window !== 'undefined') {
    //       window.location.href = '/'
    //     }
    //     return Promise.reject(refreshError)
    //   } finally {
    //     isRefreshing = false
    //   }
    // }


    return Promise.reject(err)
  }
)

export default Axios





// if (error?.code === ErrorCode.UNAUTHORIZED || error?.code === ErrorCode.INVALID_AUTHORIZATION) {
//   useAuthStore.getState().clearAuth()

//   if (typeof window !== 'undefined') {
//     // For clear cookies
//     window.location.href = '/'
//   }
// }
