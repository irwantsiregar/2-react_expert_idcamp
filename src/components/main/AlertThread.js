import React from 'react';
import { Box, Alert } from '@mui/material';

export default function AlertThread() {
  return (
    <Box className="md:flex flex-wrap justify-center py-48 px-4">
      <Alert variant="outlined" severity="info">
        There are no available threads yet
      </Alert>
    </Box>
  );
}
