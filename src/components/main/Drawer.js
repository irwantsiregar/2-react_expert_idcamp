import * as React from 'react';
import { Box, Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Filter from './Filter';

export default function TemporaryDrawer({ toggleDrawer, anchor, drawer }) {
  const list = () => (
    <Box
      sx={{ width: { xs: 'auto', sm: 500 } }}
      role="presentation"
      className="pl-7 pr-3 py-6"
    >
      <Box className="flex justify-end pr-4">
        <CloseIcon onClick={toggleDrawer} />
      </Box>
      <Filter />
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor={anchor}
        open={drawer}
        onClose={toggleDrawer}
      >
        {list()}
      </Drawer>
    </div>
  );
}
