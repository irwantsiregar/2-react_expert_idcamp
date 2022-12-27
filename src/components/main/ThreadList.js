import * as React from 'react';
import PropTypes from 'prop-types';
import {
  CssBaseline, Box, Container, Alert,
} from '@mui/material';
import ThreadItem from './ThreadItem';
import SearchInput from './SearchInput';

export default function ThreadList({
  threads, upvoteThread, downvoteThread,
  keyword, keywordChange, category, categoryChange,
  timePosted, timePostedChange,
}) {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" className="min-h-screen border-x-2 border-solid border-slate-300">
        <Box className="flex justify-end p-4">
          <SearchInput
            threads={threads}
            keyword={keyword}
            keywordChange={keywordChange}
            category={category}
            categoryChange={categoryChange}
            timePosted={timePosted}
            timePostedChange={timePostedChange}
          />
        </Box>
        <Box className="md:flex flex-wrap pb-24 md:pb-32">
          {
            threads.map((thread) => (
              <ThreadItem
                key={thread.id}
                {...thread}
                upvoteThread={upvoteThread}
                downvoteThread={downvoteThread}
              />
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
  keyword: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  timePosted: PropTypes.string.isRequired,
  keywordChange: PropTypes.func.isRequired,
  categoryChange: PropTypes.func.isRequired,
  timePostedChange: PropTypes.func.isRequired,
};
