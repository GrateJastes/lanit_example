import {
    ICoordinates,
    useLazyGetCoordsByPlaceNameQuery,
    useLazyGetWeatherByCoordsQuery
} from '../../Features/Forecaster/ForecasterAPI';
import SearchBar from '../SearchBar/SearchBar';
import { ForecastBlock } from '../ForecastBlock/ForecastBlock';
import React, { useEffect, useState } from 'react';
import { ISelectOption } from '../../Features/Suggester/SuggesterSlice';


function MainPage() {
    const [ selectedOption, setSelectedOption ] = useState<ISelectOption | null>(null);
    const [ coordsTrigger, coords ] = useLazyGetCoordsByPlaceNameQuery();
    const [ weatherTrigger, weatherForecast ]  = useLazyGetWeatherByCoordsQuery();

    useEffect(() => {
        if (selectedOption?.value) {
            coordsTrigger(selectedOption.value);
        }
    }, [selectedOption]);

    useEffect(() => {
        if (coords?.data) {
            weatherTrigger(coords.data);
        }
    }, [coords]);

    return (
        <div className="app">
            <div className="app-header">
                <h1 className="app-header__service-name">ПОГОДА</h1>
                <SearchBar
                    onChange={(newOption) => setSelectedOption(newOption)}
                    selectedOption={selectedOption}
                />
            </div>
            <ForecastBlock weatherForecast={weatherForecast.data || []}/>
        </div>
    );
}

export default MainPage;