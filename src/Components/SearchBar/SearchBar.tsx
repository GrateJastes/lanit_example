import React from 'react';
import Select, { SingleValue } from 'react-select';
import './SearchBar.scss'
import { useAppDispatch, useAppSelector } from '../../hooks';
import consts from '../../consts';
import { fetchSuggestions, select } from '../../Feautures/suggester/suggesterSlice';
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
    const selectedOption = useAppSelector((state) => state.suggester.selectedOption);
    const dispatch = useAppDispatch();

    const refreshSuggestions = (searchQuery: string) => {
        if (searchQuery.length >= consts.minSearchLength) {
            dispatch(fetchSuggestions(searchQuery));
        }
    };

    const updateSelectedOption = (newValue: SingleValue<{ value: string, label: string }>) => {
        if (!newValue) {
            return;
        }

        const placeName = newValue.value;
        const newParams = new URLSearchParams(window.location.search);
        if (!newParams.get('place') || newParams.get('place') !== placeName) {
            addParams(newParams, [
                {name: 'place', value: placeName},
                {name: 'placeLabel', value: placeName},
            ]);
        }

        dispatch(select({value: placeName, label: newValue.label}));
        dispatch(fetchWeather(placeName));
    };

    if (props.place && props.placeLabel && selectedOption.value === '') {
        updateSelectedOption({value: props.place, label: props.placeLabel});
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
