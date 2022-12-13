import * as React from 'react';
import PropTypes from 'prop-types';
import {
  CssBaseline, Box, Container,
} from '@mui/material';
import ThreadItem from './ThreadItem';
import SearchInput from './SearchInput';

export default function ThreadList({
  threads, upvoteThread, downvoteThread, keyword, keywordChange,
}) {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" className="min-h-screen border-x-2 border-solid border-slate-300">
        <Box className="flex justify-end p-4">
          <SearchInput keyword={keyword} keywordChange={keywordChange} />
        </Box>
        <Box className="md:flex flex-wrap pb-24 md:pb-32">
          {
            threads.map((thread) => (
              <ThreadItem key={thread.id} {...thread} upvoteThread={upvoteThread} downvoteThread={downvoteThread} />
            ))
          }
        </Box>
      </Container>
    </>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.array.isRequired,
  upvoteThread: PropTypes.func.isRequired,
  downvoteThread: PropTypes.func.isRequired,
  keywordChange: PropTypes.func.isRequired,
  keyword: PropTypes.string.isRequired,
};
