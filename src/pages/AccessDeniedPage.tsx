import { Box, Typography } from '@mui/material'
import AccessDeniedSVG from '../assets/AccessDeniedSVG'

export default function AccessDeniedPage() {
  return (
    <>
      <Box sx={{ maxWidth: 500, mx: 'auto' }}>
        <AccessDeniedSVG width={'100%'} />
      </Box>
      <Typography variant="h2" component="div" sx={{ textAlign: 'center' }}>
        Zugang verweigert
      </Typography>
    </>
  )
}
