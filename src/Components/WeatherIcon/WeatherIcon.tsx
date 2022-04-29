import React from 'react';
import './WeatherIcon.scss';

export interface WIconProps {
    weatherType: WeatherType;
}

export enum WeatherType {
    SunShower = 'sun-shower',
    Thunder = 'thunder-storm',
    Cloudy = 'cloudy',
    Flurries = 'flurries',
    Sunny = 'sunny',
    Rainy = 'rainy',
}

export const terminateWeatherType = (weatherID: number): WeatherType => {
    switch (true) {
        case weatherID >= 200 && weatherID < 300:
            return WeatherType.Thunder;
        case (weatherID >= 300 && weatherID < 400) || (weatherID >= 511 && weatherID < 600):
            return WeatherType.Rainy;
        case weatherID >= 500 && weatherID < 520:
            return WeatherType.SunShower;
        case weatherID >= 600 && weatherID < 700:
            return WeatherType.Flurries;
        case weatherID === 800:
            return WeatherType.Sunny;
        case weatherID > 800 && weatherID < 900:
            return WeatherType.Cloudy;
        default:
            return WeatherType.Sunny;
    }
};

export function WeatherIcon(props: WIconProps) {
    const weatherType = props.weatherType;
    const sunIsNeeded = props.weatherType === WeatherType.Sunny || weatherType === WeatherType.SunShower;

    return (
        <div className={`icon ${weatherType}`}>
            {weatherType !== WeatherType.Sunny && <div className="cloud"></div>}
            {weatherType === WeatherType.Cloudy && <div className="cloud"></div>}
            {weatherType === WeatherType.Rainy && <div className="rain"></div>}
            {sunIsNeeded &&
                <div className="sun">
                    <div className="rays"></div>
                </div>
            }
            {weatherType === WeatherType.Thunder &&
                <div className="lightning">
                    <div className="bolt"></div>
                    <div className="bolt"></div>
                </div>
            }
            {weatherType === WeatherType.Flurries &&
                <div className="snow">
                    <div className="flake"></div>
                    <div className="flake"></div>
                </div>
            }
        </div>
    );
}
