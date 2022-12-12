import * as React from 'react';
import {
  Box, Typography, Avatar, Stack,
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';

export default function BlockAccess() {
  return (
    <Box className="px-8 pb-6">
      <Box className="flex flex-col items-center">
        <Avatar sx={{ mb: 1, bgcolor: 'primary.main' }}>
          <LoginIcon fontSize="large" />
        </Avatar>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Uppss !!
        </Typography>
      </Box>
      <Typography id="modal-modal-description" sx={{ mt: 1 }}>
        You are not logged in. Please login to get service access.
      </Typography>
    </Box>
  );
}
