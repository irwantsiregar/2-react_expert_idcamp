import * as React from 'react';
import {
  Grid, Box, Typography, Link, Container, Checkbox, FormControlLabel, TextField, CssBaseline, Avatar, Button,
} from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import EmailIcon from '@mui/icons-material/Email';

export default function Profile() {
  return (
    <Container component="main" maxWidth="md" className="pt-3 md:pt-8">
      <CssBaseline />
      <Box className="flex flex-col items-center min-h-[28rem] pt-20 md:pt-24 px-2 rounded-lg md:border border-solid border-slate-100 bg-slate-50 md:bg-transparent">
        <Avatar
          alt="Nadia"
          src="/images/girl.jpg"
          sx={{ width: 200, height: 200 }}
          className="mb-3"
        />
        <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
          Nadia Validate
        </Typography>
        <Typography component="h5" variant="body1">
          <EmailIcon className="mr-2 text-slate-500" />
          nadiavalidate@gmail.com
        </Typography>
      </Box>
    </Container>
  );
}
