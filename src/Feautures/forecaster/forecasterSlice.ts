import {createSlice} from '@reduxjs/toolkit';

export const forecasterSlice = createSlice({
    name: 'forecaster',
    initialState: {
        forecast40: [],
    },
    reducers: {
        clear: state => {
            state.forecast40 = [];
        },
    },
});

export const { clear } = forecasterSlice.actions;
export default forecasterSlice.reducer;
