import { axiosInstance } from '../axiosInstance'

const logout = async () => {
  try {
    const response = await axiosInstance.post('/users/logout')
    if (response.status < 200 || response.status >= 300) {
      throw new Error('Failed to logout')
    }

    localStorage.removeItem('accessToken')
    return response.data
  } catch (error) {
    console.error('Error during logout:', error)
    throw new Error('Failed to logout')
  }
}

export default logout
