import create from 'zustand'

export type Notification = {
  id: number
  message: string
  color: 'success' | 'warning' | 'error' | 'info' | 'default'
}

interface NotificationState {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: number) => void
  removeAllNotifications: () => void
}

export const useNotifications = create<NotificationState>((set) => ({
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, { id: Date.now(), ...notification }],
    })),
  removeNotification: (id: number) =>
    set((state) => ({
      notifications: state.notifications.filter((x) => x.id !== id),
    })),
  removeAllNotifications: () => set({ notifications: [] }),
}))
