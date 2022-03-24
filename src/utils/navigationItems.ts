import { Home, Settings } from '@mui/icons-material'
import { SvgIconComponent } from '@mui/icons-material'

interface NavItem {
  to: string
  name: string
  exact: boolean
  Icon: SvgIconComponent
}

export const sidebarNavItems: NavItem[] = [
  { to: '/', name: 'Dashboard', exact: true, Icon: Home },
  {
    to: '/settings',
    name: 'Settings',
    exact: true,
    Icon: Settings,
  },
]
