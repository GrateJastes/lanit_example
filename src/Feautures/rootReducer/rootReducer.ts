import {combineReducers} from 'redux';
import suggesterReducer from '../suggester/suggesterSlice';
import forecasterReducer from '../forecaster/forecasterSlice';

export const rootReducer = combineReducers({
    suggester: suggesterReducer,
    forecaster: forecasterReducer,
});
