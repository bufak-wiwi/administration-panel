import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { CSSObject, styled, Theme } from '@mui/material/styles'
import { useLocation, useNavigate } from 'react-router-dom'
import { isNavActive } from '../../utils/functions'
import { sidebarNavItems } from '../../utils/navigationItems'

export const sidebarWidth = 240

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: sidebarWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: '0px', //`calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
})

export const SidebarHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',

  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: sidebarWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
)

export default function Sidebar(props: Props) {
  const { open, setOpen } = props
  const location = useLocation()
  const navigate = useNavigate()

  const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, to: string) => {
    e.stopPropagation()
    navigate(to)
  }

  return (
    <Drawer variant="permanent" open={open}>
      <SidebarHeader>
        <IconButton onClick={() => setOpen(false)}>
          <ChevronLeftIcon />
        </IconButton>
      </SidebarHeader>
      <Divider />
      <List>
        {sidebarNavItems.map(({ to, exact, Icon, name }) => (
          <ListItem button key={to} onClick={(e) => onClick(e, to)}>
            <ListItemIcon>
              <Icon color={isNavActive(to, exact, location.pathname) ? 'primary' : 'inherit'} />
            </ListItemIcon>
            <ListItemText
              primary={name}
              primaryTypographyProps={{
                color: isNavActive(to, exact, location.pathname) ? 'primary' : 'inherit',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
