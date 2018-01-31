const defaultState = {
    onChangeLabel: null,
    isEditing: false,
    source: '',
    target: ''
};

const OutcomeReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'TOGGLE_OUTCOME_EDITING':
            return {
                ...state,
                onChangeLabel: action.onChangeLabel,
                isEditing: !state.isEditing,
                source: action.source,
                target: action.target
            };
        default:
            return state;
    }
};

export default OutcomeReducer;