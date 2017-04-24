import React from 'react';
import {render} from 'react-dom';
import {createStore} from './store';
import Root from './components/Root';

render(
    <Root store={createStore()}/>,
    document.getElementById("Root")
);