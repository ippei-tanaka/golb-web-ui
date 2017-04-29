import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';

const LoginForm = ({email, password, error, onSubmit, onChange}) =>
{
    return (
        <form onSubmit={onSubmit}>
            email: <input name="email" type="email" value={email} onChange={onChange}/><br />
            password: <input name="password" type="password" value={password} onChange={onChange}/><br />
            {error && error.message ? <ErrorMessage message={error.message}/> : null}
            <button>Login</button>
        </form>
    );
};

LoginForm.propTypes =
{
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.shape({
        message: PropTypes.object,
        name: PropTypes.string
    })
};

export default LoginForm;