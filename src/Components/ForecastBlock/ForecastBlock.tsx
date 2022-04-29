import React from 'react';
import { ForecastCard } from '../ForecastCard/ForecastCard';
import { WeatherType } from '../WeatherIcon/WeatherIcon';
import './ForecastBlock.scss';

export function ForecastBlock() {
    return (
        <div className="forecast-block">
            <h3 className="forecast-block__weekday">Понедельник</h3>
            <div className="forecast-block__cards">
                <ForecastCard weatherMoment={
                    ({
                        weatherType: WeatherType.Sunny,
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
