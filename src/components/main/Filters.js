import * as React from 'react';
import {
  Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Divider,
} from '@mui/material';
import CategoryFilter from './CategoryFilter';

export default function Filters({
  threads, category, categoryChange,
  timePosted, timePostedChange,
}) {
  const categoryThread = Array.from(new Set(threads.map((thread) => thread.category)));

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Filter</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={timePosted}
        onChange={(event) => timePostedChange(event.target.value)}
      >
        <FormControlLabel value="latest" control={<Radio />} label="Latest" />
        <FormControlLabel value="longest" control={<Radio />} label="Longest" />
        <Divider sx={{ my: 2 }} />
        <FormControlLabel value="complete" control={<Radio />} label="Discussion is complete" />
        <FormControlLabel value="incomplete" control={<Radio />} label="Discussion isn't complete" />
      </RadioGroup>
      <Divider sx={{ my: 3 }} />
      <FormLabel sx={{ mb: 3 }} id="demo-controlled-radio-buttons-group">Categories</FormLabel>
      <CategoryFilter
        categoryThread={categoryThread}
        category={category}
        categoryChange={categoryChange}
        timePosted={timePosted}
        timePostedChange={timePostedChange}
      />
    </FormControl>
  );
}
