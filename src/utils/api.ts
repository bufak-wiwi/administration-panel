import axios from 'axios'
import { useNotifications } from '../features/Feedback'
import { useAuthentication } from '../hooks/useAuthentication'

export const getAPIBaseUrl = () => process.env.BASEURL || 'https://dev.api.bufak-wiso.de:8443/api'

export const api = axios.create({ baseURL: getAPIBaseUrl() })
api.defaults.headers.common = {}
api.defaults.params = {}
api.defaults.params['apikey'] = process.env.APIKEY || 'testapikey'

api.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {}
  }

  const token = useAuthentication.getState().token
  if (token) {
    config.headers.jwttoken = token
  }

  const conferenceID = 2
  if (conferenceID) {
    config.headers.conference_id = conferenceID
  }

  return config
})

// error handler
api.interceptors.response.use(
  (res) => res,
  (error) => {
    // server error
    if (error.response.status === 500) {
      useNotifications.getState().addNotification({
        color: 'error',
        message: 'Leider sind Serverfehler aufgetreten. Bitte versuche es später erneut',
      })
    }

    // session expired or missing permissions
    if (error.response.status === 401 || error.response.status === 418) {
      useNotifications.getState().addNotification({
        color: 'warning',
        message: 'Session abgelaufen. Logge dich erneut ein.',
      })
      useAuthentication.getState().signOut()
    }
    return Promise.reject(error)
  },
)
