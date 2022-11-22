import React, { useState } from 'react';
import PropTypes from 'prop-types';

function GoalInput({ addGoal }) {
  const [text, setText] = useState('');

  const onTextChangeHandler = ({ target }) => setText(target.value);

  return (
    <div>
      <input type="text" value={text} onChange={onTextChangeHandler} />
      <button onClick={() => addGoal(text)}>Add goal</button>
    </div>
  );
}

GoalInput.propTypes = {
  addGoal: PropTypes.func.isRequired,
};

export default GoalInput;
