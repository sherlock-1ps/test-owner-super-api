"use server"

import Axios from "@/libs/axios/axios"
import { useAuthStore } from "@/store/authStore"
import { axiosErrorHandler } from "@/utils/axiosErrorHandler"
import { removeCookie, setCookie } from "@/utils/cookieHandler"


export const signIn = async (credentials: any) => {
  try {
    const response = await Axios.post('/login', {
      username: credentials.username,
      password: credentials.password,
    })

    const { token, refresh_token } = response.data.data
    setCookie("accessToken", token)
    setCookie("refreshToken", refresh_token)

    return {
      success: true,
      code: response.data.code,
      data: response.data.data,
    }
  } catch (error: any) {
    const status = error?.response?.status ?? 500
    const code = error?.response?.data?.code ?? 'UNKNOWN'
    const message = error?.response?.data?.message ?? 'Internal Server Error'

    return {
      success: false,
      status,
      code,
      message,
    }
  }
}


