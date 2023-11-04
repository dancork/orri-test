import React from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

type EmptyStateProps = {
  heading: string
  body: string
  action: React.ReactNode
}

export const EmptyState = ({ heading, body, action }: EmptyStateProps) => {
  return (
    <Container
      sx={{
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
