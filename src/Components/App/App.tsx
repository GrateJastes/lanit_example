import React from 'react';
import './App.scss';
import SearchBar from '../SearchBar/SearchBar';
import { Provider } from 'react-redux';
import { store } from '../../store'
import { ForecastBlock } from '../ForecastBlock/ForecastBlock';
import { useAppSelector } from '../../hooks';

function App() {
    return (
        <Provider store={store}>
            <div className="App">
                <header className="App-header">
                    <h1 className="App-header__service-name">ПОГОДА</h1>
                    <SearchBar/>
                </header>
                <ForecastBlock/>
            </div>
        </Provider>
    );
}

export default App;
