import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import axios from 'axios'

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (userType, userData) => {
    setIsLoading(true)
    setError(null)

    let url = ""

    switch (userType) {
      case 'user':
        url = process.env.REACT_APP_SIGNUP_USER_ENDPOINT
        break;
      case 'specialist':
        url = process.env.REACT_APP_SIGNUP_SPECIALIST_ENDPOINT
        break;
      default:
        throw new Error('Invalid user type')
    }

    try {
      const response = await axios.post(url, userData, {
        headers: {'Content-Type': 'application/json'}
      })
      const json = response.data

      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError(error.response ? error.response.data.error : 'An error occurred')
    }
  }

  return { signup, isLoading, error }
}