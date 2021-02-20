import { Request, Response } from 'express';
// import Test from '../models/test';
import pool from '../db';

const postTodo = async (req: Request, res: Response) => {
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

const getTodo = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
  } catch (err) {
    console.log(err.message);
  }
};

const getTodos = async (req: Request, res: Response) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
};

export { postTodo, getTodos, getTodo };
