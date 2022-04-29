import React from 'react';
import './ForecastBlock.scss';
import Carousel from 'nuka-carousel';
import { ForecastSlide } from '../ForecastSlide/ForecastSlide';
import { useAppSelector } from '../../hooks';

export function ForecastBlock() {
    const placeSelected = useAppSelector((state) => state.suggester.selectedOption !== '');
    const weatherForecast = useAppSelector((state) => state.forecaster.days);

    if (!placeSelected) {
        return (<div></div>);
    }

    return (
        <div className={`forecast-block noselect`}>
            <Carousel
                autoplay={false}
                slidesToShow={1}
                cellAlign={'center'}
                defaultControlsConfig={({
                    nextButtonText: '›',
                    nextButtonStyle: {
                        fontSize: '60px',
                        backgroundColor: 'transparent',

                    },
                    prevButtonText: '‹',
                    prevButtonStyle: {
                        fontSize: '60px',
                        backgroundColor: 'transparent',

                    }
                })}
            >
                {weatherForecast.map((weatherDay) => <ForecastSlide weatherDay={weatherDay}/>)}
            </Carousel>
        </div>
    );
}



