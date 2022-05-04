const translateWeekDay: { [key: string]: string; } = {
    Monday: 'Понедельник',
    Tuesday: 'Вторник',
    Wednesday: 'Среда',
    Thursday: 'Четверг',
    Friday: 'Пятница',
    Saturday: 'Суббота',
    Sunday: 'Воскресенье',
};

const config =  {
    secrets: {
        apiKeyWeather: '24b5112cc936ef1b2b4049991aadfa88',
        apiKeyGeo: '0459582a-7b73-41da-8dd1-f714c753635e',
    },

    geoApi: 'https://geocode-maps.yandex.ru/1.x/',
    weatherApi: 'http://api.openweathermap.org/data/2.5/forecast',

    translateWeekDay,
    minSearchLength: 3,
    dailyForecasts: 8,

    midnight: '00:00',

    carouselStyleConfig: {
        nextButtonText: '›',
        nextButtonStyle: {
            fontSize: '60px',
            backgroundColor: 'transparent',

        },
        prevButtonText: '‹',
        prevButtonStyle: {
            fontSize: '60px',
            backgroundColor: 'transparent',

        },
    },
}

export default config;
