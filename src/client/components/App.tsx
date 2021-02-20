import React, { FunctionComponent, useState } from 'react';
import axios from 'axios';
import { apiRoute } from '../utils';
import './style.css';

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
      <h2>Features</h2>
      <ul>
        <li>
          <p>PostgreSQL</p>
        </li>
        <li>
          <p>Express</p>
        </li>
        <li>
          <p>React</p>
        </li>
        <li>
          <p>Node</p>
        </li>
        <li>
          <p>Typescript</p>
        </li>
        <li>
          <p>TailwindCSS</p>
        </li>
      </ul>
    </div>
  );
};

export default App;
