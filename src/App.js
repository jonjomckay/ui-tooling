import React, { Component } from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist';
import { PersistGate } from 'redux-persist/es/integration/react';
import storage from 'redux-persist/es/storage';
import AppReducer from "./AppReducer";
import AppContent from "./AppContent";
import './App.css';
import Errors from "./common/Errors";
import FlowGraphReducer from "./flows/graph/FlowGraphReducer";
import OutcomeReducer from "./flows/graph/outcomes/OutcomeReducer";

const config = {
    key: 'app',
    storage,
    whitelist: ['app']
};

const store = createStore(persistCombineReducers(config, {
    app: AppReducer,
    graph: FlowGraphReducer,
    outcome: OutcomeReducer
}), applyMiddleware(logger));

const persistor = persistStore(store);

// Enable global error handler for axios
axios.interceptors.request.use(request => request, Errors.handleError);
axios.interceptors.response.use(response => response, Errors.handleError);

class App extends Component {
    render() {
        return (
            <Provider store={ store }>
                <PersistGate persistor={ persistor }>
                    <AppContent />
                </PersistGate>
            </Provider>
        );
    }
}

export default App;
