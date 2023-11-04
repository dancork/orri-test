import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import React from 'react'

export const Screen = ({ children }: { children: React.ReactNode }) => (
  <Box
    minHeight="100vh"
    width="100vw"
    display="grid"
    gridTemplateRows="auto 1fr"
  >
    <Toolbar />
    <Box padding={3}>{children}</Box>
  </Box>
)
