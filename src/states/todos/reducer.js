import { ActionType } from './action';

function todosReducer(todos = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_TODOS:
      return action.payload.todos;
    case ActionType.ADD_TODO:
      return [...todos, action.payload];
    case ActionType.DELETE_TODO:
      return todos.filter((todo) => todo.id !== action.payload.id);
    case ActionType.TOGGLE_TODO:
      return todos.map((todo) => (todo.id === action.payload.id ? { ...todo, complete: !todo.complete } : todo));
    default:
      return todos;
  }
}

export { todosReducer };
