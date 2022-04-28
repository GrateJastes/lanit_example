import React from 'react';
import Select, {SingleValue} from 'react-select';
import './SearchBar.scss'
import { useAppDispatch, useAppSelector } from '../../hooks';
import consts from '../../consts';
import {clear, select} from '../../Feautures/suggester/suggesterSlice';
import { fetchSuggestions } from '../../Feautures/suggester/suggesterSlice';
import { fetchWeather } from '../../Feautures/forecaster/forecasterSlice';


function SearchBar() {
    const suggestionsList = useAppSelector((state) => state.suggester.suggestions)
        .map((suggestion) => ({
            // @ts-ignore
            value: suggestion.value,
            // @ts-ignore
            label: suggestion.displayName,
        }));
    const weatherCast = useAppSelector(state => state.forecaster.forecast40)
    if (weatherCast) {
        console.log(weatherCast);
    }

    const dispatch = useAppDispatch();

    const refreshSuggestions = (searchQuery: string) => {
        if (searchQuery.length >= consts.minSearchLength) {
            dispatch(fetchSuggestions(searchQuery));
        }
    };

    const updateSelectedOption = (newValue: SingleValue<{value: string, label: string}>) => {
        newValue && dispatch(select(newValue.value));
        newValue && dispatch(fetchWeather(newValue.value));
    };

    return (
        <Select
            placeholder={'Выберите город'}
            className="search-bar"
            noOptionsMessage={() => <span className="App-header__no-option">
            Введите минимум 3 символа, или попробуйте изменить запрос
            </span>}
            onInputChange={refreshSuggestions}
            options={suggestionsList}
            onChange={updateSelectedOption}
        ></Select>
    );
}

export default SearchBar;
