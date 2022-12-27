import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, Box, Typography, Link, Container, TextField,
  CssBaseline, Avatar, Button, Alert,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useInput from '../../../hooks/useInput';
import Copyright from './Copyright';

const theme = createTheme();

export default function LoginInput({ login, message }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 3,
            marginX: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box noValidate sx={{ mt: 1 }} className="input-group">
            {
              message && (
                <Alert variant="outlined" severity="warning" className="mb-5 bg-red-300">
                  {message}
                </Alert>
              )
            }
            <TextField
              value={email}
              onChange={onEmailChange}
              type="email"
              name="email"
              id="email"
              label="Email"
              placeholder="example@email.com"
              autoComplete="email"
              margin="normal"
              autoFocus
              required
              fullWidth
            />
            <TextField
              value={password}
              onChange={onPasswordChange}
              type="password"
              name="password"
              id="password"
              label="Password"
              placeholder="your password"
              margin="normal"
              required
              fullWidth
            />
            <Button
              onClick={() => login({ email, password })}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/login" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2" data-testid="login-to-register">
                  Dont have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};
