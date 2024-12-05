import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';  // Auth slice
import teamReducer from '../features/team/teamSlice';  // Team slice
import taskReducer from '../features/task/taskSlice';  // Task slice

const store = configureStore({
  reducer: {
    auth: authReducer,  // Auth state slice
    team: teamReducer,  // Team state slice
    task: taskReducer,  // Task state slice
  }
});

export default store;