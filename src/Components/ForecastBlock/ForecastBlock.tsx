import React from 'react';
import './ForecastBlock.scss';
import Carousel from 'nuka-carousel';
import { ForecastSlide } from '../ForecastSlide/ForecastSlide';
import { useAppSelector } from '../../hooks';
import consts from '../../consts';
import addParams from '../../Feautures/utils';


export interface IForecastBlockProps {
    dayShift: number | null;
}


export function ForecastBlock(props: IForecastBlockProps) {
    const weatherForecast = useAppSelector((state) => state.forecaster.days);

    const changeParams = (idx: number): void => {
        const newParams = new URLSearchParams(window.location.search);

        if (!newParams.get('place')) {
            return;
        }

        addParams(newParams, [{name: 'dayShift', value: `${idx}`}]);
    }

    return (
        <div className={`forecast-block noselect ${weatherForecast.length === 0 ? 'forecast-block_hidden' : ''}`}>
            <Carousel
                autoplay={false}
                slidesToShow={1}
                cellAlign={'center'}
                slideIndex={props.dayShift || 0}
                afterSlide={changeParams}
                defaultControlsConfig={consts.carouselStyleConfig}
            >
                {weatherForecast.map((weatherDay, idx) => <ForecastSlide
                    key={idx}
                    weatherDay={weatherDay}/>
                )}
            </Carousel>
        </div>
    );
}
