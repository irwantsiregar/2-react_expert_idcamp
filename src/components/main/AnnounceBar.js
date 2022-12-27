import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from '@mui/material';

export default function AnnounceBar({
  variant, severity, tailwindcss, children,
}) {
  return (
    <Alert variant={variant} severity={severity} className={tailwindcss}>
      {children}
    </Alert>
  );
}

AnnounceBar.propTypes = {
  /** The variant to use. */
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
  /** The severity of the alert. This defines the color and icon used. */
  severity: PropTypes.oneOf(['error', 'info', 'success', 'warning']),
  /** utility class on caildwindcss */
  tailwindcss: PropTypes.string,
  /** The content of the component. */
  children: PropTypes.object,
};

AnnounceBar.defaultProps = {
  severity: 'success',
  variant: 'standard',
};
