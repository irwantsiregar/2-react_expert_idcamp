import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Drawer } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Filter from './Filters';

export default function TemporaryDrawer({
  threads, toggleDrawer, anchor, drawer,
  category, categoryChange,
  timePosted, timePostedChange,
}) {
  const list = () => (
    <Box
      sx={{ maxWidth: { xs: 'auto', sm: 500 } }}
      role="presentation"
      className="pl-7 pr-3 py-6"
    >
      <Box className="flex justify-end pr-4">
        <CloseIcon onClick={toggleDrawer} />
      </Box>
      <Filter
        threads={threads}
        category={category}
        categoryChange={categoryChange}
        timePosted={timePosted}
        timePostedChange={timePostedChange}
      />
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

TemporaryDrawer.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  drawer: PropTypes.bool.isRequired,
  anchor: PropTypes.string.isRequired,
};
