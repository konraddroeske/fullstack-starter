import React, { FunctionComponent, useState } from 'react';
import axios from 'axios';
import { apiRoute } from '../utils';
import './style.css';

export interface AppStates {
  username?: string;
  textOfPostTest: string;
  textForPost: string;
  textOfPutTest: string;
  textForPut: string;
  textOfDeleteTest: string;
  textForDelete: string;
}

const App: FunctionComponent = () => {
  const [data, setData] = useState<AppStates>({
    username: '',
    textOfPostTest: '',
    textForPost: '',
    textOfPutTest: '',
    textForPut: '',
    textOfDeleteTest: '',
    textForDelete: '',
  });

  const { username, textForPost, textForPut, textForDelete, textOfPostTest, textOfPutTest, textOfDeleteTest } = data;
  const inputText = 'Input text...';

  const getUser = () => {
    axios.get(apiRoute.getRoute('test')).then(({ data: res }) => setData({ ...data, username: res.username }));
  };

  const sendUserInfo = () => {
    const text = textOfPostTest;

    axios
      .post(apiRoute.getRoute('test'), {
        text,
      })
      .then(({ data: res }) => setData({ ...data, textForPost: res.text }));
  };

  const changeUserInfo = () => {
    axios
      .put(apiRoute.getRoute('test'), {
        text: textOfPutTest,
      })
      .then(({ data: res }) => setData({ ...data, textForPut: res.text }));
  };

  const deleteUserInfo = () => {
    axios
      .delete(apiRoute.getRoute('test'), {
        data: { text: textOfDeleteTest },
      })
      .then(({ data: res }) => setData({ ...data, textForDelete: res.text }));
  };

  return (
    <ul className='mx-auto px-8 py-10'>
      <li className='mx-auto mb-10'>
        <div className='flex items-center'>
          <p className='w-60'>{'Result for Get: '}</p>
          <button type='button' className='api-button' onClick={getUser}>
            Test Get
          </button>
        </div>
        <h2 className='font-bold text-gray-900 mb-4'>{!!username && `Hello ${username}!`}</h2>
      </li>
      <li className='mx-auto mb-4'>
        <div className='flex mb-4'>
          <input
            className='border-solid border-2 border-black px-4 w-60'
            onChange={e => setData({ ...data, textOfPostTest: e.target.value })}
            placeholder={inputText}
          />
          <button type='button' className='api-button' onClick={sendUserInfo}>
            Test Post
          </button>
        </div>
        <div className='flex items-center'>
          <p className='mr-2'>{'Result for Post: '}</p>
          <h3>{textForPost}</h3>
        </div>
      </li>
      <li className='mx-auto mb-4 justify-between'>
        <div className='flex mb-4'>
          <input
            className='border-solid border-2 border-black px-4 w-60'
            onChange={e => setData({ ...data, textOfPutTest: e.target.value })}
            placeholder={inputText}
          />
          <button type='button' className='api-button' onClick={changeUserInfo}>
            Test Put
          </button>
        </div>
        <div className='flex items-center'>
          <label className='mr-2'>{'Result for Put: '}</label>
          <h3>{textForPut}</h3>
        </div>
      </li>
      <li className='mx-auto mb-4 justify-between'>
        <div className='flex mb-4'>
          <input
            className='border-solid border-2 border-black px-4 w-60'
            onChange={e => setData({ ...data, textOfDeleteTest: e.target.value })}
            placeholder={inputText}
          />
          <button type='button' className='api-button' onClick={deleteUserInfo}>
            Test Delete
          </button>
        </div>
        <div className='flex items-center'>
          <p className='mr-2'>{'Result for Delete: '}</p>
          <h3>{textForDelete}</h3>
        </div>
      </li>
    </ul>
  );
};

export default App;
