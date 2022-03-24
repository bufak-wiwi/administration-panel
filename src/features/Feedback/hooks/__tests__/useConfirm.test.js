import { act, renderHook } from '@testing-library/react-hooks'
import { useConfirm } from '../useConfirm'

const message = 'This is a test message'
const onSubmit = () => console.log('This is a Test Submit')

test('should open and close confirm dialog', () => {
  const { result } = renderHook(() => useConfirm())

  expect(result.current.message.length).toBe(0)
  expect(result.current.onSubmit).toBeFalsy()

  act(() => {
    result.current.confirmDialog(message, onSubmit)
  })

  expect(result.current.message).toBe(message)
  expect(result.current.onSubmit).toBe(onSubmit)

  act(() => {
    result.current.close()
  })

  expect(result.current.message.length).toBe(0)
  expect(result.current.onSubmit).toBeFalsy()
})
