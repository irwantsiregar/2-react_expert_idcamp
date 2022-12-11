import * as React from 'react';
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
      renderInput={(params) => <TextField {...params} label="-select category-" />}
    />
  );
}
