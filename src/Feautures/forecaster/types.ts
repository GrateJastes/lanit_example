import { WeatherType } from '../../Components/WeatherIcon/WeatherIcon';
import React from 'react';

export interface WeatherMoment {
    weatherType: WeatherType;
    time24: string;
    tempC: number;
}

export interface WeatherDay {
    weekDay: string;
    forecasts: Array<WeatherMoment>;
}
