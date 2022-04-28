import React from 'react';
import './App.scss';
import SearchBar from '../SearchBar/SearchBar';

class App extends React.Component {
  render() {
    return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-header__service-name">ПОГОДА</h1>
            <SearchBar></SearchBar>
          </header>
        </div>
    );
  }
}

export default App;
