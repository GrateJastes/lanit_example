import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config';
import { WeatherDay, WeatherMoment } from './types';
import consts from '../../consts';
import moment from 'moment';
import { terminateWeatherType, WeatherIcon } from '../../Components/WeatherIcon/WeatherIcon';

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
    days: Array<WeatherDay>;
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
                            units: 'metric',
                        },
                    })
                    .then((response) => response.data)
            });
    }
);

export const forecasterSlice = createSlice({
    name: 'forecaster',
    initialState: {
        days: [],
    },
    reducers: {
        clear: state => {
            state.days = [];
        },
    },
    extraReducers: builder => {
        builder
            .addCase(
                fetchWeather.fulfilled,
                (state: ForecasterState, action) => {
                    const forecast40: Array<Forecast> = action.payload.list;
                    let dailyForecasts: Array<WeatherMoment> = [];
                    let newDayStarted = false;

                    state.days = forecast40.reduce((accum, curr, idx, arr) => {
                        if (!newDayStarted && moment(curr.dt, 'X').format('HH:mm') !== consts.midnight) {
                            return [];
                        }
                        newDayStarted = true;

                        dailyForecasts.push({
                            weatherType: terminateWeatherType(curr.weather[0].id),
                            time24: moment(curr.dt, 'X').format('HH:mm'),
                            tempC: Math.round(curr.main.temp),
                        });

                        if (dailyForecasts.length === consts.dailyForecasts) {
                            accum.push({
                                // @ts-ignore
                                weekDay: consts.translateWeekDay[moment(curr.dt, 'X').format('dddd')],
                                forecasts: dailyForecasts,
                            });

                            dailyForecasts = [];
                        }

                        return accum;
                    }, new Array<WeatherDay>());
                });
    },
});

export const { clear } = forecasterSlice.actions;
export default forecasterSlice.reducer;
