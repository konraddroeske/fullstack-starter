import router from '../router';
import {
  postTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from '../../controllers';

router.route('/todos/:id').get(getTodo).put(updateTodo).delete(deleteTodo);

router.route('/todos').get(getTodos).post(postTodo);

export default router;
