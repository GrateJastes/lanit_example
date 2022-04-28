import { configureStore } from '@reduxjs/toolkit';
import suggesterReducer from './Feautures/suggester/suggesterSlice';

export const store = configureStore({
    reducer: suggesterReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
