import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Pending from '../components/Pending';
import {Text, Form} from './form';
import actionCreators, {AuthenticationStatus} from '../action-creators'

const {
    AUTHENTICATED,
    PENDING,
    UNAUTHENTICATED,
    PRISTINE
} = AuthenticationStatus;

let ProtectedRoute = class extends Component
{
    constructor (props)
    {
        super(props);
        this._token = Symbol("Login");
    }

    componentDidMount ()
    {
        this.props.authenticate();
    }

    render ()
    {
        const {
            component: Component,
            authenticationStatus,
            login,
            computedMatch,
            location
        } = this.props;

        const bypassed = {computedMatch, location};

        const {_token: token} = this;

        switch (authenticationStatus)
        {
            case AUTHENTICATED:
                return (
                    <Route {...bypassed} component={Component}/>
                );

            case PENDING:
            case UNAUTHENTICATED:
                const pending = authenticationStatus === PENDING;
                return (
                    <Route {...bypassed} render={props => (
                        <Form
                            formId={token}
                            onSubmit={values => login(values, token)}>
                            <Text name="email" label="Email" disabled={pending}/>
                            <Text name="password" label="Password" type="password" disabled={pending}/>
                            <button disabled={pending}>Login</button>
                        </Form>
                    )}/>
                );

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