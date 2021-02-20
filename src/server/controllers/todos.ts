import { Request, Response } from 'express';
import pool from '../db';

export const getTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      id,
    ]);

    res.json(todo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
};

export const getTodos = async (req: Request, res: Response) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2', [
      description,
      id,
    ]);

    res.json('Todo was updated.');
  } catch (err) {
    console.log(err);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);

    res.json('Todo was deleted.');
  } catch (err) {
    console.log(err);
  }
};

export const postTodo = async (req: Request, res: Response) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo(description) VALUES($1) RETURNING *',
      [description],
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
};

// export { postTodo, getTodos, getTodo, updateTodo, deleteTodo };
