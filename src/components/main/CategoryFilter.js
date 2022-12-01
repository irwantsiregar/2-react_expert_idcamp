import * as React from 'react';
import { Autocomplete, TextField } from '@mui/material';

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godmother', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: 'Angry Men', year: 1957 },
  { title: 'List', year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
];

export default function CategoryFilter() {
  return (
    <Autocomplete
      multiple
      limitTags={2}
      id="multiple-limit-tags"
      options={top100Films}
      getOptionLabel={(option) => option.title}
      defaultValue={[top100Films[6], top100Films[4]]}
      renderInput={(params) => (
        <TextField {...params} label="limit" placeholder="tag" />
      )}
    />
  );
}
