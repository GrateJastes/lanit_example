import React from 'react';
import './ForecastBlock.scss';
import Carousel from 'nuka-carousel';
import { ForecastSlide } from '../ForecastSlide/ForecastSlide';

export function ForecastBlock() {
    return (
        <div className="forecast-block noselect">
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
                <ForecastSlide/>
                <ForecastSlide/>
                <ForecastSlide/>
                <ForecastSlide/>
            </Carousel>
        </div>
    );
}



