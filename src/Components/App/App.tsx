import React from 'react';
import './App.scss';
import SearchBar from '../SearchBar/SearchBar';
import { Provider } from 'react-redux';
import { store } from '../../store'
import { ForecastBlock } from '../ForecastBlock/ForecastBlock';


export interface IAppProps {
    place: string | null;
    placeLabel: string | null;
    dayShift: number | null;
}


function App(props: IAppProps) {
    return (
        <Provider store={store}>
            <div className="App">
                <header className="App-header">
                    <h1 className="App-header__service-name">ПОГОДА</h1>
                    <SearchBar {...props}/>
                </header>
                <ForecastBlock {...props}/>
            </div>
        </Provider>
    );
}

export default App;
