interface Suggestion {
    type: string;
    displayName: string;
    value: string;
    hl: Array<Array<number>>;
}

export interface SystemState {
    suggestions:  Array<Suggestion>;
}
