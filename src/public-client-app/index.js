import React from 'react';
import {render} from 'react-dom';
import Root from './components/Root';

render(
    <Root {...__PRELOADED_STATE__} />,
    document.getElementById("root")
);