const defaultState = {
    tenant: '',
    tenantToken: '',
    token: ''
};

const AppReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'LOGOUT':
            return {
                ...state,
                tenantToken: '',
                token: ''
            };
        case 'SET_TENANT_TOKEN':
            return {
                ...state,
                tenant: action.tenant,
                tenantToken: action.token
            };
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            };
        default:
            return state;
    }
};

export default AppReducer;