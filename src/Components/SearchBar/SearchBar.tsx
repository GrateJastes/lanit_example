import React from 'react';
import Select, { SingleValue } from 'react-select';
import './SearchBar.scss'
import { useAppDispatch, useAppSelector } from '../../hooks';
import consts from '../../consts';
import { select } from '../../Feautures/suggester/suggesterSlice';
import { fetchSuggestions } from '../../Feautures/suggester/suggesterSlice';
import { fetchWeather } from '../../Feautures/forecaster/forecasterSlice';
import addParams from '../../Feautures/utils';


export interface ISearchBarProps {
    place: string | null;
    placeLabel: string | null;
}


function SearchBar(props: ISearchBarProps) {
    const suggestionsList = useAppSelector((state) => state.suggester.suggestions)
        .map((suggestion) => ({
            value: suggestion.value,
            label: suggestion.displayName,
        }));
    const dispatch = useAppDispatch();

    const refreshSuggestions = (searchQuery: string) => {
        if (searchQuery.length >= consts.minSearchLength) {
            dispatch(fetchSuggestions(searchQuery));
        }
    };

    const updateSelectedOption = (newValue: SingleValue<{ value: string, label: string }>) => {
        const newParams = new URLSearchParams(window.location.search);

        if (!newParams.get('place')) {
            addParams(newParams, [{name: 'place', value: newValue.value}])
        }

        const placeName = newValue && newValue.value;
        placeName && dispatch(select(placeName));
        placeName && dispatch(fetchWeather(placeName));
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
