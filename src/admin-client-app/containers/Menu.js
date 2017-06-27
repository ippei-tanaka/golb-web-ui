import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import actionCreators from '../action-creators'

let Menu = ({logout, loggedInUser, authenticate}) =>
{
    return (
        <header className="module-header">
            <ul className="m-hdr-list">
                <li className="m-hdr-list-item"><Link className="m-hdr-link" to="/">Home</Link></li>
                <li className="m-hdr-list-item"><Link className="m-hdr-link" to="/dashboard">Dashboard</Link></li>
                <li className="m-hdr-list-item"><Link className="m-hdr-link" to="/users">User List</Link></li>
                <li className="m-hdr-list-item"><Link className="m-hdr-link" to="/categories">Category List</Link></li>
                <li className="m-hdr-list-item"><Link className="m-hdr-link" to="/posts">Post List</Link></li>
                <li className="m-hdr-list-item"><Link className="m-hdr-link" to="/settings">Settings</Link></li>
                <li className="m-hdr-list-item"><a className="m-hdr-link" href="#" onClick={e =>
                {
                    e.preventDefault();
                    logout().then(authenticate);
                }}>Logout</a></li>
            </ul>
            <p className="m-hdr-message">Hello, {loggedInUser.display_name}!</p>
        </header>
    );
};

Menu = connect(s => s, actionCreators)(Menu);

export default Menu;