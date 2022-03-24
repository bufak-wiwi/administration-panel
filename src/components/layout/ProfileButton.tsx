import { DarkMode, LightMode, Logout, Settings } from '@mui/icons-material'
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Switch,
  Tooltip,
} from '@mui/material'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useConfirm } from '../../features/Feedback'
import { useAuthentication } from '../../hooks/useAuthentication'
import { useStore } from '../../hooks/useStore'

export default function ProfileButton() {
  const navigate = useNavigate()
  const { confirmDialog } = useConfirm()
  const location = useLocation()
  const { darkMode, toggleDarkMode } = useStore()
  const { user, signOut } = useAuthentication()

  // Menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  if (!user) {
    return (
      <Button color="inherit" onClick={() => navigate('/login', { state: { from: location } })}>
        Login
      </Button>
    )
  }

  return (
    <React.Fragment>
      <Tooltip title="Account-Einstellungen">
        <IconButton size="large" color="inherit" onClick={handleClick}>
          <Avatar sx={{ backgroundColor: 'secondary', width: 40, height: 40 }} alt={user.name}>
            {user.name[0]}
            {user.surname[0]}
          </Avatar>
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 24,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => navigate('/profile')}>
          <Avatar sx={{ backgroundColor: 'secondary' }} alt={user.name}>
            {user.name[0]}
            {user.surname[0]}
          </Avatar>
          Profil
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={(e) => {
            e.stopPropagation()
            toggleDarkMode()
          }}
        >
          <ListItemIcon>
            {darkMode ? <DarkMode fontSize="small" /> : <LightMode fontSize="small" />}
          </ListItemIcon>
          Dark mode
          <Switch checked={!!darkMode} />
        </MenuItem>
        <MenuItem onClick={() => navigate('/settings')}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Einstellungen
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => confirmDialog('Möchtest du dich wirklich ausloggen?', signOut, 'error')}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}
