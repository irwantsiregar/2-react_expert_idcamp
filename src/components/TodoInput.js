import React, { useState } from 'react';
import PropTypes from 'prop-types';

function TodoInput({ addTodo }) {
  const [text, setText] = useState('');

  const onTextChangeHandler = ({ target }) => setText(target.value);

  return (
    <div>
      <input type="text" value={text} onChange={onTextChangeHandler} />
      <button onClick={() => addTodo(text)}>Add todo</button>
    </div>
  );
}

TodoInput.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

export default TodoInput;
