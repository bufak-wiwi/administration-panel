import { ThemeProvider } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import { EmptyLayout, MainLayout } from './components/layout/Layouts'
import { AdminRoute, AuthenticatedRoute } from './components/layout/RouteGards'
import { ConfirmDialog, Snackbar } from './features/Feedback'
import { useCustomTheme } from './hooks/useCustomTheme'
import AccessDeniedPage from './pages/AccessDeniedPage'
import AdminPage from './pages/AdminPage'
import DashboardPage from './pages/DashboardPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import ProfilePage from './pages/ProfilePage'
import RegisterPage from './pages/RegisterPage'
import SettingsPage from './pages/SettingsPage'

export default function App() {
  const theme = useCustomTheme()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Snackbar />
      <ConfirmDialog />
      <Routes>
        <Route element={<EmptyLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/access-denied" element={<AccessDeniedPage />} />
          <Route path="/" element={<DashboardPage />} />

          <Route element={<AuthenticatedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}
