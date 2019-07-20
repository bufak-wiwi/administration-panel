import { createStore, applyMiddleware } from 'redux'
import rootReducer from './index'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

export default store;