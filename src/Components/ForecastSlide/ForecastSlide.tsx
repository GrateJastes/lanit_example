import React from 'react';
import { IWeatherDay } from '../../Features/Forecaster/types';
import { ForecastCard } from '../ForecastCard/ForecastCard';
import './ForecastSlide.scss';

export interface IForecastSlideProps {
    weatherDay: IWeatherDay;
}

export function ForecastSlide(props: IForecastSlideProps) {
    return (
        <div className="forecast-slide">
            <h3 className="forecast-slide__weekday">{props.weatherDay.weekDay}</h3>
            <div className="forecast-slide__cards">
                {props.weatherDay.forecasts.map((forecast, idx) => <ForecastCard
                    key={idx}
                    weatherMoment={forecast}/>
                )}
            </div>
        </div>
    );
}
