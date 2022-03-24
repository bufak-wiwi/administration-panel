import MenuIcon from '@mui/icons-material/Menu'
import { Toolbar, Typography, AppBar, Theme } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import ProfileButton from './ProfileButton'
import { sidebarWidth } from './Sidebar'

interface Props {
  title?: string
  open: boolean
  setOpen: (open: boolean) => void
}

export default function Header(props: Props) {
  const { title, open, setOpen } = props

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme: Theme) => theme.zIndex.drawer + 1,
        transition: (theme: Theme) =>
          theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        ...(open && {
          marginLeft: sidebarWidth,
          width: `calc(100% - ${sidebarWidth}px)`,
          transition: (theme: Theme) =>
            theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
        }),
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => setOpen(true)}
          edge="start"
          sx={{
            marginRight: '36px',
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {title || 'KONFETTI'}
        </Typography>
        <ProfileButton />
      </Toolbar>
    </AppBar>
  )
}
