import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import cfg from '../../config';
import { Forecast, WeatherDay, WeatherMoment } from './types';
import moment from 'moment';
import { terminateWeatherType } from '../../Components/WeatherIcon/WeatherIcon';


export interface ForecasterState {
    days: Array<WeatherDay>;
}

export const fetchWeather = createAsyncThunk(
    'fetch_weather_info',
    async (placeName: string, thunkAPI) => {
        return await axios
            .get(cfg.geoApi, {
                params: {
                    apikey: cfg.secrets.apiKeyGeo,
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
                    .get(cfg.weatherApi, {
                        params: {
                            ...coordinates,
                            appid: cfg.secrets.apiKeyWeather,
                            mode: 'json',
                            units: 'metric',
                        },
                    })
                    .then((response) => response.data)
            });
    },
);

export const forecasterSlice = createSlice({
    name: 'forecaster',
    initialState: {
        days: new Array<WeatherDay>(),
    },
    reducers: {
        clear: state => {
            state.days = new Array<WeatherDay>();
        },
    },
    extraReducers: builder => {
        builder
            .addCase(
                fetchWeather.fulfilled,
                (state: ForecasterState, action) => {
                    const forecast40: Array<Forecast> = action.payload.list;
                    let dailyForecasts = new Array<WeatherMoment>();
                    let newDayStarted = false;

                    state.days = forecast40.reduce((days, curr) => {
                        if (!newDayStarted && moment(curr.dt, 'X').format('HH:mm') !== cfg.midnight) {
                            return new Array<WeatherDay>();
                        }
                        newDayStarted = true;

                        dailyForecasts.push({
                            weatherType: terminateWeatherType(curr.weather[0].id),
                            time24: moment(curr.dt, 'X').format('HH:mm'),
                            tempC: Math.round(curr.main.temp),
                        });

                        if (dailyForecasts.length === cfg.dailyForecasts) {
                            days.push({
                                weekDay: cfg.translateWeekDay[moment(curr.dt, 'X').format('dddd')],
                                forecasts: dailyForecasts,
                            });

                            dailyForecasts = new Array<WeatherMoment>();
                        }

                        return days;
                    }, new Array<WeatherDay>());
                });
    },
});

export default forecasterSlice.reducer;
