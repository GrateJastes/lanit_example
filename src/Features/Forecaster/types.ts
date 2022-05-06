import { WeatherType } from '../../Components/WeatherIcon/WeatherIcon';

interface IWeather {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export interface IOpenWeatherForecast {
    clouds: {
        all: string;
    };
    dt: number;
    dt_txt: string;
    pop: number;
    visibility: number;
    sys: {
        pod: string;
    };
    wind: {
        deg: number;
        gust: number;
        speed: number;
    };
    main: {
        feels_like: number;
        grnd_level: number;
        humidity: number;
        pressure: number;
        sea_level: number;
        temp: number;
        temp_kf: number;
        temp_max: number;
        temp_min: number;
    };
    weather: Array<IWeather>;
}

export interface IWeatherMoment {
    weatherType: WeatherType;
    time24: string;
    tempC: number;
}

export interface IWeatherDay {
    weekDay: string;
    forecasts: Array<IWeatherMoment>;
}
