import React from 'react';
import { WeatherDay } from '../../Feautures/forecaster/types';
import { ForecastCard } from '../ForecastCard/ForecastCard';
import { WeatherType } from '../WeatherIcon/WeatherIcon';
import './ForecastSlide.scss';

export interface ForecastSlideProps {
    weatherDay: WeatherDay;
}

export function ForecastSlide() {
    return (
        <div className="forecast-slide">
            <h3 className="forecast-slide__weekday">Понедельник</h3>
            <div className="forecast-slide__cards">
                <ForecastCard weatherMoment={
                    ({
                        weatherType: WeatherType.Rainy,
                        time24: '21:00',
                        tempC: -20,
                    })
                }/>
                <ForecastCard weatherMoment={
                    ({
                        weatherType: WeatherType.Cloudy,
                        time24: '21:00',
                        tempC: -20,
                    })
                }/>
                <ForecastCard weatherMoment={
                    ({
                        weatherType: WeatherType.Thunder,
                        time24: '21:00',
                        tempC: -20,
                    })
                }/>
                <ForecastCard weatherMoment={
                    ({
                        weatherType: WeatherType.SunShower,
                        time24: '21:00',
                        tempC: 50,
                    })
                }/>
                <ForecastCard weatherMoment={
                    ({
                        weatherType: WeatherType.Flurries,
                        time24: '21:00',
                        tempC: -20,
                    })
                }/>
                <ForecastCard weatherMoment={
                    ({
                        weatherType: WeatherType.Rainy,
                        time24: '21:00',
                        tempC: -20,
                    })
                }/>
                <ForecastCard weatherMoment={
                    ({
                        weatherType: WeatherType.Sunny,
                        time24: '21:00',
                        tempC: -20,
                    })
                }/>
                <ForecastCard weatherMoment={
                    ({
                        weatherType: WeatherType.Sunny,
                        time24: '21:00',
                        tempC: -20,
                    })
                }/>
            </div>
        </div>
    );
}
