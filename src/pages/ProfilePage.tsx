import { LoadingButton } from '@mui/lab'
import { Card, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import TextInput from '../components/input/TextInput'
import { useAuthentication } from '../hooks/useAuthentication'
import { isValidName, isValidUser } from '../utils/validation'
import SaveIcon from '@mui/icons-material/Save'
import { LoadingOverlay, useNotifications } from '../features/Feedback'
import EmailInput from '../components/input/EmailInput'
import { useFetch } from '../hooks/useFetch'
import { User } from '../utils/types'

export default function ProfilePage() {
  const { addNotification } = useNotifications()
  const { uid, updateUser } = useAuthentication()
  const [data, fetching, error] = useFetch<User>(`/Users/${uid}`)
  const [result, loading, _, uploadUserChanges] = useFetch<User>(`/Users/${uid}`, {
    skip: true,
    method: 'PUT',
  })

  const [user, setUser] = useState<User | null>(data || null)

  useEffect(() => setUser(data), [data])

  const onSave = () => {
    uploadUserChanges({ user }) // this is wrong
      .then((user) => {
        console.log('User afterwards', user)
        return user
      })
      .then((user) => updateUser(user))
      .then(() => {
        addNotification({ message: 'Profil wurde erfolgreich geändert', color: 'success' })
      })
      .catch(() =>
        addNotification({ message: 'Ups.. hier ist etwas schief gelaufen', color: 'error' }),
      )
  }

  if (fetching) {
    return <LoadingOverlay invisible />
  }

  if (!user || error) {
    return <p>Fehler</p>
  }

  return (
    <>
      <Card>
        <CardHeader>Profil</CardHeader>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item md={9}>
              <Stack spacing={2} sx={{ width: '100%' }}>
                <Typography variant="h4">Your Profile</Typography>
                <TextInput
                  label="Vorname"
                  setValue={(name) => setUser({ ...user, name })}
                  value={user.name}
                  validation={isValidName}
                  helperText="Vorname muss mindestens 3 Zeichen lang sein"
                />
                <TextInput
                  label="nachname"
                  setValue={(surname) => setUser({ ...user, surname })}
                  value={user.surname}
                  validation={isValidName}
                  helperText="Nachname muss mindestens 3 Zeichen lang sein"
                />
                <EmailInput
                  email={user.email || ''}
                  disabled
                  setEmail={(email) => console.log(email)}
                />
                <div>
                  <LoadingButton
                    sx={{ float: 'right' }}
                    disabled={!isValidUser(user) && user !== data}
                    loading={loading}
                    variant="contained"
                    startIcon={<SaveIcon />}
                    loadingPosition="start"
                    onClick={onSave}
                  >
                    Speichern
                  </LoadingButton>
                </div>
              </Stack>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}
