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

export default function RegisterInput({ register, message }) {
  const [firstName, onFirstNameChange] = useInput('');
  const [lastName, onLastNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const name = (!lastName) ? firstName : `${firstName} ${lastName}`;

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box noValidate sx={{ mt: 3 }} aria-label="sign-up">
            {
              message && (
                (message === 'success')
                  ? (
                    <Alert variant="outlined" severity="success" className="mb-5">
                      Your account registration has been
                      <strong> successful</strong>
                      . Please
                      <strong> login </strong>
                      to continue.
                    </Alert>
                  )
                  : (
                    <Alert variant="outlined" severity="warning" className="mb-5">
                      {message}
                    </Alert>
                  )
              )
            }
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={firstName}
                  onChange={onFirstNameChange}
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  placeholder="John"
                  autoFocus
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={lastName}
                  onChange={onLastNameChange}
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  label="Last Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={onEmailChange}
                  type="email"
                  name="email"
                  id="email"
                  label="Email Address"
                  placeholder="example@email.com"
                  autoComplete="email"
                  required
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={onPasswordChange}
                  type="password"
                  name="password"
                  placeholder="your password"
                  label="Password"
                  id="password"
                  required
                  fullWidth
                />
              </Grid>
            </Grid>
            <Button
              onClick={() => register({ email, name, password })}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};
