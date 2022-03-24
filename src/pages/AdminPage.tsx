import { Card, CardContent, Typography } from '@mui/material'

export default function AdminPage() {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Admin-Bereich
        </Typography>
        Content only for admins!
      </CardContent>
    </Card>
  )
}
