import * as React from 'react';
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

export default function ThreadItem() {
  return (
    <Box className="w-full p-4 md:w-1/2 lg:w-1/3">
      <Card className="text-2xl">
        <ThemeProvider theme={theme}>
          <CardHeader
            avatar={(
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
              </Avatar>
            )}
            title="Shrimp and Chorizo Paella"
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
          </Typography>
          <Box className="mt-2 p-2 flex">
            <Typography variant="body1" color="text.secondary" className="w-auto rounded-md px-1 mr-2 border border-solid border-blue-300">
              #redux
            </Typography>
          </Box>
        </CardContent>
        <CardActions disableSpacing>
          <Box className="flex w-1/2 pl-4">
            <IconButton aria-label="comments" component="a" href="/thread/1234">
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
    </Box>
  );
}
