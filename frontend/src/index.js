import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from "redux-persist/es/persistStore";
import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import store from "./app/store";
import App from './App';

const options = {
   timeout: 5000,
   position: positions.BOTTOM_CENTER,
   transition: transitions.SCALE
}

const persistedStore = persistStore(store)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
        <PersistGate loading={null} persistor={persistedStore}>
            <App/>
        </PersistGate>
    </AlertProvider>
</Provider>
);