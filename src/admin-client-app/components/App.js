import React, {Component} from 'react';
import Home from '../components/Home';
import Dashboard from '../components/Dashboard';
import NotFound from '../components/NotFound';
import ProtectedRoute from '../containers/ProtectedRoute';
import {Switch} from 'react-router-dom';

const App = () => (
    <Switch>
        <ProtectedRoute path="/" exact component={Home}/>
        <ProtectedRoute path="/dashboard" component={Dashboard}/>
        <ProtectedRoute path="*" component={NotFound}/>
    </Switch>
);

export default App;