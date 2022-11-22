import React from 'react';
import PropTypes from 'prop-types';

function TodoItem({
  id, text, complete, toggleTodo, deleteTodo,
}) {
  return (
    <div>
      <input type="checkbox" onChange={() => toggleTodo(id)} checked={complete} />
      <span>{text}</span>
      <button onClick={() => deleteTodo(id)}>x</button>
    </div>
  );
}

TodoItem.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  complete: PropTypes.bool.isRequired,
  toggleTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
};

export default TodoItem;
