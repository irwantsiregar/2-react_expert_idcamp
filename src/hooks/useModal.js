import { useState } from 'react';

function useModal(defaultValue = false) {
  const [value, setValue] = useState(defaultValue);

  function handleValueChange(valueBool) {
    setValue(valueBool);
  }

  return [value, handleValueChange, setValue];
}

export default useModal;
