import * as React from 'react';
import PropTypes from 'prop-types';
import {
  CssBaseline, Box, Container, Alert,
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
        {
          (!(threads.length))
            ? (
              <Box className="md:flex flex-wrap justify-center py-48 px-4">
                <Alert variant="outlined" severity="info">
                  There are no available threads yet
                </Alert>
              </Box>
            )
            : (
              <Box className="md:flex flex-wrap pb-24 md:pb-32">
                {
                  threads.map((thread) => (
                    <ThreadItem key={thread.id} {...thread} upvoteThread={upvoteThread} downvoteThread={downvoteThread} />
                  ))
                }
              </Box>
            )
        }
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
