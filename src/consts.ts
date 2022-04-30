const translateWeekDay: { [key: string]: string; } = {
    Monday: 'Понедельник',
    Tuesday: 'Вторник',
    Wednesday: 'Среда',
    Thursday: 'Четверг',
    Friday: 'Пятница',
    Saturday: 'Суббота',
    Sunday: 'Воскресенье',
};

const consts = {
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
};

export default consts;
