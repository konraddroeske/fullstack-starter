import { combineReducers } from '@reduxjs/toolkit';
import todo from './slices/todoSlice';

export const rootReducer = combineReducers({
  todo,
});

export type RootState = ReturnType<typeof rootReducer>;
