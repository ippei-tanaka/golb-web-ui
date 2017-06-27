import React, {Component} from 'react';
import AuthRoot from '../components/AuthRoot';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Text, Form} from '../components/form';
import actionCreators, {LoginProcess} from '../action-creators'

const {
    PENDING
} = LoginProcess;

let Login = class extends Component
{
    constructor (props)
    {
        super(props);
        this._token = Symbol("Login");
    }

    render ()
    {
        const {
            onLoginSucceed,
            onLoginFail,
            login,
            loginProcess
        } = this.props;

        const {
            _token: token
        } = this;

        const pending = loginProcess === PENDING;

        return (
            <AuthRoot>
                <Form
                    formId={token}
                    onSubmit={values => login(values, token)}
                    onSubmissionSucceed={onLoginSucceed}
                    onSubmissionFail={onLoginFail}>
                    <Text name="email" label="Email" disabled={pending}/>
                    <Text name="password" label="Password" type="password" disabled={pending}/>
                    <button disabled={pending}>Login</button>
                </Form>
            </AuthRoot>
        );
    }
};


Login.propTypes = {
    onLoginSucceed: PropTypes.func,
    onLoginFail: PropTypes.func
};

Login.defaultProps = {
    onLoginSucceed: () => {},
    onLoginFail:  () => {}
};

Login = connect(s => s, actionCreators)(Login);

export default Login;