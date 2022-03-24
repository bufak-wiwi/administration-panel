import { Backdrop, CircularProgress } from '@mui/material'

interface Props {
  invisible?: boolean
  loading?: boolean
}

export function LoadingOverlay({ loading = true, invisible = false }: Props) {
  if (!loading) {
    return null
  }

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
      invisible={invisible}
    >
      <CircularProgress color="secondary" />
    </Backdrop>
  )
}
