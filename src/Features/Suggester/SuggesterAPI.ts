import { createApi } from '@reduxjs/toolkit/dist/query/react';
import cfg from '../../config';
import { IYmapsSuggestion, ymapsBaseQuery } from '../utils';
import { ISelectOption } from './types';


export const suggesterAPI = createApi({
    reducerPath: 'suggesterAPI',
    baseQuery: ymapsBaseQuery(),
    endpoints: (builder) => ({
        getSuggestionsBySample: builder.query<Array<ISelectOption>, string>({
            query: (sample) => ({
                url: cfg.geoApi,
                sample: sample,
            }),
            transformResponse: (res: Array<IYmapsSuggestion>) => res.map((suggestion) => ({
                value: suggestion.value,
                label: suggestion.displayName,
            })),
        }),
    }),
});

export const {
    useLazyGetSuggestionsBySampleQuery,
} = suggesterAPI;
