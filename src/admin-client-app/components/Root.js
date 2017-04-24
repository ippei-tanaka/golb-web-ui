import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import Login from '../containers/Login';
import Login2 from '../containers/Login2';
import {createBrowserHistory} from 'history';

const history = createBrowserHistory({
    basename: "/admin"
});

const Root = ({store}) => (
    <Provider store={store}>
        <BrowserRouter history={history} basename="/admin">
            <div>
                <ul>
                    <li><Link to="/">Login</Link></li>
                    <li><Link to="/r">Login2</Link></li>
                </ul>

                <Route path="/" exact component={Login} />
                <Route path="/r" component={Login2}/>
            </div>
        </BrowserRouter>
    </Provider>
);

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;