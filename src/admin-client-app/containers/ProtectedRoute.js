import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Login from './Login';
import AuthPending from '../components/AuthPending';
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
            render,
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
                    <Route {...bypassed} render={render} component={Component}/>
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
                    <Route {...bypassed} render={props => (
                        <AuthPending>Checking...</AuthPending>
                    )}/>
                );
        }
    }

};

ProtectedRoute = connect(s => s, actionCreators)(ProtectedRoute);

export default ProtectedRoute;