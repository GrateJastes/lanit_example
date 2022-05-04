import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import cfg from '../../config';

interface IQueryArg {
    placeName: string;
    coordinates: {lat: string, lon: string};
}

export const suggesterAPI = createApi({
    reducerPath: 'suggesterApi',
    baseQuery: fetchBaseQuery({baseUrl: cfg.weatherApi}),
    endpoints: (builder) => ({
        getWeatherByPlaceName: builder.query<Array<any>, IQueryArg>({
            query: (queryArg) => `?appid=${cfg.secrets.apiKeyWeather}&lat=${queryArg.coordinates.lat}&lon=${queryArg.coordinates.lon}&mode=json&units=metric`,
        })
    }),
});
