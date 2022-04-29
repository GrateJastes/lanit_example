export interface WeatherMoment {
    time24: string;
    icon: string;
    tempC: number;
}

export interface WeatherDay {
    weekDay: string;
    forecasts: Array<WeatherMoment>;
}
