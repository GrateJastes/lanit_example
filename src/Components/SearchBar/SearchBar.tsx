import React from 'react';
import Select, { SingleValue } from 'react-select';
import './SearchBar.scss'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSuggestions, select } from '../../Features/Suggester/SuggesterSlice';
import { fetchWeather } from '../../Features/Forecaster/ForecasterSlice';
import cfg from '../../config';
import { useSearchParams } from 'react-router-dom';
import addParams from '../../Features/utils';


function SearchBar() {
    const suggestionsList = useAppSelector((state) => state.suggester.suggestions)
        .map((suggestion) => ({
            value: suggestion.value,
            label: suggestion.displayName,
        }));
    const selectedOption = useAppSelector((state) => state.suggester.selectedOption);
    const dispatch = useAppDispatch();

    const refreshSuggestions = (searchQuery: string) => {
        if (searchQuery.length >= cfg.minSearchLength) {
            dispatch(fetchSuggestions(searchQuery));
        }
    };

    const [searchParams] = useSearchParams();
    const place = searchParams.get('place');
    const placeLabel = searchParams.get('placeLabel');

    const updateSelectedOption = (newValue: SingleValue<{ value: string, label: string }>) => {
        if (!newValue) {
            return;
        }

        const placeName = newValue.value;
        if (!place || place !== placeName) {
            addParams(searchParams, [
                {name: 'place', value: placeName},
                {name: 'placeLabel', value: placeName},
            ]);
        }

        dispatch(select({value: placeName, label: newValue.label}));
        dispatch(fetchWeather(placeName));
    };

    if (place && placeLabel && selectedOption.value === '') {
        updateSelectedOption({value: place, label: placeLabel});
    }

    return (
        <Select
            placeholder={'Выберите город'}
            className="search-bar"
            noOptionsMessage={() => <span className="App-header__no-option">Введите минимум 3 символа, или попробуйте изменить запрос</span>}
            onInputChange={refreshSuggestions}
            options={suggestionsList}
            onChange={updateSelectedOption}
            value={selectedOption}
        ></Select>
    );
}

export default SearchBar;
