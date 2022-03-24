import { Box, Typography } from '@mui/material'
import NotFoundSVG from '../assets/NotFoundSVG'

export default function NotFoundPage() {
  return (
    <>
      <Box sx={{ maxWidth: 500, mx: 'auto' }}>
        <NotFoundSVG width={'100%'} />
      </Box>
      <Typography variant="h2" component="div" sx={{ textAlign: 'center' }}>
        404: Seite nicht gefunden
      </Typography>
    </>
  )
}
