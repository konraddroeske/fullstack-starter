import React, { FunctionComponent, useState } from 'react';
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

  const { username, textForPost, textForPut, textForDelete } = data;
  const inputText = 'Input text...';

  const getUser = () => {
    fetch(apiRoute.getRoute('test'))
      .then(res => res.json())
      .then(res => setData({ ...data, username: res.username }));
  };

  const sendUserInfo = () => {
    const text = data.textOfPostTest;

    text.trim() &&
      fetch(apiRoute.getRoute('test'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //'Content-Type': 'application/x-www-form -urlencoded',
          Accept: 'application/json',
        },
        body: JSON.stringify({ text }),
      })
        .then(res => res.json())
        .then(res => setData({ ...data, textForPost: res.text }));
  };

  const changeUserInfo = () => {
    data.textOfPutTest.trim() &&
      fetch(apiRoute.getRoute('test'), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ text: data.textOfPutTest }),
      })
        .then(res => res.json())
        .then(res => setData({ ...data, textForPut: res.text }));
  };

  const deleteUserInfo = () => {
    data.textOfDeleteTest.trim() &&
      fetch(apiRoute.getRoute('test'), {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ text: data.textOfDeleteTest }),
      })
        .then(res => res.json())
        .then(res => setData({ ...data, textForDelete: res.text }));
  };

  return (
    <ul className='mx-auto px-8 py-10'>
      <li className='mx-auto mb-14'>
        <div className='flex items-center'>
          <label className='w-60'>{'Result for Get: '}</label>
          <button className='api-button' onClick={getUser}>
            {'Test Get'}
          </button>
        </div>
        <h2 className='font-bold text-gray-900'>{!!username && `Hello ${username}!`}</h2>
      </li>
      <li className='mx-auto mb-6'>
        <div className='flex mb-4'>
          <input
            className='border-solid border-2 border-black px-4 w-60'
            onChange={e => setData({ ...data, textOfPostTest: e.target.value })}
            placeholder={inputText}
          />
          <button className='api-button' onClick={sendUserInfo}>
            {'Test Post'}
          </button>
        </div>
        <div className='flex items-center'>
          <label className='mr-2'>{'Result for Post: '}</label>
          <h3>{textForPost}</h3>
        </div>
      </li>
      <li className='mx-auto mb-6 justify-between'>
        <div className='flex mb-4'>
          <input
            className='border-solid border-2 border-black px-4 w-60'
            onChange={e => setData({ ...data, textOfPutTest: e.target.value })}
            placeholder={inputText}
          />
          <button className='api-button' onClick={changeUserInfo}>
            {'Test Put'}
          </button>
        </div>
        <div className='flex items-center'>
          <label className='mr-2'>{'Result for Put: '}</label>
          <h3>{textForPut}</h3>
        </div>
      </li>
      <li className='mx-auto mb-6 justify-between'>
        <div className='flex mb-4'>
          <input
            className='border-solid border-2 border-black px-4 w-60'
            onChange={e => setData({ ...data, textOfDeleteTest: e.target.value })}
            placeholder={inputText}
          />
          <button className='api-button' onClick={deleteUserInfo}>
            {'Test Delete'}
          </button>
        </div>
        <div className='flex items-center'>
          <label className='mr-2'>{'Result for Delete: '}</label>
          <h3>{textForDelete}</h3>
        </div>
      </li>
    </ul>
  );
};

export default App;
