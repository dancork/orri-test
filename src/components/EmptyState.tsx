import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

import { useAppBarHeight } from '../hooks/useAppBarHeight'

type EmptyStateProps = {
  heading: string
  body: string
  action: React.ReactNode
}

export const EmptyState = ({ heading, body, action }: EmptyStateProps) => {
  const appBarHeight = useAppBarHeight()
  return (
    <Container
      sx={{
        height: `calc(100vh - ${appBarHeight + 32}px)`,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Typography variant="subtitle1" component="h2" textAlign="center">
        {heading}
      </Typography>
      <Typography variant="body2" component="p" textAlign="center">
        {body}
      </Typography>
      {action}
    </Container>
  )
}
