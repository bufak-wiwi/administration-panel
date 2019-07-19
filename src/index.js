import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/index'
import { Provider } from 'react-redux'
import App from './App';
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
        <Provider store={store}>
            <App />
        </Provider>,
document.getElementById('root'));