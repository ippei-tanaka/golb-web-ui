import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {Switch} from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import UserList from '../containers/UserList';
import UserCreator from '../containers/UserCreator';
import UserEditor from '../containers/UserEditor';
import ProtectedRoute from '../containers/ProtectedRoute';

const Root = ({store, basename}) =>
{
    const history = createBrowserHistory({basename});

    return (
        <Provider store={store}>
            <BrowserRouter history={history} basename={basename}>
                <Switch>
                    <ProtectedRoute path="/" exact component={Home}/>
                    <ProtectedRoute path="/dashboard" component={Dashboard}/>
                    <ProtectedRoute path="/users" exact component={UserList} />
                    <ProtectedRoute path="/users/new" component={UserCreator} />
                    <ProtectedRoute path="/users/:id" component={UserEditor} />
                    <ProtectedRoute path="*" component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </Provider>
    )
};

Root.propTypes = {
    store: PropTypes.object.isRequired,
};

export default Root;