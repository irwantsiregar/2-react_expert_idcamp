import { configureStore } from '@reduxjs/toolkit';
import { goalsReducer } from './goals/reducer';
import { thunk, todoDeletionCheck } from './middlewares';
import { todosReducer } from './todos/reducer';

const store = configureStore({
  reducer: {
    todos: todosReducer,
    goals: goalsReducer,
  },
  middleware: [thunk, todoDeletionCheck],
});

export { store };
