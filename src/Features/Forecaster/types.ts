import { WeatherType } from '../../Components/WeatherIcon/WeatherIcon';

interface Weather {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export interface Forecast {
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
    weather: Array<Weather>;
}

export interface WeatherMoment {
    weatherType: WeatherType;
    time24: string;
    tempC: number;
}

export interface WeatherDay {
    weekDay: string;
    forecasts: Array<WeatherMoment>;
}
