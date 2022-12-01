import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar, Container, Box, CssBaseline, Toolbar, IconButton, Fab, Link,
} from '@mui/material';
import ForumIcon from '@mui/icons-material/Forum';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AddIcon from '@mui/icons-material/Add';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -20,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function BottomAppBar() {
  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ top: 'auto', bottom: 0, bgcolor: '#f8fafc' }}
      >
        <Container maxWidth="sm">
          <Toolbar>
            <IconButton aria-label="threads">
              <Link href="/" underline="none">
                <ForumIcon sx={{ color: '#3b82f6' }} fontSize="large" />
              </Link>
            </IconButton>
            <StyledFab aria-label="add">
              <Link href="/add-thread" underline="none">
                <AddIcon sx={{ color: '#2563eb', fontSize: 30 }} />
              </Link>
            </StyledFab>
            <Box sx={{ flexGrow: 1 }} />
            <IconButton>
              <Link href="/standings" underline="none">
                <LeaderboardIcon sx={{ color: '#3b82f6' }} fontSize="large" />
              </Link>
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
