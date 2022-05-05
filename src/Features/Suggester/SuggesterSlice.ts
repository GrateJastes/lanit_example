import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// @ts-ignore
import ymaps from 'ymaps';
import { Suggestion } from './types';

export interface ISelectOption {
    value: string;
    label: string;
}

export interface SuggesterState {
    suggestions: Array<ISelectOption>;
    selectedOption: ISelectOption;
}

export const fetchSuggestions = createAsyncThunk(
    'refresh_suggestions',
    async (query: string, thunkAPI) => {
        return await ymaps
            .load()
            .then((maps: { suggest: (arg0: string) => Promise<any>; }) => maps.suggest(query))
            .then((suggestions: Array<Suggestion>) => suggestions.map((suggestion) => ({
                value: suggestion.value,
                label: suggestion.displayName,
            })));
    },
);

export const suggesterSlice = createSlice({
    name: 'suggester',
    initialState: {
        suggestions: new Array<ISelectOption>(),
        selectedOption: {value: '', label: ''},
    },
    reducers: {
        clear: state => {
            state.suggestions = new Array<ISelectOption>();
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

export const { select } = suggesterSlice.actions;
export default suggesterSlice.reducer;
