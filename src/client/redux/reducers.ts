import { combineReducers } from '@reduxjs/toolkit';
import todo from './slices/todoSlice';

export default combineReducers({
  todo,
});
