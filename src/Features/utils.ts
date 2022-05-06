import { BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';
import axios, { AxiosRequestConfig } from 'axios';
// @ts-ignore
import ymaps from 'ymaps';
import { URLSearchParamsInit } from 'react-router-dom';

export interface IYmapsSuggestion {
    value: string;
    displayName: string;
}

export interface IYmapsObject {
    suggest: (query: string) => Promise<Array<IYmapsSuggestion>>;
}

export const axiosBaseQuery = (baseUrl = ''): BaseQueryFn<{
    url: string,
    params?: AxiosRequestConfig['params'],
}> => async ({url, params}) => await axios.get(url, {params});

export const ymapsBaseQuery = (baseUrl = ''): BaseQueryFn<{
    sample: string,
}> => async ({sample}) => await ymaps
    .load()
    .then((maps: IYmapsObject) => maps.suggest(sample))
    .then((suggestions: Array<IYmapsSuggestion>) => ({data: suggestions})); // MARAZM :D

// export const addParams = (
//     newParams: URLSearchParams,
//     addingParams: Array<{ name: string, value: string }>
// ): void => {
//     addingParams.forEach((param) => newParams.set(param.name, param.value))
//
//     const newurl = window.location.protocol
//         + '//'
//         + window.location.host
//         + '?'
//         + newParams.toString();
//     window.history.pushState({path: newurl}, '', newurl);
// };

export const addParams = (
    oldParams: URLSearchParams,
    newParams: Array<{ name: string, value: string }>,
    paramsSetter: (nextInit: URLSearchParamsInit) => void,
): void => {
    newParams.forEach((param) => oldParams.set(param.name, param.value))
    paramsSetter(oldParams);
};

