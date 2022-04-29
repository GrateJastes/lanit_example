import React from 'react';
import { WeatherDay } from '../../Feautures/forecaster/types';
import { ForecastCard } from '../ForecastCard/ForecastCard';
import { WeatherType } from '../WeatherIcon/WeatherIcon';
import './ForecastSlide.scss';

export interface IForecastSlideProps {
    weatherDay: WeatherDay;
}

export function ForecastSlide(props: IForecastSlideProps) {
    return (
        <div className="forecast-slide">
            <h3 className="forecast-slide__weekday">{props.weatherDay.weekDay}</h3>
            <div className="forecast-slide__cards">
                {props.weatherDay.forecasts.map((forecast) => <ForecastCard weatherMoment={forecast}/>)}
            </div>
        </div>
    );
}
