import CssBaseline from '@mui/material/CssBaseline'

import { AllTheProviders } from './AllTheProviders'
import { AppBar } from './layout/AppBar'
import { AppRoutes } from './navigation/AppRoutes'

export const App = () => {
  return (
    <AllTheProviders>
      <CssBaseline />
      <AppBar />
      <AppRoutes />
    </AllTheProviders>
  )
}
