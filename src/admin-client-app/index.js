import React from 'react';
import {render} from 'react-dom';
import {createStore} from './store';
import Root from './components/Root';

const { ADMIN_ROOT } = window.__GOLB_ENV__;

render(
    <Root store={createStore()} basename={ADMIN_ROOT} />,
    document.getElementById("Root")
);