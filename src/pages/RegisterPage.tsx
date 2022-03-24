import { Grid, Paper, Divider, Link } from '@mui/material'
import { useState } from 'react'
import { Navigate, Link as NavLink } from 'react-router-dom'
import { useAuthentication } from '../hooks/useAuthentication'
import LoadingButton from '@mui/lab/LoadingButton'
import EmailInput from '../components/input/EmailInput'
import { isValidPassword, isValidName, isValidUser } from '../utils/validation'
import PasswordInput from '../components/input/PasswordInput'
import TextInput from '../components/input/TextInput'
import { LoadingOverlay } from '../features/Feedback'

export default function RegisterPage() {
  const { user, loading, signUp } = useAuthentication()

  const [state, setState] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    passwordConfirm: '',
  })

  const isFormValid = () => {
    return (
      isValidUser(state) &&
      isValidPassword(state.password) &&
      state.password === state.passwordConfirm
    )
  }

  if (user) {
    return <Navigate to="/" replace />
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
                <TextInput
                  value={state.name}
                  label="Vorname"
                  setValue={(name) => setState({ ...state, name })}
                  validation={isValidName}
                  autoFocus
                  helperText="Name muss mindestens drei Zeichen lang sein"
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  value={state.surname}
                  label="Nachname"
                  setValue={(surname) => setState({ ...state, surname })}
                  validation={isValidName}
                  helperText="Nachname muss mindestens drei Zeichen lang sein"
                />
              </Grid>
              <Grid item xs={12}>
                <EmailInput
                  email={state.email}
                  setEmail={(email) => setState({ ...state, email })}
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
                <PasswordInput
                  password={state.passwordConfirm}
                  confirm
                  toConfirm={state.password}
                  setPassword={(passwordConfirm) => setState({ ...state, passwordConfirm })}
                />
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  type="submit"
                  size="large"
                  fullWidth
                  loading={loading}
                  onClick={() => signUp(state)}
                  disabled={!isFormValid()}
                  variant="contained"
                >
                  Registrieren
                </LoadingButton>
              </Grid>
              <Grid item xs={12}>
                <Divider flexItem />
              </Grid>
              <Grid item xs={12} sx={{ textAlign: 'center' }} my={-1}>
                Bereits einen Account?{' '}
                <Link component={NavLink} to="/login" underline="hover">
                  Jetzt anmelden.
                </Link>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  )
}
