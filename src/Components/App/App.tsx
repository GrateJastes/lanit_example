import React from 'react';
import './App.scss';
import SearchBar from '../SearchBar/SearchBar';
import { Provider } from 'react-redux';
import { store } from '../../store'
import { ForecastBlock } from '../ForecastBlock/ForecastBlock';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <header className="App-header">
                        <h1 className="App-header__service-name">ПОГОДА</h1>
                        <SearchBar/>
                    </header>
                    <ForecastBlock/>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
