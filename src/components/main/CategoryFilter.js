import * as React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const category = [
  { id: 208, title: 'JavaScript' },
  { id: 154, title: 'React' },
  { id: 172, title: 'Redux' },
  { id: 174, title: 'Fundamentals' },
  { id: 157, title: 'React Router' },
  { id: 193, title: 'React Saga' },
];

export default function CategoryFilter() {
  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={category}
      getOptionLabel={(categories) => categories.title}
      defaultValue={[category[1], category[2]]}
      renderInput={(params) => (
        <TextField {...params} label="limit" placeholder="tag" />
      )}
    />
  );
}
