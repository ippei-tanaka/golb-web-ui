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
import UserPasswordEditor from '../containers/UserPasswordEditor';
import CategoryList from '../containers/CategoryList';
import CategoryCreator from '../containers/CategoryCreator';
import CategoryEditor from '../containers/CategoryEditor';
import PostList from '../containers/PostList';
import PostCreator from '../containers/PostCreator';
import PostEditor from '../containers/PostEditor';
import SettingEditor from '../containers/SettingEditor';
import ProtectedRoute from '../containers/ProtectedRoute';
import "../style/index.scss";

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
                    <ProtectedRoute path="/users/:id" exact component={UserEditor} />
                    <ProtectedRoute path="/users/:id/password" component={UserPasswordEditor} />
                    <ProtectedRoute path="/categories" exact component={CategoryList} />
                    <ProtectedRoute path="/categories/new" component={CategoryCreator} />
                    <ProtectedRoute path="/categories/:id" component={CategoryEditor} />
                    <ProtectedRoute path="/posts" exact component={PostList} />
                    <ProtectedRoute path="/posts/new" component={PostCreator} />
                    <ProtectedRoute path="/posts/:id" component={PostEditor} />
                    <ProtectedRoute path="/settings" component={SettingEditor} />
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