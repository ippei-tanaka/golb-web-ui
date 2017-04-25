import React from 'react';
import PropTypes from 'prop-types';
import {Provider, connect} from 'react-redux';
import {BrowserRouter, Route, Link, Redirect, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import Login from '../containers/Login';
import App from '../components/App';
import Home from '../components/Home';
import NotFound from '../components/NotFound';
import ProtectedRoute from '../containers/ProtectedRoute';

const Root = ({store, basename}) =>
{
    const history = createBrowserHistory({basename});

    return (
        <Provider store={store}>
            <BrowserRouter history={history} basename={basename}>
                <div>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/app">App</Link></li>
                    </ul>
                    <Switch>
                        <ProtectedRoute path="/" exact component={Home} alternativeComponent={Login}/>
                        <ProtectedRoute path="/app" component={App} alternativeComponent={Login}/>
                        <ProtectedRoute path="*" component={NotFound} alternativeComponent={Login}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </Provider>
    )
};

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;