import CssBaseline from '@mui/material/CssBaseline'

import { AllTheProviders } from './AllTheProviders'
import { AppBar } from './layout/AppBar'
import { AppRoutes } from './navigation/AppRoutes'

export const App = () => (
  <AllTheProviders>
    <CssBaseline />
    <AppBar />
    <AppRoutes />
  </AllTheProviders>
)
