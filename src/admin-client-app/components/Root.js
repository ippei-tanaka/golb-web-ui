import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import App from './App';


const Root = ({store, basename}) =>
{
    const history = createBrowserHistory({basename});

    return (
        <Provider store={store}>
            <BrowserRouter history={history} basename={basename}>
                <App />
            </BrowserRouter>
        </Provider>
    )
};

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;