import { Request, Response, NextFunction } from 'express';
import createError from 'http-errors';
import prisma from '../db';
import asyncHandler from '../middlewares/async';

export const getTodo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const todo = await prisma.todo.findUnique({
      where: {
        todo_id: Number(id),
      },
    });

    if (!todo) {
      return next(createError(404, `Todo not found with id of ${id}.`));
    }

    return res.json(todo);
  },
);

export const getTodos = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allTodos = await prisma.todo.findMany();

    if (!allTodos) {
      return next(createError(404, `Todos not found.`));
    }

    return res.json(allTodos);
  },
);

export const updateTodo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { description } = req.body;

    const todo = await prisma.todo.update({
      where: { todo_id: Number(id) },
      data: { description },
    });

    if (!todo) {
      return next(createError(404, `Todo not found with id of ${id}.`));
    }

    return res.json({ msg: 'Todo was updated.', updated: todo });
  },
);

export const deleteTodo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const todo = await prisma.todo.delete({
      where: {
        todo_id: Number(id),
      },
    });

    return res.json('Todo was deleted.');
  },
);

export const postTodo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { description } = req.body;

    const result = await prisma.todo.create({
      data: {
        description,
      },
    });

    return res.json(result);
  },
);
