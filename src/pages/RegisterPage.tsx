import LoadingButton from '@mui/lab/LoadingButton'
import { Autocomplete, Divider, Grid, Link, Paper, TextField } from '@mui/material'
import { useState } from 'react'
import { Link as NavLink, Navigate } from 'react-router-dom'
import EmailInput from '../components/input/EmailInput'
import PasswordInput from '../components/input/PasswordInput'
import TextInput from '../components/input/TextInput'
import { LoadingOverlay } from '../features/Feedback'
import { useAuthentication } from '../hooks/useAuthentication'
import { useFetch } from '../hooks/useFetch'
import { Council, Sex } from '../utils/types'
import { isValidName, isValidPassword, isValidUser, isValidZipCode } from '../utils/validation'

export default function RegisterPage() {
  const { user, loading, signUp } = useAuthentication()
  const [councilList, councilLoading] = useFetch<Council[]>('/councils')

  const [state, setState] = useState({
    name: '',
    surname: '',
    email: '',
    council: null as Council | null,
    sex: 'm' as Sex,
    birthday: '2000-01-01',
    street: '',
    zip: '',
    city: '',
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

  const getCouncilLabel = (council: Council) => `${council.name}, ${council.university}`

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
                <TextInput
                  value={state.street}
                  label="Straße und Hausnummer"
                  setValue={(street) => setState({ ...state, street })}
                  validation={isValidName}
                  helperText="Straße muss mindestens drei Zeichen lang sein"
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  value={state.city}
                  label="Stadt"
                  setValue={(city) => setState({ ...state, city })}
                  validation={isValidName}
                  helperText="Stadt muss mindestens drei Zeichen lang sein"
                />
              </Grid>
              <Grid item xs={12}>
                <TextInput
                  value={state.zip}
                  label="Postleitzahl"
                  setValue={(zip) => setState({ ...state, zip })}
                  validation={isValidZipCode}
                  helperText="Gültige Postleitzahl angeben"
                />
              </Grid>
              <Grid item xs={12}>
                <Autocomplete
                  disablePortal
                  options={councilList || []}
                  onChange={(_, council) => {
                    setState({ ...state, council })
                  }}
                  loading={councilLoading}
                  isOptionEqualToValue={(option, value) => option.councilID === value.councilID}
                  getOptionLabel={getCouncilLabel}
                  renderInput={(params) => <TextField {...params} label="Fachschaftsrat" />}
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
                  onClick={() =>
                    signUp({
                      name: state.name,
                      surname: state.surname,
                      birthday: state.birthday,
                      email: state.email,
                      password: state.password,
                      council_id: state.council?.councilID,
                      sex: state.sex,
                      address: `${state.street};${state.city};${state.zip}`,
                    })
                  }
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
