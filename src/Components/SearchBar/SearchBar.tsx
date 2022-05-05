import React, { useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import './SearchBar.scss'
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchSuggestions, ISelectOption } from '../../Features/Suggester/SuggesterSlice';
import cfg from '../../config';
import { useSearchParams } from 'react-router-dom';
import addParams from '../../Features/utils';


export interface ISearchBarProps {
    selectedOption: ISelectOption | null;
    onChange: (newOption: ISelectOption) => void;
}

function SearchBar(props: ISearchBarProps) {
    const dispatch = useAppDispatch();
    const refreshSuggestions = (searchQuery: string) => {
        if (searchQuery.length >= cfg.minSearchLength) {
            dispatch(fetchSuggestions(searchQuery));
        }
    };
    const [searchParams] = useSearchParams();
    const place = searchParams.get('place');
    const placeLabel = searchParams.get('placeLabel');
    const suggestionsList = useAppSelector((state) => state.suggester.suggestions);

    const updateSelectedOption = (newValue: SingleValue<{ value: string, label: string }>) => {
        if (!newValue) {
            return;
        }

        const placeName = newValue.value;
        const label = newValue.label;
        if (!place || place !== placeName) {
            addParams(searchParams, [
                {name: 'place', value: placeName},
                {name: 'placeLabel', value: label},
            ]);
        }

         props.onChange({ value: placeName, label: label });
    };

    useEffect(() => {
        if (place && placeLabel && !props.selectedOption) {
            updateSelectedOption({value: place, label: placeLabel});
        }
    }, [place, placeLabel, props.selectedOption]);

    return (
        <Select
            placeholder={'Выберите город'}
            className="search-bar"
            noOptionsMessage={() => <span>{cfg.noOptionText}</span>}
            onInputChange={refreshSuggestions}
            options={suggestionsList}
            onChange={(val) => updateSelectedOption(val)}
            value={props.selectedOption}
    />
    );
}

export default SearchBar;
