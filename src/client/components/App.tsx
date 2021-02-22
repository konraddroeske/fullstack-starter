import React, { FunctionComponent, useState } from 'react';
import axios from 'axios';
import { apiRoute } from '../utils';
import './style.css';
// import Wrapper from './common/Wrapper';

export interface AppStates {
  todos: string[] | [];
  todo: string;
  updated?: string;
  deleted?: string;
}

const App: FunctionComponent = () => {
  const [data, setData] = useState<AppStates>({
    todos: [],
    todo: '',
  });

  const { todos, todo } = data;

  const getTodos = () => {
    axios
      .get(apiRoute.getRoute('todos'))
      .then(({ data: res }) => setData({ ...data, todos: res }));
  };

  const getTodo = (id: string) => {
    axios
      .post(apiRoute.getRoute(`todos/${id}`))
      .then(({ data: res }) => setData({ ...data, todo: res.description }));
  };

  const updateTodo = (id: string, description: string) => {
    axios
      .put(apiRoute.getRoute(`todos/${id}`), {
        description,
      })
      .then(({ data: res }) => setData({ ...data, updated: res }));
  };

  const deleteTodo = (id: string) => {
    axios
      .delete(apiRoute.getRoute(`todos/${id}`))
      .then(({ data: res }) => setData({ ...data, deleted: res }));
  };

  return (
    <div>
      <h1>Fullstack Starter</h1>
      <p className="my-4">
        PostgreSQL, Express, React, Node, Typescript, TailwindCSS
      </p>
      <form>
        <input type="text" />
        <button type="button">Add Todo</button>
      </form>
    </div>
  );
};

export default App;
