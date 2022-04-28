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
    weatherCast: {};
}

export const fetchSuggestions = createAsyncThunk(
    'refresh_suggestions',
    async (query: string, thunkAPI) => {
        return await ymaps
            .load()
            .then((maps: { suggest: (arg0: string) => Promise<any>; }) => maps.suggest(query));
    },
);

export const fetchWeather = createAsyncThunk(
    'fetch_weather_info',
    async (placeName: string, thunkAPI) => {
        return await axios
            .get(config.geoApi, {
                params: {
                    apikey: config.apiKeyGeo,
                    geocode: placeName,
                    format: 'json',
                },
            })
            .then((response) => {
                const coords_str: string = response.data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
                const [lon, lat] = coords_str.split(' ');
                return {lat, lon};
            })
            .then((coordinates) => {
                return axios
                    .get(config.weatherApi, {
                        params: {
                            ...coordinates,
                            appid: config.apiKeyWeather,
                            mode: 'json',
                        },
                    })
                    .then((response) => response.data)
            });
    }
);

export const suggesterSlice = createSlice({
    name: 'suggester',
    initialState: {
        suggestions: [],
        selectedOption: '',
        weatherCast: {},
    },
    reducers: {
        clear: state => {
            state.suggestions = [];
            state.selectedOption = '';
            state.weatherCast = {};
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
                })
            .addCase(
                fetchWeather.fulfilled,
                (state: SuggesterState, action) => {
                    state.weatherCast = action.payload.list;
                });
    },
});

export const {clear, select} = suggesterSlice.actions;
export default suggesterSlice.reducer;
