import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, Container, CssBaseline, Avatar,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';

export default function Profile({ avatar, name, email }) {
  return (
    <Container component="main" maxWidth="md" className="pt-3 md:pt-8">
      <CssBaseline />
      <Box className="flex flex-col items-center min-h-[28rem] pt-20 md:pt-24 px-2 rounded-lg md:border border-solid border-slate-100 bg-slate-50 md:bg-transparent">
        <Avatar
          alt={name}
          src={avatar}
          sx={{ width: 200, height: 200 }}
          className="mb-3"
        />
        <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
          {name}
        </Typography>
        <Typography component="h5" variant="body1">
          <EmailIcon className="mr-2 text-slate-500" />
          {email}
        </Typography>
      </Box>
    </Container>
  );
}

Profile.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};
