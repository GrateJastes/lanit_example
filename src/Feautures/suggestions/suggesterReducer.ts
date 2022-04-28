import {SuggesterActionTypes, SystemState} from './types';
// @ts-ignore
import ymaps from 'ymaps';

const initialState: SystemState = {
    suggestions: {
        list: [],
    }
}

export default (state = initialState, action: SuggesterActionTypes) => {
    switch (action.type) {
        case 'REFRESH_SEARCH':
            // @ts-ignore
            ymaps
                .load()
                .then((maps) => maps.suggest('хим')
                    .then((items) => ))
        case 'DROP_SEARCH':
            return { ...state, list: []};
        default:
            return state;
    }
}
