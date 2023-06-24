import axios from "axios"

export const performRequest = async (url, method, data = null) => {
  try {
    const response = await axios({ url, method, data })
    return response.data
  } catch (error) {
    console.log(error)
    return null
  }
}