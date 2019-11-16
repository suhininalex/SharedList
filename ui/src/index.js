import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import {
    combineReducers,
    createStore,
    applyMiddleware,
} from 'redux';

import thunk from 'redux-thunk';

import logger from 'redux-logger'

import './index.css';

import { App } from 'app';
import { productListReducer } from 'lists';

const store = createStore(
    combineReducers({
        productList: productListReducer,
    }),
    applyMiddleware(thunk, logger)
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
