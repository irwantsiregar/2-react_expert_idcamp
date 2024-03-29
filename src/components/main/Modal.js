import * as React from 'react';
import PropTypes from 'prop-types';
import { Typography, Modal, Stack } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%  )',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export default function ModalCustom({ open, handleClose, children }) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Stack sx={style} className="border border-blue-400 rounded-lg">
        <Typography id="button-close" className="pr-3 pt-2 text-right">
          <CloseIcon onClick={handleClose} className="hover:cursor-pointer" />
        </Typography>
        {children}
      </Stack>
    </Modal>
  );
}

ModalCustom.propTypes = {
  /** function to handle closing the modal when the button is clicked  */
  handleClose: PropTypes.func.isRequired,
  /** value set by the user. defaults false to close and true to open modal. */
  open: PropTypes.bool.isRequired,
  /** values attached as child modals such as strings or html elements */
  children: PropTypes.object,
};
