import * as React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import {
  Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, Box,
} from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ShareIcon from '@mui/icons-material/Share';
import { red } from '@mui/material/colors';
import { postedAt } from '../../utils/FormatPostedAt';
import Modal from './Modal';
import useModal from '../../hooks/useModal';

export default function CommentThread({
  threadId, id, content, createdAt, owner, upVotesBy, downVotesBy, authUser, vote,
}) {
  const [openModal, onModalChange] = useModal(false);

  const isThreadCommentUpVote = authUser ? upVotesBy.includes(authUser.id) : false;
  const isThreadCommentDownVote = authUser ? downVotesBy.includes(authUser.id) : false;

  const onUpVoteCommentThreadClick = (event) => {
    event.stopPropagation();
    (!authUser) ? onModalChange(true) : vote.upVoteCommentThread(threadId, id);
  };

  const onDownVoteCommentThreadClick = (event) => {
    event.stopPropagation();
    (!authUser) ? onModalChange(true) : vote.downVoteCommentThread(threadId, id);
  };

  return (
    <>
      <Modal open={openModal} handleClose={() => onModalChange(false)} />
      <Card className="text-2xl" sx={{ px: { md: 4 }, py: { md: 2 }, mb: 4 }}>
        <CardHeader
          avatar={(
            <Avatar src={owner.avatar} alt={owner.name} sx={{ bgcolor: red[500], width: 34, height: 34 }} aria-label="recipe" />
          )}
          title={owner.name}
          subheader={postedAt(createdAt)}
          className="text-slate-600"
        />
        <CardContent sx={{ py: 0 }}>
          <Typography variant="body1" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Box className="flex w-1/2 pl-4">
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </Box>
          <Box className="flex w-1/2 justify-end pr-4">
            <IconButton onClick={onDownVoteCommentThreadClick} aria-label="disliked thread">
              <ThumbDownOffAltIcon className={isThreadCommentDownVote ? 'text-red-500' : ''} />
            </IconButton>
            <Typography className="py-2 pr-2" variant="body2" color="text.secondary">
              {downVotesBy.length}
            </Typography>
            <IconButton onClick={onUpVoteCommentThreadClick} aria-label="liked thread" component="p" title="35">
              <ThumbUpOffAltIcon className={isThreadCommentUpVote ? 'text-blue-500' : ''} />
            </IconButton>
            <Typography className="py-2" variant="body2" color="text.secondary">
              {upVotesBy.length}
            </Typography>
          </Box>
        </CardActions>
      </Card>
    </>
  );
}

CommentThread.propTypes = {
  threadId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.object.isRequired]),
  vote: PropTypes.objectOf(PropTypes.func.isRequired),
};
