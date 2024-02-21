import { configureStore } from '@reduxjs/toolkit';
import {
  activityFormReducer,
  efficientFormReducer,
  summaryFormReducer,
} from 'features';

const preloadedState = {};

export const store = configureStore({
  reducer: {
    activityForm: activityFormReducer,
    efficientForm: efficientFormReducer,
    summaryForm: summaryFormReducer,
  },
  preloadedState,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
