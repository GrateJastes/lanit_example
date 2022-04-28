import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';
import { SuggesterState } from '../suggester/suggesterSlice';

interface Weather {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export interface Forecast {
    clouds: {
        all: string;
    };
    dt: number;
    dt_txt: string;
    pop: number;
    visibility: number;
    sys: {
        pod: string;
    };
    wind: {
        deg: number;
        gust: number;
        speed: number;
    };
    main: {
        feels_like: number;
        grnd_level: number;
        humidity: number;
        pressure: number;
        sea_level: number;
        temp: number;
        temp_kf: number;
        temp_max: number;
        temp_min: number;
    };
    weather: Array<Weather>;
}

export interface ForecasterState {
    forecast40: Array<Forecast>;
}

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
                const [ lon, lat ] = coords_str.split(' ');
                return { lat, lon };
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
    extraReducers: builder => {
        builder
            .addCase(
                fetchWeather.fulfilled,
                (state: ForecasterState, action) => {
                    state.forecast40 = action.payload.list;
                });
    },
});

export const { clear } = forecasterSlice.actions;
export default forecasterSlice.reducer;
