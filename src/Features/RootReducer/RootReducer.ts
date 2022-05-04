import { combineReducers } from 'redux';
import suggesterReducer from '../Suggester/SuggesterSlice';
import forecasterReducer from '../Forecaster/ForecasterSlice';

export const rootReducer = combineReducers({
    suggester: suggesterReducer,
    forecaster: forecasterReducer,
});
