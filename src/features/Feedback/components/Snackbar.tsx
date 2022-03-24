import { Close } from '@mui/icons-material'
import { Alert, IconButton, Snackbar as MUISnackbar } from '@mui/material'
import Slide, { SlideProps } from '@mui/material/Slide'
import { useNotifications } from '../hooks/useNotifications'

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />
}

export function Snackbar() {
  const { notifications, removeNotification } = useNotifications()

  if (!notifications || notifications.length === 0) {
    return null
  }

  const { color, message, id } = notifications[0]

  const closeSnackbar = () => {
    removeNotification(id)
  }

  if (color === 'default') {
    return (
      <MUISnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{ bottom: { xs: 90, sm: 16 } }}
        open
        autoHideDuration={5000}
        onClose={() => closeSnackbar()}
        TransitionComponent={SlideTransition}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={() => closeSnackbar()}
          >
            <Close />
          </IconButton>,
        ]}
      />
    )
  }

  return (
    <MUISnackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      sx={{ bottom: { xs: 90, sm: 16 } }}
      open
      autoHideDuration={5000}
      onClose={() => closeSnackbar()}
      TransitionComponent={SlideTransition}
    >
      <Alert elevation={6} variant="filled" onClose={() => closeSnackbar()} severity={color}>
        {message}
      </Alert>
    </MUISnackbar>
  )
}
