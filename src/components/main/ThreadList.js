import * as React from 'react';
import { CssBaseline, Box, Container } from '@mui/material';
import ThreadItem from './ThreadItem';
import SearchInput from './SearchInput';

export default function RecipeReviewCard() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" className="min-h-screen border-x-2 border-solid border-slate-300">
        <Box className="flex justify-end p-4">
          <SearchInput />
        </Box>
        <Box className="md:flex flex-wrap pb-24 md:pb-32">
          <ThreadItem />
          <ThreadItem />
          <ThreadItem />
          <ThreadItem />
          <ThreadItem />
        </Box>
      </Container>
    </>
  );
}
