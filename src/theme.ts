import { createTheme } from '@mui/material/styles'
import { grey } from '@mui/material/colors'

import { MappedLink } from './components/navigation/MappedLink'

const theme = createTheme({
  palette: {
    primary: {
      main: '#ea6f4d',
    },
    background: {
      default: grey['100'],
    },
    secondary: {
      main: '#4CA48B',
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiLink: {
      defaultProps: {
        component: MappedLink,
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: MappedLink,
        // disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
      variants: [
        {
          props: { variant: 'outlined' },
          style: {
            // backgroundColor: '#fff',
          },
        },
      ],
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiAutocomplete: {
      defaultProps: {
        componentsProps: { paper: { elevation: 3 } },
      },
    },
  },
  typography: {
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    h1: {
      fontWeight: 500,
    },
    h2: {
      fontWeight: 500,
    },
    h3: {
      fontWeight: 500,
    },
    h4: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    subtitle1: {
      fontWeight: 500,
    },
    subtitle2: {
      fontWeight: 500,
    },
    body1: {
      fontWeight: 300,
    },
    body2: {
      fontWeight: 300,
    },
    caption: {
      fontWeight: 300,
    },
    button: {
      textTransform: 'revert',
    },
  },
})

export default theme
