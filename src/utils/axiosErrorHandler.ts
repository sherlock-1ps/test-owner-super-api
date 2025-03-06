import { AxiosError } from 'axios'

export const axiosErrorHandler = (error: unknown, title: string) => {
  if (error instanceof AxiosError && error.response) {
    console.error(`From ${title}, Axios error - ${error.response.status}: ${error.response.statusText}`, {
      data: error.response.data,
      headers: error.response.headers
    })
  } else if (error instanceof AxiosError && error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser or http.ClientRequest in Node.js
    console.error(`From ${title}, Request made, but no response received:`, error.request)
  } else if (error instanceof Error) {
    // General error (non-Axios related), this catches other errors like network issues
    console.error(`From ${title}, Error:`, error.message)
  } else {
    console.error(`From ${title}, An unknown error occurred`, error)
  }

  // throw error
}
