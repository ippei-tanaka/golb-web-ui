import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import actionCreators from '../action-creators'

let Header = ({logout, loggedInUser, authenticate}) =>
{
    return (
        <header>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/users">User List</Link></li>
                <li><Link to="/categories">Category List</Link></li>
                <li><Link to="/posts">Post List</Link></li>
                <li><a href="#" onClick={e =>
                {
                    e.preventDefault();
                    logout().then(authenticate);
                }}>Logout</a></li>
            </ul>
            <p>Hello, {loggedInUser.display_name}!</p>
        </header>
    );
};

Header = connect(s => s, actionCreators)(Header);

export default Header;