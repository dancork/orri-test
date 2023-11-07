import Box from '@mui/material/Box'
import { Toolbar } from '@mui/material'

import { useAppBarHeight } from '../../hooks/useAppBarHeight'

export const Screen = ({
  children,
  ...props
}: React.ComponentProps<typeof Box>) => {
  const appBarHeight = useAppBarHeight()

  return (
    <>
      <Toolbar />
      <Box p={2} minHeight={`calc(100vh - ${appBarHeight}px)`} {...props}>
        {children}
      </Box>
    </>
  )
}
