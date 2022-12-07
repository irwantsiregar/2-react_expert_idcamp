import React from 'react';
import {
  Container, Box, Alert, Typography,
} from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';

export default function NotFoundPage() {
  return (
    <Container maxWidth="xl" className="">
      <Box className="h-screen md:flex flex-col justify-center items-center">
        <Box className="md:w-1/2 h-full pt-28">
          <Box className="text-center py-3 border border-blue-300 rounded-md">
            <Typography component="h2" variant="h2" className="text-blue-400">
              4
              <LanguageIcon sx={{ width: 55, height: 55 }} color="success" />
              4
            </Typography>
            <Typography component="h5" variant="h5" className="text-slate-600">
              Page Not Found !
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
