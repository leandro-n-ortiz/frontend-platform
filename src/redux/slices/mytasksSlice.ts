import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';

import { Task } from '@@/models/types';

const myTasksSlice = createSlice<Task[], SliceCaseReducers<Task[]>>({
  name: 'myTasks',
  initialState: [],
  reducers: {},
});

export default myTasksSlice;
