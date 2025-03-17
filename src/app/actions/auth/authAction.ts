"use server"

import Axios from "@/libs/axios/axios"
import { axiosErrorHandler } from "@/utils/axiosErrorHandler"


export const signIn = async (credentials: any) => {
  try {
    const response = await Axios.post('/login', {
      username: "owneruser",
      password: "123456"
    })

    return response.data
  } catch (error) {
    axiosErrorHandler(error, '/user/getUser')
  }
}
