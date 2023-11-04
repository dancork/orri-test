import React from 'react'
import { RecoilRoot } from 'recoil'
import { ThemeProvider } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'

import theme from '../theme'

export const AllTheProviders = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <BrowserRouter basename="/">{children}</BrowserRouter>
    </ThemeProvider>
  </RecoilRoot>
)
