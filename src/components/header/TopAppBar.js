import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, MenuItem, Tooltip, Link, Button,
  Badge, Avatar, ListItemIcon,
} from '@mui/material';
import ControlCameraIcon from '@mui/icons-material/ControlCamera';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/material/styles';
import ToggleTheme from '../ToggleTheme';
import Modal from '../main/Modal';
import LoginInput from '../main/authUser/LoginInput';
import useModal from '../../hooks/useModal';

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

export default function TopAppBar({
  authUser, logOut, login, message,
}) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [openModal, onModalChange] = useModal(false);

  const handleCloseNavMenuOpenModal = () => {
    onModalChange(true);
    setAnchorElNav(null);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const renderAfterLogin = () => (
    <>
      <Box className="pr-5 md:pr-2">
        <Tooltip title={authUser.name}>
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar alt={authUser.name} src={authUser.avatar} fontSize="small" />
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
          <MenuItem component="a" href={`/${authUser.name.toLowerCase().split(' ').join('-')}`} onClick={handleCloseUserMenu}>
            <ListItemIcon>
              <PersonOutlineIcon />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={logOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            Sign Out
          </MenuItem>
        </Menu>
      </Box>
      <ToggleTheme />
    </>
  );

  const renderBeforeLogin = () => (
    <>
      <Modal open={openModal} handleClose={() => onModalChange(false)}>
        <LoginInput login={login} message={message} />
      </Modal>
      <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
        <Button onClick={() => onModalChange(true)} variant="outlined" color="primary" sx={{ mr: 2 }}>
          SIGN IN
        </Button>
        <Link href="/register" underline="none">
          <Button variant="contained" color="primary">
            SIGN UP
          </Button>
        </Link>
      </Box>
      <ToggleTheme />
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
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
          <MenuItem onClick={handleCloseNavMenuOpenModal}>
            <ListItemIcon>
              <LoginIcon />
            </ListItemIcon>
            Sign In
          </MenuItem>
          <MenuItem component="a" href="/register" onClick={handleCloseUserMenu}>
            <ListItemIcon>
              <HowToRegIcon />
            </ListItemIcon>
            Sign Up
          </MenuItem>
        </Menu>
      </Box>
    </>
  );

  return (
    <AppBar sx={{ bgcolor: '#f8fafc' }} position="static" className="bg-dark">
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
          {
            authUser ? renderAfterLogin() : renderBeforeLogin()
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}

TopAppBar.propTypes = {
  authUser: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.object.isRequired]),
  logOut: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  message: PropTypes.string,
};
