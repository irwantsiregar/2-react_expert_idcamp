import * as React from 'react';
import {
  Box, Typography, Container, TextField, CssBaseline, Avatar, Button,
} from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export default function AddThread() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Container component="main" maxWidth="md" className="pt-3 md:pt-8">
      <CssBaseline />
      <Box className="flex flex-col items-center min-h-screen pt-5 px-2 md:pt-8 rounded-lg md:border border-solid border-slate-100">
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <QuestionMarkIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Discussion
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="title"
            label="Title Discuss"
            name="title"
            autoFocus
          />
          <TextField
            multiline
            rows={5}
            margin="normal"
            required
            fullWidth
            id="body"
            label="Body Discuss"
            name="body"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="category"
            name="category"
            label="Category"
          />
          <Box className="md:flex justify-end my-4">
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              sx={{ width: { md: '50%' } }}
              className="shadow-lg"
            >
              Create Discussion
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
