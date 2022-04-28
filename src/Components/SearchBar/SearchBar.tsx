import React from 'react';
import Select from 'react-select';
import './SearchBar.scss'
import { useAppDispatch, useAppSelector } from '../../hooks';
import consts from '../../consts';
import { clear } from '../../Feautures/suggester/suggesterSlice';
import { fetchSuggestions } from '../../Feautures/suggester/suggesterSlice';
// @ts-ignore
import ymaps from 'ymaps';

function SearchBar() {
    const suggestionsList = useAppSelector((state) => state.suggestions)
        .map((suggestion) => ({
            // @ts-ignore
            value: suggestion.value,
            // @ts-ignore
            label: suggestion.displayName,
        }));
    const dispatch = useAppDispatch();

    const refreshSuggestions = (searchQuery: string) => {
        // if (searchQuery.length <= consts.minSearchLength) {
        //     dispatch(clear())
        // }
        if (searchQuery.length >= consts.minSearchLength) {
            dispatch(fetchSuggestions(searchQuery));
        }
    }
    console.log(suggestionsList);
    return (
        <Select
            placeholder={'Выберите город'}
            className="search-bar"
            noOptionsMessage={() => <span className="App-header__no-option">
            Введите минимум 3 символа, или попробуйте изменить запрос
            </span>}
            onInputChange={refreshSuggestions}
            options={suggestionsList}
        ></Select>
    );
}

export default SearchBar;
