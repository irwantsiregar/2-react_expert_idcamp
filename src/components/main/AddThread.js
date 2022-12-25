import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Typography, Container, TextField, CssBaseline,
  Avatar, Button, Alert,
} from '@mui/material';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import useInput from '../../hooks/useInput';

export default function AddThread({ addThread, message }) {
  const [title, onTitleChange] = useInput('');
  const [body, onBodyChange] = useInput('');
  const [category, onCategoryChange] = useInput('');

  return (
    <Container component="main" maxWidth="md" className="pt-3 md:pt-8">
      <CssBaseline />
      <Box className="flex flex-col items-center min-h-screen pt-5 px-2 md:pt-8 rounded-lg md:border border-solid border-slate-100">
        <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}>
          <QuestionMarkIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create Discussion
        </Typography>
        <Box noValidate sx={{ mt: 1, pt: 1 }} aria-label="add-thread">
          {
            message && (
              <Alert variant="outlined" severity="warning" className="my-2">
                {message}
              </Alert>
            )
          }
          <TextField
            value={title}
            onChange={onTitleChange}
            name="title"
            id="title"
            label="Title Discuss"
            margin="normal"
            placeholder="React Redux"
            required
            fullWidth
            autoFocus
          />
          <TextField
            value={body}
            onChange={onBodyChange}
            name="body"
            id="body"
            label="Body Discuss"
            margin="normal"
            placeholder="React Ecosystem..."
            rows={5}
            multiline
            required
            fullWidth
          />
          <TextField
            value={category}
            onChange={onCategoryChange}
            name="category"
            id="category"
            label="Category"
            margin="normal"
            placeholder="Redux"
            required
            fullWidth
          />
          <Box className="md:flex justify-end my-4">
            <Button
              onClick={() => addThread({ title, body, category })}
              variant="outlined"
              color="primary"
              fullWidth
              className="shadow-lg"
              sx={{ width: { md: '50%' } }}
            >
              Create Discussion
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

AddThread.propTypes = {
  addThread: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};
