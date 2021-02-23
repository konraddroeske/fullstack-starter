import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import pool from '../db';
import asyncHandler from '../middlewares/async';

export const getTodo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      id,
    ]);

    if (!todo.rows[0]) {
      next(new createError.NotFound(`Todo not found with id of ${id}`));
    }

    res.json(todo.rows[0]);
  },
);

export const getTodos = asyncHandler(async (req: Request, res: Response) => {
  const allTodos = await pool.query('SELECT * FROM todo');
  res.json(allTodos.rows);
});

export const updateTodo = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description } = req.body;

  await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [
    description,
    id,
  ]);

  res.json('Todo was updated.');
});

export const deleteTodo = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);

  res.json('Todo was deleted.');
});

export const postTodo = asyncHandler(async (req: Request, res: Response) => {
  const { description } = req.body;
  const newTodo = await pool.query(
    'INSERT INTO todo(description) VALUES($1) RETURNING *',
    [description],
  );

  res.json(newTodo.rows[0]);
});
