import {REFRESH_SEARCH, DROP_SEARCH} from './actionTypes';

interface RefreshSearchAction {
    type: typeof REFRESH_SEARCH;
}

interface DropSearchAction {
    type: typeof DROP_SEARCH;
}

export type SuggesterActionTypes = RefreshSearchAction | DropSearchAction;

interface Suggestion {
    type: string;
    displayName: string;
    value: string;
    hl: Array<Array<number>>;
}

export interface SystemState {
    suggestions: {
        list: Array<Suggestion>;
    };
}
