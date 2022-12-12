import * as React from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import {
  CssBaseline, Container, Card, CardHeader, CardContent, CardActions,
  Avatar, IconButton, Typography, TextField, Alert, Button, Box, Link, Divider,
} from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { postedAt } from '../../utils/FormatPostedAt';
import CommentThread from './CommentThread';
import useInput from '../../hooks/useInput';
import useModal from '../../hooks/useModal';
import Modal from './Modal';
import BlockAccess from './BlockAccess';

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

export default function ThreadDetail({
  id, title, body, category, createdAt, owner, message,
  upVotesBy, downVotesBy, comments, authUser, addComment, vote,
}) {
  const [content, onContentCommentChange] = useInput('');
  const [openModal, onModalChange] = useModal(false);

  const isThreadUpVote = authUser ? upVotesBy.includes(authUser.id) : false;
  const isThreadDownVote = authUser ? downVotesBy.includes(authUser.id) : false;

  const onUpVoteThreadClick = (event) => {
    event.stopPropagation();
    (!authUser) ? onModalChange(true) : vote.upVoteThread(id);
  };

  const onDownVoteThreadClick = (event) => {
    event.stopPropagation();
    (!authUser) ? onModalChange(true) : vote.downVoteThread(id);
  };

  return (
    <>
      <Modal open={openModal} handleClose={() => onModalChange(false)}>
        <BlockAccess />
      </Modal>
      <CssBaseline />
      <Container maxWidth="lg" className="min-h-screen lg:border-x-2 border-solid border-slate-300">
        <Box className="flex flex-col items-center pb-24 pt-2 md:pb-32">
          <Box className="w-full p-4 md:w-3/4">
            <Card className="text-2xl" sx={{ px: { md: 4 }, py: { md: 2 } }}>
              <ThemeProvider theme={theme}>
                <CardHeader
                  avatar={(
                    <Avatar src={owner.avatar} alt={owner.name} sx={{ bgcolor: red[500] }} aria-label="recipe" />
                  )}
                  title={owner.name}
                  subheader={postedAt(createdAt)}
                  className="text-slate-600"
                />
              </ThemeProvider>
              <CardContent sx={{ py: 0 }}>
                <Link variant="h6" href="/thread/1234" underline="none" color="text.secondary">
                  {title}
                </Link>
                <Typography variant="body1" color="text.secondary">
                  {body}
                </Typography>
                <Box className="mt-2 p-2 flex">
                  <Typography variant="body1" color="text.secondary" className="w-auto rounded-md px-1 md:p-1 mr-2 border border-solid border-blue-300">
                    {category}
                  </Typography>
                </Box>
              </CardContent>
              <CardActions disableSpacing>
                <Box className="flex w-1/2 pl-4">
                  <IconButton aria-label="comments">
                    <CommentIcon />
                  </IconButton>
                  <Typography className="py-2" variant="body2" color="text.secondary">
                    {comments.length}
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
            <Divider sx={{ my: 4 }} />
            {/* Add Comments */}
            {
              authUser ? (
                <Card className="text-2xl" sx={{ px: { xs: 2, sm: 4 }, py: { sm: 2 } }}>
                  <CardHeader
                    avatar={(
                      <Avatar sx={{ bgcolor: red[500], width: 34, height: 34 }} aria-label="recipe">
                        <img src={authUser.avatar} alt={authUser.name} />
                      </Avatar>
                    )}
                    title={authUser.name}
                    className="text-slate-600"
                    sx={{ pb: 0 }}
                  />
                  <Box noValidate className="w-full">
                    {
                      message && (
                        <Alert variant="outlined" severity="warning" className="mt-5 mb-1">
                          {message}
                        </Alert>
                      )
                    }
                    <TextField
                      value={content}
                      onChange={onContentCommentChange}
                      multiline
                      rows={5}
                      margin="normal"
                      required
                      fullWidth
                      id="comment"
                      placeholder="Write Comment.."
                      name="comment"
                    />
                    <Box className="md:flex justify-end my-4 mb-7 md:mb-4">
                      <Button
                        type="submit"
                        onClick={() => addComment(content)}
                        variant="outlined"
                        color="primary"
                        sx={{ width: { md: '30%' } }}
                        className="shadow-md"
                        fullWidth
                      >
                        Add Comment
                      </Button>
                    </Box>
                  </Box>
                </Card>
              ) : (
                <Card>
                  <Box className="bg-slate-50 p-2 text-center">
                    <Typography variant="body2" className="text-slate-700">
                      Please login to add a comment. Click the sign in button on the navbar above.
                    </Typography>
                  </Box>
                </Card>
              )
            }
            {/* End Add Comments */}
            <Divider sx={{ my: 5 }} />
            {
              (!(comments.length)) ? (
                <Alert variant="outlined" severity="info">
                  No comments have been added yet
                </Alert>
              )
                : comments.map((comment) => (
                  <CommentThread key={comment.id} authUser={authUser} threadId={id} {...comment} vote={vote} />
                ))
            }
          </Box>
        </Box>
      </Container>
    </>
  );
}

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  upVotesBy: PropTypes.array.isRequired,
  downVotesBy: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
  authUser: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.object.isRequired]),
  addComment: PropTypes.func.isRequired,
  vote: PropTypes.objectOf(PropTypes.func.isRequired),
  message: PropTypes.string.isRequired,
};
