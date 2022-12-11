import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
// import LoginInput from './authUser/LoginInput';
import CloseIcon from '@mui/icons-material/Close';
import { Close } from '@mui/icons-material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%  )',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export default function Modals({ open, handleClose }) {
  const noname = (_) => _;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack sx={style} className="border border-blue-300 rounded-lg">
        <Typography id="button-close" className="pr-2 pt-1 text-right">
          <CloseIcon onClick={handleClose} className="hover:cursor-pointer" />
        </Typography>
        <Box className="px-8 pb-6">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Uppsss !!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            You are not logged in. Please login to get service access.
            {' '}
            <Link href="/login">Click here</Link>
          </Typography>
        </Box>
        {/* <Box sx={style} className="border border-blue-300 bg-slate-200 rounded-lg">
        <LoginInput login={noname} message="" />
      </Box> */}
      </Stack>
    </Modal>
  );
}

Modals.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};
