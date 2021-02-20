import { postTodo, getTodos, getTodo } from './todos';

// The order of middlewares matter
export default {
  postTodo,
  getTodos,
  getTodo,
};
