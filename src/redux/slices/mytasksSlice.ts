import { createSlice } from '@reduxjs/toolkit';

import { Task } from '@@/models/types';

const myTasksSlice = createSlice({
  name: 'myTasks',
  initialState: [] as Task[],
  reducers: {},
});

export default myTasksSlice;
