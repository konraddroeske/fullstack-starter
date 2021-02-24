import React, {
  FunctionComponent,
  useState,
  useEffect,
  useCallback,
  ChangeEvent,
  FormEvent,
} from 'react';
import axios from 'axios';
import getRoute from '../utils/apiRoute';
import './style.css';
import Wrapper from './common/Wrapper';

interface Todo {
  todo_id: number;
  description: string;
}

interface Inputs {
  addTodo: string;
  updateTodo: string;
}

const initialInputs = {
  addTodo: '',
  updateTodo: '',
};

const App: FunctionComponent = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputs, setInputs] = useState<Inputs>(initialInputs);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateId, setUpdateId] = useState<number | null>(null);

  const getTodos = useCallback(async () => {
    const { data: res } = await axios.get(getRoute('todos'));
    return res;
  }, []);

  const addTodo = async (description: string | undefined) => {
    const { data: newTodo } = await axios.post(getRoute('todos'), {
      description,
    });

    setInputs({ ...inputs, addTodo: '' });
    setTodos([...todos, newTodo]);
  };

  const updateTodo = async (description: string | undefined) => {
    const { data } = await axios.put(getRoute(`todos/${updateId}`), {
      description,
    });

    const { data: updatedTodo } = data;

    const prevTodos = todos.filter((ele) => ele.todo_id !== updateId);
    const newTodos = [...prevTodos, updatedTodo];

    setTodos(newTodos);
    setUpdateId(null);
    setIsUpdating(false);
    setInputs({ ...inputs, updateTodo: '' });
  };

  const handleSubmit = async (
    e: FormEvent,
    description: string | undefined,
  ) => {
    e.preventDefault();

    if (!isUpdating) {
      await addTodo(description);
    }

    if (isUpdating) {
      await updateTodo(description);
    }
  };

  const handleUpdate = (id: number, description: string) => {
    setUpdateId(id);
    setInputs({ ...inputs, updateTodo: description });
    setIsUpdating(true);
  };

  const deleteTodo = async (id: number, prevTodos: Todo[]) => {
    const { data: todo } = await axios.delete(getRoute(`todos/${id}`));
    const { id: deletedId } = todo;

    const newTodos = prevTodos.filter((ele) => ele.todo_id !== deletedId);
    setTodos(newTodos);
  };

  useEffect(() => {
    getTodos().then((res) => setTodos(res));
  }, [getTodos]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <Wrapper>
        <header>
          <h1>Fullstack Starter</h1>
        </header>
        <main>
          <p className="my-4">
            Typescript, React, Redux, Express, PostgreSQL w/ Prisma, TailwindCSS
          </p>
          <form
            onSubmit={(e) =>
              handleSubmit(e, !isUpdating ? inputs.addTodo : inputs.updateTodo)
            }
          >
            <div className="flex my-4">
              <input
                name={!isUpdating ? 'addTodo' : 'updateTodo'}
                type="text"
                className="border-solid border-2 px-2 mr-4"
                value={!isUpdating ? inputs.addTodo : inputs.updateTodo}
                onChange={handleChange}
              />
              <button type="submit" className="border-solid border-2 py-2 px-4">
                {!isUpdating ? 'Add Todo' : 'Update Todo'}
              </button>
            </div>
          </form>
          <ul>
            {todos &&
              todos.map(({ todo_id, description }) => (
                <li key={todo_id} className="flex items-center mb-4">
                  <p className="mr-4">{description}</p>
                  <button
                    type="button"
                    className="border-solid border-2 py-2 px-4 mx-4"
                    onClick={() => deleteTodo(todo_id, todos)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="border-solid border-2 py-2 px-4"
                    onClick={() => handleUpdate(todo_id, description)}
                  >
                    Update
                  </button>
                </li>
              ))}
          </ul>
        </main>
      </Wrapper>
    </div>
  );
};

export default App;
