import * as React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import {
  Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, Box,
} from '@mui/material';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { red } from '@mui/material/colors';
import Link from '@mui/material/Link';
import { postedAt } from '../../utils/FormatPostedAt';
import Modal from './Modal';
import BlockAccess from './BlockAccess';
import useModal from '../../hooks/useModal';

const theme = createTheme({
  components: {
    // Name of the component
    MuiCardHeader: {
      styleOverrides: {
        // Name of the slot
        title: {
          // Some CSS
          fontSize: '1.1rem',
          fontWeight: 'bold',
        },
      },
    },
  },
});

export default function ThreadItem({
  id, title, body, category, createdAt, upVotesBy, downVotesBy,
  totalComments, user, authUser, upvoteThread, downvoteThread,
}) {
  const [openModal, onModalChange] = useModal(false);

  const isThreadUpVote = authUser ? upVotesBy.includes(authUser.id) : false;
  const isThreadDownVote = authUser ? downVotesBy.includes(authUser.id) : false;

  const onUpVoteThreadClick = (event) => {
    event.stopPropagation();
    (!authUser) ? onModalChange(true) : upvoteThread(id);
  };

  const onDownVoteThreadClick = (event) => {
    event.stopPropagation();
    (!authUser) ? onModalChange(true) : downvoteThread(id);
  };

  return (
    <>
      <Modal open={openModal} handleClose={() => onModalChange(false)}>
        <BlockAccess />
      </Modal>
      <Box className="w-full p-4 md:w-1/2 lg:w-1/3">
        <Card className="text-2xl">
          <ThemeProvider theme={theme}>
            <CardHeader
              avatar={(
                <Avatar src={user.avatar} alt={user.name} sx={{ bgcolor: red[500] }} aria-label="recipe" />
              )}
              title={user.name}
              subheader={postedAt(createdAt)}
              className="text-slate-600"
            />
          </ThemeProvider>
          <CardContent sx={{ py: 0 }}>
            <Link variant="h6" href={`/thread/${id}`} underline="none" color="text.secondary">
              {title}
            </Link>
            <Typography variant="body1" color="text.secondary">
              {
                body.slice(0, 101).concat('..')
              }
            </Typography>
            <Box className="mt-2 p-2 flex">
              <Typography variant="body1" color="text.secondary" className="w-auto rounded-md px-1 mr-2 border border-solid border-blue-300">
                {`#${category}`}
              </Typography>
            </Box>
          </CardContent>
          <CardActions disableSpacing>
            <Box className="flex w-1/2 pl-4">
              <IconButton aria-label="comments" component="a" href={`/thread/${id}`}>
                <CommentIcon />
              </IconButton>
              <Typography className="py-2" variant="body2" color="text.secondary">
                {totalComments}
              </Typography>
              <IconButton aria-label="share" sx={{ ml: 1 }}>
                <ShareIcon />
              </IconButton>
            </Box>
            <Box className="flex w-1/2 justify-end pr-4">
              <IconButton onClick={onDownVoteThreadClick} aria-label="disliked thread">
                <ThumbDownOffAltIcon className={isThreadDownVote ? 'text-red-500' : ''} />
              </IconButton>
              <Typography className="py-2 pr-2" variant="body2" color="text.secondary">
                {downVotesBy.length}
              </Typography>
              <IconButton onClick={onUpVoteThreadClick} aria-label="liked thread" component="p" title="35">
                <ThumbUpOffAltIcon className={isThreadUpVote ? 'text-blue-500' : ''} />
              </IconButton>
              <Typography className="py-2" variant="body2" color="text.secondary">
                {upVotesBy.length}
              </Typography>
            </Box>
          </CardActions>
        </Card>
      </Box>
    </>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  totalComments: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  upvoteThread: PropTypes.func.isRequired,
  downvoteThread: PropTypes.func.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.object.isRequired]),
};
