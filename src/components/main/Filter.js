import * as React from 'react';
import {
  Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Divider,
} from '@mui/material';
import CategoryFilter from './CategoryFilter';

export default function ControlledRadioButtonsGroup() {
  const [filter, setValue] = React.useState('latest');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">Filter</FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={filter}
        onChange={handleChange}
      >
        <FormControlLabel value="latest" control={<Radio />} label="Latest" />
        <FormControlLabel value="longest" control={<Radio />} label="Longest" />
        <Divider sx={{ my: 2 }} />
        <FormControlLabel value="complete" control={<Radio />} label="Discussion is complete" />
        <FormControlLabel value="incomplete" control={<Radio />} label="Discussion isn't complete" />
      </RadioGroup>
      <Divider sx={{ my: 3 }} />
      <FormLabel sx={{ mb: 3 }} id="demo-controlled-radio-buttons-group">Tags</FormLabel>
      <CategoryFilter />
    </FormControl>
  );
}
