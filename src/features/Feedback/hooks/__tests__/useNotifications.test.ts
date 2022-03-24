import { act, renderHook } from '@testing-library/react-hooks'
import { Notification, useNotifications } from '../useNotifications'

const notification: Notification = {
  id: 123,
  color: 'info',
  message: 'This is a notification',
}

const notificationWithoutID: Omit<Notification, 'id'> = {
  color: 'success',
  message: 'This is another notification',
}

test('should add and remove notifications', () => {
  const { result } = renderHook(() => useNotifications())

  expect(result.current.notifications.length).toBe(0)

  act(() => {
    result.current.addNotification(notification)
  })

  expect(result.current.notifications).toContainEqual(notification)

  act(() => {
    result.current.removeNotification(notification.id)
  })

  expect(result.current.notifications).not.toContainEqual(notification)
})

test('should be able to remove all notifications', () => {
  const { result } = renderHook(() => useNotifications())

  expect(result.current.notifications.length).toBe(0)

  act(() => {
    result.current.addNotification(notification)
    result.current.addNotification(notificationWithoutID)
  })

  expect(result.current.notifications.length).toBe(2)

  act(() => {
    result.current.removeAllNotifications()
  })

  expect(result.current.notifications.length).toBe(0)
})
