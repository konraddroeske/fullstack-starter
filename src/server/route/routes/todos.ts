import { Request, Response } from 'express';
import router from '../router';
import Test from '../../models/test';
import { postTodo, getTodos, getTodo } from '../../controllers/todos';

router.route('/todos/:id').get(getTodo);

router
  .route('/todos')
  .get(getTodos)
  .post(postTodo)
  .put((req: Request, res: Response) => {
    const { text } = new Test(`I put this somewhere: ${req.body.text}`);
    res.json({ text });
  })
  .delete((req: Request, res: Response) => {
    const { text } = new Test(`I deleted this one : ${req.body.text}`);
    res.json({ text });
  });

export default router;
