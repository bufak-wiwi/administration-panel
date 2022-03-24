import create from 'zustand'
import { persist } from 'zustand/middleware'

interface StoreState {
  conferenceID: number
  conference: any // TODO
  conferenceList: any[] // TODO
  sidebarOpen: boolean
  darkMode: boolean | null
  setSidebarOpen: (open: boolean) => void
  initDarkMode: (darkMode: boolean) => void
  toggleDarkMode: () => void
}

export const useStore = create<StoreState>(
  persist(
    (set, _) => ({
      conferenceID: 99,
      conference: null,
      conferenceList: [],
      sidebarOpen: false,
      darkMode: null,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      initDarkMode: (darkMode) =>
        set((state) => ({ darkMode: state.darkMode === null ? darkMode : state.darkMode })),
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'store',
    },
  ),
)
