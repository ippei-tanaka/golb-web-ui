import React from 'react';
import {render} from 'react-dom';
import Root from './components/Root';
import "./style/index.scss";

render(
    <Root {...__PRELOADED_STATE__} />,
    document.getElementById("root")
);