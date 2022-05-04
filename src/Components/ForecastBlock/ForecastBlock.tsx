import React from 'react';
import './ForecastBlock.scss';
import Carousel from 'nuka-carousel';
import { ForecastSlide } from '../ForecastSlide/ForecastSlide';
import { useAppSelector } from '../../hooks';
import cfg from '../../config';
import { useSearchParams } from 'react-router-dom';
import addParams from '../../Features/utils';


export function ForecastBlock() {
    const weatherForecast = useAppSelector((state) => state.forecaster.days);
    const [searchParams] = useSearchParams();
    const place = searchParams.get('place');
    const dayShift = searchParams.get('dayShift');


    const changeParams = (idx: number): void => {
        if (!place) {
            return;
        }

        addParams(searchParams, [
            {name: 'dayShift', value: `${idx}`},
        ]);
    }

    return (
        <div className={`forecast-block noselect ${weatherForecast.length === 0 ? 'forecast-block_hidden' : ''}`}>
            <Carousel
                autoplay={false}
                slidesToShow={1}
                cellAlign={'center'}
                slideIndex={parseInt(dayShift || '') || 0}
                afterSlide={changeParams}
                defaultControlsConfig={cfg.carouselStyleConfig}
            >
                {weatherForecast.map((weatherDay, idx) => <ForecastSlide
                    key={idx}
                    weatherDay={weatherDay}/>
                )}
            </Carousel>
        </div>
    );
}
