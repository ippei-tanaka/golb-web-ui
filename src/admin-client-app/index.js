import React from 'react';
import {render} from 'react-dom';
import {createStore} from './store';
import Root from './components/Root';

const { ADMIN_ROOT, NODE_ENV } = process.env;

render(
    <Root store={createStore()} basename={ADMIN_ROOT} />,
    document.getElementById("Root")
);