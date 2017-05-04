import React from 'react';
import PropTypes from 'prop-types';
import ErrorMessage from './ErrorMessage';

const UserForm = ({
    onSubmit, onChange, email, display_name, password, slug, error, showPasswordField = false}) =>
{
    return (
        <form onSubmit={onSubmit}>
            Email: <input type="email" name="email" value={email} onChange={onChange} /><br />
            {showPasswordField ? "Password: " + <input type="password" name="password" value={password} onChange={onChange} /> + <br /> : null}
            Display Name: <input type="text" name="display_name" value={display_name} onChange={onChange} /><br />
            Slug: <input type="text" name="slug" value={slug} onChange={onChange} />
            {error && error.message ? <ErrorMessage message={error.message}/> : null}<br />
            <button>Submit</button>
        </form>
    );
};

UserForm.propTypes =
{
    email: PropTypes.string.isRequired,
    password: PropTypes.string,
    display_name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.shape({
        message: PropTypes.object,
        name: PropTypes.string
    }),
    showPasswordField: PropTypes.bool
};

export default UserForm;