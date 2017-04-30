import React, {PropTypes} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../action-creators/auth-action-creators';

let Header = ({dispatch, loggedInUser}) =>
{
    return (
        <header>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/users">User List</Link></li>
                <li><a href="#" onClick={e =>
                {
                    e.preventDefault();
                    dispatch(logout());
                }}>Logout</a></li>
            </ul>
            <p>Hello, {loggedInUser.display_name}!</p>
        </header>
    );
};

const mapStateToProps = (state) =>
{
    return {
        loggedInUser: state.loggedInUser
    };
};

Header = connect(mapStateToProps)(Header);

export default Header;