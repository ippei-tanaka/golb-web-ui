import React from 'react';
import { connect } from 'react-redux';
import { postLoginCredentials } from '../actions';

let Login = ({dispatch}) =>
{
    let emailInput;
    let passwordInput;

    return (
        <form onSubmit={e =>
        {
            e.preventDefault();

            if (!emailInput.value.trim()) {
                return;
            }

            dispatch(postLoginCredentials({
                email: emailInput.value,
                password: passwordInput.value
            }));
        }}>
            email: <input type="text" ref={node => {emailInput = node }} /><br />
            password: <input type="password" ref={node => {passwordInput = node }} /><br />
            <button>Login</button>
        </form>
    );
};

Login = connect()(Login);

export default Login;