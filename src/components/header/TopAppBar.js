import * as React from 'react';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, MenuItem, Tooltip,
  Badge, Avatar, ListItemIcon,
} from '@mui/material';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import ToggleTheme from '../ToggleTheme';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function TopAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar sx={{ bgcolor: '#f8fafc' }} position="static">
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <ControlCameraIcon className="text-blue-500 bg-slate-50 mr-1 rounded-lg" />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: 'flex',
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: '#3b82f6',
              textDecoration: 'none',
            }}
          >
            DISKUS
          </Typography>
          <Box className="pr-5 md:pr-2">
            <Tooltip title="Nadia Validate">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar alt="Nadia Validate" src="/images/girl.jpg" fontSize="small" />
                </StyledBadge>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem component="a" href="/profile" onClick={handleCloseUserMenu}>
                <ListItemIcon>
                  <PersonOutlineIcon />
                </ListItemIcon>
                Profile
              </MenuItem>
              <MenuItem component="a" href="/" onClick={handleCloseUserMenu}>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>

          {/* Line */}

          {/* <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            <Link href="/login" underline="none">
              <Button variant="outlined" color="primary" sx={{ mr: 2 }}>
                LOGIN
              </Button>
            </Link>
            <Link href="/register" underline="none">
              <Button variant="contained" color="primary">
                REGISTER
              </Button>
            </Link>
          </Box> */}

          <ToggleTheme />

          {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
            <Menu
              id="menu-appbar"
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
                <MenuItem component="a" href="/login" onClick={handleCloseUserMenu}>
                  <ListItemIcon>
                    <LoginIcon />
                  </ListItemIcon>
                  Login
                </MenuItem>
                <MenuItem component="a" href="/register" onClick={handleCloseUserMenu}>
                  <ListItemIcon>
                    <HowToRegIcon />
                  </ListItemIcon>
                  Register
                </MenuItem>
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
