import * as React from 'react';
import PropTypes from 'prop-types';
import { Autocomplete, TextField } from '@mui/material';

export default function CategoryFilter({
  categoryThread,
  category,
  categoryChange,
}) {
  return (
    <Autocomplete
      value={category}
      onChange={(event, value) => categoryChange(value || '')}
      isOptionEqualToValue={() => true}
      id="category"
      options={categoryThread}
      sx={{ width: 'auto' }}
      renderInput={(params) => <TextField {...params} label="Select Category" />}
    />
  );
}

CategoryFilter.propTypes = {
  category: PropTypes.string.isRequired,
  categoryThread: PropTypes.array.isRequired,
  categoryChange: PropTypes.func.isRequired,
};
