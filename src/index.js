import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import * as serviceWorker from './registerServiceWorker';

ReactDOM.render(
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
            <App/>
            </PersistGate>
        </Provider>,
document.getElementById('root'));

serviceWorker.register();