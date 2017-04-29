import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Login from './Login';
import Pending from '../components/Pending';
import {AuthenticationStatus} from '../actions';
import {authenticate} from '../actions';

let ProtectedRoute = class extends Component
{
    componentDidMount ()
    {
        console.log(this);
        this.props.authenticate();
    }

    render ()
    {
        const {
            component: Component,
            authenticationStatus,
            ...rest
        } = this.props;

        let TargetComponent;

        switch (authenticationStatus)
        {
            case AuthenticationStatus.AUTHENTICATED:
                TargetComponent = Component;
                break;
            case AuthenticationStatus.UNAUTHENTICATED:
                TargetComponent = Login;
                break;
            default:
                TargetComponent = Pending;
                break;
        }

        return (
            <Route {...rest} component={TargetComponent} />
        );
    }

};

const mapStateToProps = (state) =>
{
    return {
        authenticationStatus: state.authenticationStatus
    };
};

const mapDispatchToProps = dispatch => ({
    authenticate: () => dispatch(authenticate())
});

ProtectedRoute = connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);

export default ProtectedRoute;