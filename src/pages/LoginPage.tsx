import LoadingButton from '@mui/lab/LoadingButton'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Link,
  Paper,
} from '@mui/material'
import { useState } from 'react'
import { Link as NavLink, Navigate, useLocation } from 'react-router-dom'
import EmailInput from '../components/input/EmailInput'
import PasswordInput from '../components/input/PasswordInput'
import { LoadingOverlay } from '../features/Feedback'
import { useAuthentication } from '../hooks/useAuthentication'
import { LocationState } from '../utils/types'
import { isValidEmail, isValidPassword } from '../utils/validation'

export default function LoginPage() {
  const { user, loading, login, passwordReset } = useAuthentication()
  const location = useLocation()

  const [state, setState] = useState({
    displayName: '',
    email: '',
    password: '',
    resetPassword: false,
  })

  const handleResetPassword = () => {
    passwordReset(state.email)
    setState({ ...state, resetPassword: false })
  }

  const isFormValid = () => {
    return isValidEmail(state.email) && isValidPassword(state.password)
  }

  if (user) {
    let to = (location.state as LocationState)?.from?.pathname
    if (!to || to === '/access-denied') to = '/'

    return <Navigate to={to} replace />
  }

  function renderPasswordForget() {
    return (
      <Dialog
        open={state.resetPassword}
        onClose={() => setState({ ...state, resetPassword: false })}
      >
        <DialogTitle>Passwort zurücksetzen</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ marginBottom: 4 }}>
            Wenn die von Ihnen eingegebene E-Mail-Adresse im System gespeichert ist, erhalten Sie in
            wenigen Minuten eine in wenigen Minuten eine E-Mail zum Zurücksetzen des Passworts.
            Bitte überprüfen Sie auch Ihren Spam-Ordner.
          </DialogContentText>
          <EmailInput email={state.email} setEmail={(email) => setState({ ...state, email })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setState({ ...state, resetPassword: false })} color="primary">
            Abbrechen
          </Button>
          <Button
            color="primary"
            disabled={!isValidEmail(state.email)}
            onClick={handleResetPassword}
          >
            Zurücksetzen
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <>
      <LoadingOverlay loading={loading} />
      <Grid container alignItems="center" justifyContent="center" flex={1}>
        <Grid item lg={4} md={6}>
          <Paper sx={{ padding: 2 }}>
            <Grid container spacing={2}>
              <Grid container justifyContent="center">
                <img
                  src={require('../assets/logo_full_white.png')}
                  alt="BuFaK WiWi"
                  style={{ height: 120 }}
                />
              </Grid>
              <Grid item xs={12}>
                <EmailInput
                  email={state.email}
                  setEmail={(email) => setState({ ...state, email })}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <PasswordInput
                  password={state.password}
                  setPassword={(password) => setState({ ...state, password })}
                  autoComplete="current-password"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setState({ ...state, resetPassword: true })}
                >
                  Passwort vergessen?
                </Button>
              </Grid>
              {renderPasswordForget()}
              <Grid item xs={12}>
                <LoadingButton
                  type="submit"
                  size="large"
                  fullWidth
                  loading={loading}
                  onClick={() => login(state.email, state.password)}
                  disabled={!isFormValid()}
                  variant="contained"
                >
                  Login
                </LoadingButton>
              </Grid>
              <Grid item xs={12}>
                <Divider flexItem />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }} my={-1}>
                Noch keinen Account?{' '}
                <Link component={NavLink} to="/register" underline="hover">
                  Jetzt registrieren.
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
