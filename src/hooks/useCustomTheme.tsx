import { useMediaQuery } from '@mui/material'
import { blue, pink } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'
import { useEffect, useMemo } from 'react'
import { useStore } from './useStore'

export function useCustomTheme() {
  const { darkMode, initDarkMode } = useStore()
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

  useEffect(() => {
    initDarkMode(prefersDarkMode)
  }, [])

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          primary: {
            main: blue[700],
          },
          secondary: pink,
        },
      }),
    [darkMode],
  )

  return theme
}
