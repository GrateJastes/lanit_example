import React from 'react';
import { WeatherMoment } from '../../Features/Forecaster/types';
import { WeatherIcon } from '../WeatherIcon/WeatherIcon';
import './ForecastCard.scss';

export type IForecastCardProps = {
    weatherMoment: WeatherMoment;
}

export function ForecastCard(props: IForecastCardProps) {
    return (
        <div className="forecast-card">
            <span className="forecast-card__time">{props.weatherMoment.time24}</span>
            <WeatherIcon weatherType={props.weatherMoment.weatherType}/>
            <span className="forecast-card__temp">{props.weatherMoment.tempC}&#8451;</span>
        </div>
    );
}
