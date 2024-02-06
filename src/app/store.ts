import { configureStore } from '@reduxjs/toolkit';
import { activityFormReducer } from 'features';

const preloadedState = {};

export const store = configureStore({
  reducer: {
    activityForm: activityFormReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
