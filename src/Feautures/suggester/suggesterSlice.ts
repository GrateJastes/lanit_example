import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
// @ts-ignore
import ymaps from 'ymaps';
import config from '../../config';

import axios from 'axios';

interface Suggestion {
    type: string;
    displayName: string;
    value: string;
    hl: Array<Array<number>>;
}

export interface SuggesterState {
    suggestions: Array<Suggestion>;
    selectedOption: string;
}

export const fetchSuggestions = createAsyncThunk(
    'refresh_suggestions',
    async (query: string, thunkAPI) => {
        return await ymaps
            .load()
            .then((maps: { suggest: (arg0: string) => Promise<any>; }) => maps.suggest(query));
    },
);

export const suggesterSlice = createSlice({
    name: 'suggester',
    initialState: {
        suggestions: [],
        selectedOption: '',
    },
    reducers: {
        clear: state => {
            state.suggestions = [];
            state.selectedOption = '';
        },
        select: (state: SuggesterState, action: PayloadAction<string>) => {
            state.selectedOption = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(
                fetchSuggestions.fulfilled,
                (state: SuggesterState, action) => {
                    state.suggestions = action.payload;
                });
    },
});

export const {clear, select} = suggesterSlice.actions;
export default suggesterSlice.reducer;
