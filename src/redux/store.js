import { createStore, applyMiddleware } from 'redux'
import rootReducer from './index'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas';
import { persistStore, persistReducer } from 'redux-persist';

// Middleware: Redux Persist Config
const persistConfig = {
    // Root
    key: 'root',
    // Storage Method (React Native)
    storage,
    // Whitelist (Save Specific Reducers)
    // whitelist: [
    //   'authReducer',
    // ],
    // // Blacklist (Don't Save Specific Reducers)
    // blacklist: [
    //   'counterReducer',
    // ],
  };

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

// Middleware: Redux Persist Persister
let persistor = persistStore(store);

export {store, persistor};