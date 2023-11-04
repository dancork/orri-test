import * as React from 'react'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import MuiAppBar from '@mui/material/AppBar'

import { Logo } from '../assets/Logo'
import { MappedNavLink } from '../navigation/MappedNavLink'
import { Icon } from '../assets/Icon'

const pages = [
  ['Appointments', '/appointments'],
  ['Schedules', '/schedules'],
]

export const AppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleCloseNavMenu = () => setAnchorElNav(null)

  return (
    <MuiAppBar position="fixed">
      <Toolbar>
        <Box
          sx={{
            flexGrow: 1,
            alignItems: 'center',
            gap: 1,
            display: { xs: 'flex', md: 'none' },
          }}
        >
          <IconButton
            size="large"
            aria-label="Open navigation menu"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={(event: React.MouseEvent<HTMLElement>) => {
              setAnchorElNav(event.currentTarget)
            }}
            color="inherit"
          >
            <Icon icon="bars" />
          </IconButton>
          <Menu
            id="menu-appbar"
            MenuListProps={{
              component: 'div',
            }}
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map(([title, url]) => (
              <MenuItem
                key={title}
                href={url}
                component={MappedNavLink}
                onClick={handleCloseNavMenu}
              >
                {title}
              </MenuItem>
            ))}
          </Menu>
          <Logo />
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            alignItems: 'center',
            gap: 4,
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <Logo />
          <Box
            sx={{
              flexGrow: 1,
              alignItems: 'center',
              gap: 1,
              display: 'flex',
            }}
          >
            {pages.map(([title, url]) => (
              <Button
                key={title}
                href={url}
                LinkComponent={MappedNavLink}
                onClick={handleCloseNavMenu}
                sx={{ color: 'white', display: 'block' }}
              >
                {title}
              </Button>
            ))}
          </Box>
        </Box>
      </Toolbar>
    </MuiAppBar>
  )
}
