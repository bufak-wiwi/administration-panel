import create from 'zustand'
import { persist } from 'zustand/middleware'
import { useNotifications } from '../features/Feedback'
import { api } from '../utils/api'
import { User } from '../utils/types'
import { useStore } from './useStore'

export interface AuthStoreState {
  user: User | null
  token: string
  uid: string
  isAdmin: boolean
  loading: boolean
  error: boolean
  login: (email: string, password: string) => Promise<void>
  signUp: (test: any) => Promise<void>
  passwordReset: (email: string) => Promise<void>
  updateUser: (user: User) => void
  signOut: () => void
}

const INITIAL_STATE = {
  user: null,
  token: '',
  uid: '',
  isAdmin: false,
  loading: false,
  error: false,
}

export const useAuthentication = create<AuthStoreState>(
  persist(
    (set, _) => ({
      ...INITIAL_STATE,
      signOut: () => set(INITIAL_STATE),
      updateUser: (user) => set({ user }),
      login: async (email, password) => {
        set({ loading: true })
        const response = await api.post('/login', { email, password }).catch((err) => err.response)
        console.log(response.data)
        if (response.data >= 400 || !response.data?.tokenString) {
          useNotifications.getState().addNotification({
            color: 'error',
            message: 'Ungültige Zugangsdaten',
          })
          return set(INITIAL_STATE)
        }
        useStore.setState({
          // TODO get latest conference
          conferenceID: (response.data.conferences[0]?.conferenceID as number) || 99,
          conference: response.data.conferences[0],
          conferenceList: response.data.conferences,
        })
        return set({
          error: false,
          loading: false,
          token: response.data.tokenString,
          user: response.data.user,
          uid: response.data.user?.uid || '',
          isAdmin: response.data.user?.isSuperAdmin ?? false,
        })
      },
      signUp: async (test) => {
        console.log('Here upload user', test)
      },
      passwordReset: async (email) => {
        set({ loading: true, error: false })
        await api.post('/users/passwordforget', { email }).catch((err) => err.response)
        set({ loading: false })
      },
    }),
    {
      name: 'auth',
    },
  ),
)
