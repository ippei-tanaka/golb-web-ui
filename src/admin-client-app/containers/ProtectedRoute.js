import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Pending from '../components/Pending';
import Login from './Login';
import actionCreators, {AuthenticationStatus, LoginProcess} from '../action-creators'

const {
    AUTHENTICATED,
    PENDING,
    UNAUTHENTICATED,
    PRISTINE
} = AuthenticationStatus;

let ProtectedRoute = class extends Component
{
    componentWillMount ()
    {
        this.props.authenticate();
    }

    render ()
    {
        const {
            component: Component,
            authenticationStatus,
            path,
            computedMatch,
            location,
            authenticate
        } = this.props;

        const bypassed = {path, computedMatch, location};

        switch (authenticationStatus)
        {
            case AUTHENTICATED:
                return (
                    <Route {...bypassed} component={Component}/>
                );

            case UNAUTHENTICATED:
                return (
                    <Route {...bypassed} render={props => (
                        <Login {...props} onLoginSucceed={authenticate}/>
                    )}/>
                );

            case PENDING:
            case PRISTINE:
            default:
                return (
                    <Route {...bypassed} component={Pending}/>
                );
        }
    }

};

ProtectedRoute = connect(s => s, actionCreators)(ProtectedRoute);

export default ProtectedRoute;