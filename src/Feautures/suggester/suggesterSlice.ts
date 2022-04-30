import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// @ts-ignore
import ymaps from 'ymaps';
import { Suggestion } from './types';


export interface SuggesterState {
    suggestions: Array<Suggestion>;
    selectedOption: { value: string, label: string };
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
        suggestions: new Array<Suggestion>(),
        selectedOption: {value: '', label: ''},
    },
    reducers: {
        clear: state => {
            state.suggestions = new Array<Suggestion>();
            state.selectedOption = {value: '', label: ''};
        },
        select: (state: SuggesterState, action: PayloadAction<{ value: string, label: string }>) => {
            state.selectedOption = {
                value: action.payload.value,
                label: action.payload.label,
            };
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
