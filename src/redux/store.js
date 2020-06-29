import { createStore, applyMiddleware } from 'redux'
import rootReducer from './index'
import storage from 'redux-persist/lib/storage'
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../sagas';
import { persistStore, persistReducer } from 'redux-persist';
import { seamlessImmutableReconciler, seamlessImmutableTransformCreator } from 'redux-persist-seamless-immutable'

// 
const transformerConfig = {
  // whitelistPerReducer: {
  //   reducerA: ['keyA', 'keyB']
  // },
  blacklistPerReducer: { }
}

// Middleware: Redux Persist Config
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: seamlessImmutableReconciler,
    transforms: [seamlessImmutableTransformCreator(transformerConfig)]
  };

// Middleware: Redux Persist Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga);

// Middleware: Redux Persist Persister
const persistor = persistStore(store);

export {store, persistor};