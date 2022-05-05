import { configureStore } from '@reduxjs/toolkit';
import { forecasterAPI } from './Features/Forecaster/ForecasterAPI';
import { setupListeners } from '@reduxjs/toolkit/query';
import suggesterReducer from './Features/Suggester/SuggesterSlice';

export const store = configureStore({
    reducer: {
        suggester: suggesterReducer,
        [forecasterAPI.reducerPath]: forecasterAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(forecasterAPI.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
