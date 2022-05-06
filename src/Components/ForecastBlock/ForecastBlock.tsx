import React from 'react';
import './ForecastBlock.scss';
import Carousel from 'nuka-carousel';
import { ForecastSlide } from '../ForecastSlide/ForecastSlide';
import cfg from '../../config';
import { useSearchParams } from 'react-router-dom';
import { addParams } from '../../Features/utils';
import { IWeatherDay } from '../../Features/Forecaster/types';

export interface IForecastBlockProps {
    weatherForecast: Array<IWeatherDay>;
}


export function ForecastBlock(props: IForecastBlockProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const dayShift = searchParams.get('dayShift');

    const changeParams = (idx: number): void => {
        if (document.querySelector('.forecast-block_hidden')) {
            return;
        }
        addParams(
            searchParams,
            [
                {name: 'dayShift', value: `${idx}`},
            ], setSearchParams);
    }

    return (
        <div className={`forecast-block noselect ${props.weatherForecast.length === 0 ? 'forecast-block_hidden' : ''}`}>
            <Carousel
                autoplay={false}
                slidesToShow={1}
                cellAlign={'center'}
                slideIndex={parseInt(dayShift || '') || 0}
                afterSlide={changeParams}
                defaultControlsConfig={cfg.carouselStyleConfig}
            >
                {props.weatherForecast.map((weatherDay, idx) => <ForecastSlide
                    key={idx}
                    weatherDay={weatherDay}/>
                )}
            </Carousel>
        </div>
    );
}
