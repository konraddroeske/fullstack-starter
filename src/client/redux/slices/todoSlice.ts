import { createSlice } from '@reduxjs/toolkit';

interface TodoState {
  value: number;
}

const initialState: TodoState = {
  value: 0,
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
});

export default todoSlice.reducer;
