import React from 'react';
import {render} from 'react-dom';
import {createStore} from './store';
import App from './components/App';

const { ADMIN_ROOT } = window.__GOLB_ENV__;

render(
    <App store={createStore()} basename={ADMIN_ROOT} />,
    document.getElementById("App")
);