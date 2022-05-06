import { createApi } from '@reduxjs/toolkit/query/react';
import cfg from '../../config';
import { IOpenWeatherForecast, IWeatherDay, IWeatherMoment } from './types';
import moment from 'moment';
import { terminateWeatherType } from '../../Components/WeatherIcon/WeatherIcon';
import { axiosBaseQuery } from '../utils';

interface ICoordinates {
    lat: string;
    lon: string;
}

interface IOpenWeatherResponse {
    list: Array<IOpenWeatherForecast>;
}

interface IGeoDataResponse {
    response: {
        GeoObjectCollection: {
            featureMember: Array<{
                GeoObject: {
                    Point: {
                        pos: string;
                    };
                };
            }>;
        };
    };
}


export const forecasterAPI = createApi({
    reducerPath: 'forecasterAPI',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        getCoordsByPlaceName: builder.query<ICoordinates, string>({
            query: (placeName) => ({
                url: cfg.geoApi,
                params: {
                    apikey: cfg.secrets.apiKeyGeo,
                    geocode: placeName,
                    format: 'json',
                },
            }),
            transformResponse: (res: IGeoDataResponse) => {
                const [lon, lat] = res
                    .response
                    .GeoObjectCollection
                    .featureMember[0]
                    .GeoObject
                    .Point
                    .pos
                    .split(' ');
                return {lon, lat};
            },
        }),
        getWeatherByCoords: builder.query<Array<IWeatherDay>, ICoordinates>({
            query: (coords) => ({
                url: cfg.weatherApi,
                params: {
                    ...coords,
                    appid: cfg.secrets.apiKeyWeather,
                    mode: 'json',
                    units: 'metric',
                },
            }),
            transformResponse: (res: IOpenWeatherResponse): Array<IWeatherDay> => {
                const forecast40: Array<IOpenWeatherForecast> = res.list;
                let dailyForecasts = new Array<IWeatherMoment>();
                let newDayStarted = false;

                return forecast40.reduce((days, curr) => {
                    if (!newDayStarted && moment(curr.dt, 'X').format('HH:mm') !== cfg.midnight) {
                        return new Array<IWeatherDay>();
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

                        dailyForecasts = new Array<IWeatherMoment>();
                    }

                    return days;
                }, new Array<IWeatherDay>());
            },
        }),
    }),
});

export const {
    useLazyGetCoordsByPlaceNameQuery,
    useLazyGetWeatherByCoordsQuery,
} = forecasterAPI;

