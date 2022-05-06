import React, { useEffect } from 'react';
import Select, { SingleValue } from 'react-select';
import './SearchBar.scss'
import cfg from '../../config';
import { useSearchParams } from 'react-router-dom';
import { addParams } from '../../Features/utils';
import { useLazyGetSuggestionsBySampleQuery } from '../../Features/Suggester/SuggesterAPI';
import { ISelectOption } from '../../Features/Suggester/types';


export interface ISearchBarProps {
    selectedOption: ISelectOption | null;
    onChange: (newOption: ISelectOption) => void;
}

function SearchBar(props: ISearchBarProps) {
    const [fetchSuggestions, newSuggestions] = useLazyGetSuggestionsBySampleQuery();
    const refreshSuggestions = (searchQuery: string) => {
        if (searchQuery.length >= cfg.minSearchLength) {
            fetchSuggestions(searchQuery);
        }
    };

    const [searchParams, setSearchParams] = useSearchParams();
    const place = searchParams.get('place');
    const placeLabel = searchParams.get('placeLabel');
    const updateSelectedOption = (newValue: SingleValue<ISelectOption>) => {
        if (!newValue) {
            return;
        }

        const placeName = newValue.value;
        const label = newValue.label;
        if (!place || place !== placeName) {
            addParams(
                searchParams,
                [
                    {name: 'place', value: placeName},
                    {name: 'placeLabel', value: label},
                ],
                setSearchParams);
        }

        props.onChange({value: placeName, label: label});
    };

    useEffect(() => {
        if (place && placeLabel && !props.selectedOption) {
            updateSelectedOption({value: place, label: placeLabel});
        }
    }, [props.selectedOption]);

    return (
        <Select
            placeholder={'Выберите город'}
            className="search-bar"
            noOptionsMessage={() => <span>{cfg.noOptionText}</span>}
            onInputChange={refreshSuggestions}
            options={newSuggestions.data}
            onChange={(val) => updateSelectedOption(val)}
            value={props.selectedOption}
        />
    );
}

export default SearchBar;
