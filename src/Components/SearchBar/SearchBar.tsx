import React from 'react';
import Select, {ActionMeta} from 'react-select';
import './SearchBar.scss'

// @ts-ignore
import ymaps from 'ymaps';

import consts from '../../consts';

class SearchBar extends React.Component {
    checkForData = (searchQuery: string) => {
        if (searchQuery.length >= consts.minSearchLength) {
            console.log('request sent');
        }
    };

    componentDidMount() {
        // @ts-ignore
        ymaps.load().then((maps) => maps.suggest('хим').then((items) => console.log(items)));
    }

    render() {
        return (
            <Select
                placeholder={'Выберите город'}
                className="search-bar"
                noOptionsMessage={() => <span className="App-header__no-option">
                Введите минимум 3 символа, или попробуйте изменить запрос
                </span>}
                onInputChange={this.checkForData}
            ></Select>
        );
    }
}

export default SearchBar;
