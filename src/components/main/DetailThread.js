import * as React from 'react';
import {
  CssBaseline, Container, Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography, TextField,
  Button, Box, Link, Divider,
} from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import { red } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

export default function RecipeReviewCard() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" className="min-h-screen lg:border-x-2 border-solid border-slate-300">
        <Box className="flex flex-col items-center pb-24 pt-2 md:pb-32">
          <Box className="w-full p-4 md:w-3/4">
            <Card className="text-2xl" sx={{ px: { md: 4 }, py: { md: 2 } }}>
              <ThemeProvider theme={theme}>
                <CardHeader
                  avatar={(
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      R
                    </Avatar>
                  )}
                  title="Shrimp Chorizo Paella"
                  subheader="September 14, 2016"
                  className="text-slate-600"
                />
              </ThemeProvider>
              <CardContent sx={{ py: 0 }}>
                <Link variant="h6" href="/thread/1234" underline="none" color="text.secondary">
                  Learning React and Redux
                </Link>
                <Typography variant="body1" color="text.secondary">
                  This impressive paella is a perfect party dish and a fun meal to cook
                  together with your guests. Add 1 cup of frozen peas along with the mussels,
                  if you like.
                  This impressive paella is a perfect party dish and a fun meal to cook
                  together with your guests. Add 1 cup of frozen peas along with the mussels,
                  if you like.
                  This impressive paella is a perfect party dish and a fun meal to cook
                  together with your guests. Add 1 cup of frozen peas along with the mussels,
                  if you like.
                </Typography>
                <Box className="mt-2 p-2 flex">
                  <Typography variant="body1" color="text.secondary" className="w-auto rounded-md px-1 md:p-1 mr-2 border border-solid border-blue-300">
                    #fundamentals
                  </Typography>
                </Box>
              </CardContent>
              <CardActions disableSpacing>
                <Box className="flex w-1/2 pl-4">
                  <IconButton aria-label="comments">
                    <CommentIcon />
                  </IconButton>
                  <Typography className="py-2" variant="body2" color="text.secondary">
                    12
                  </Typography>
                  <IconButton aria-label="share" sx={{ ml: 1 }}>
                    <ShareIcon />
                  </IconButton>
                </Box>
                <Box className="flex w-1/2 justify-end pr-4">
                  <IconButton aria-label="disliked thread">
                    <ThumbDownOffAltIcon className="text-red-500" />
                  </IconButton>
                  <Typography className="py-2 pr-2" variant="body2" color="text.secondary">
                    5
                  </Typography>
                  <IconButton aria-label="liked thread" component="p" title="35">
                    <ThumbUpOffAltIcon className="text-blue-500" />
                  </IconButton>
                  <Typography className="py-2" variant="body2" color="text.secondary">
                    47
                  </Typography>
                </Box>
              </CardActions>
            </Card>
            <Divider sx={{ my: 5 }} />
            {/* Add Comments */}
            <Card className="text-2xl" sx={{ px: { xs: 2, sm: 4 }, py: { sm: 2 } }}>
              <CardHeader
                avatar={(
                  <Avatar sx={{ bgcolor: red[500], width: 34, height: 34 }} aria-label="recipe">
                    R
                  </Avatar>
                )}
                title="Nadia Validate"
                className="text-slate-600"
                sx={{ pb: 0 }}
              />
              <Box component="form" noValidate className="w-full">
                <TextField
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
                    fullWidth
                    variant="outlined"
                    color="primary"
                    sx={{ width: { md: '30%' } }}
                    className="shadow-md"
                  >
                    Add Comment
                  </Button>
                </Box>
              </Box>
            </Card>
            {/* End Add Comments */}
            <Divider sx={{ my: 5 }} />
            {/* Start Comments */}
            <Card className="text-2xl" sx={{ px: { md: 4 }, py: { md: 2 } }}>
              <CardHeader
                avatar={(
                  <Avatar sx={{ bgcolor: red[500], width: 34, height: 34 }} aria-label="recipe">
                    R
                  </Avatar>
                )}
                title="David Baristo"
                subheader="September 14, 2016"
                className="text-slate-600"
              />
              <CardContent sx={{ py: 0 }}>
                <Typography variant="body1" color="text.secondary">
                  This is comment paella is a perfect party dish and a fun meal to cook
                  together with your guests.
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Box className="flex w-1/2 pl-4">
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                </Box>
                <Box className="flex w-1/2 justify-end pr-4">
                  <IconButton aria-label="disliked thread">
                    <ThumbDownOffAltIcon className="text-red-500" />
                  </IconButton>
                  <Typography className="py-2 pr-2" variant="body2" color="text.secondary">
                    1
                  </Typography>
                  <IconButton aria-label="liked thread" component="p" title="35">
                    <ThumbUpOffAltIcon className="text-blue-500" />
                  </IconButton>
                  <Typography className="py-2" variant="body2" color="text.secondary">
                    9
                  </Typography>
                </Box>
              </CardActions>
            </Card>
            {/* End Comments */}
          </Box>
        </Box>
      </Container>
    </>
  );
}
