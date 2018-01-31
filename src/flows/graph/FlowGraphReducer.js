const defaultState = {
    undoManager: null
};

const FlowGraphReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'SET_UNDO_MANAGER':
            return {
                ...state,
                undoManager: action.handler
            };
        default:
            return state;
    }
};

export default FlowGraphReducer;