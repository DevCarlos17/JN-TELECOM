import axios from "axios"
import { toast } from "sonner"

export const performRequest = async (url, method, data = null) => {
  try {
    const response = await axios({ url, method, data })
    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}

export const toaster = (fn) => {
  toast.promise(fn, {
    loading: "Loadings...",
    success: ({ message }) => {
      return message
    },
    error: "Error"
  })
}