import { configureStore } from '@reduxjs/toolkit';
import { forecasterAPI } from './Features/Forecaster/ForecasterAPI';
import { setupListeners } from '@reduxjs/toolkit/query';
import { suggesterAPI } from './Features/Suggester/SuggesterAPI';

export const store = configureStore({
    reducer: {
        [suggesterAPI.reducerPath]: suggesterAPI.reducer,
        [forecasterAPI.reducerPath]: forecasterAPI.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat(forecasterAPI.middleware)
        .concat(suggesterAPI.middleware),
});

setupListeners(store.dispatch);
