import Box from '@mui/material/Box'
import React from 'react'
import { Outlet } from 'react-router-dom'
import { useStore } from '../../hooks/useStore'
import ErrorBoundary from './ErrorBoundary'
import Header from './Header'
import Sidebar, { SidebarHeader } from './Sidebar'

interface Props {
  children?: React.ReactNode
  title?: string
}

export function EmptyLayout({ children }: Props) {
  return (
    <Box height="100vh" display="flex">
      <ErrorBoundary>{children ? children : <Outlet />}</ErrorBoundary>
    </Box>
  )
}

export function MainLayout({ children, title }: Props) {
  const { sidebarOpen, setSidebarOpen } = useStore()

  return (
    <Box minHeight="100vh" display="flex">
      <Header title={title} open={sidebarOpen} setOpen={setSidebarOpen} />
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <Box id="test Box" component="main" sx={{ flexGrow: 1, p: 3 }}>
        <SidebarHeader />
        <ErrorBoundary>{children ? children : <Outlet />}</ErrorBoundary>
      </Box>
    </Box>
  )
}
