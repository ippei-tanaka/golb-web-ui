import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import actionCreators from '../action-creators'

let Menu = ({logout, loggedInUser, authenticate}) =>
{
    return (
        <nav className="module-menu">
            <ul className="m-mnu-list">
                <li className="m-mnu-list-item"><Link className="m-mnu-link" to="/">Home</Link></li>
                <li className="m-mnu-list-item"><Link className="m-mnu-link" to="/dashboard">Dashboard</Link></li>
                <li className="m-mnu-list-item"><Link className="m-mnu-link" to="/users">User List</Link></li>
                <li className="m-mnu-list-item"><Link className="m-mnu-link" to="/categories">Category List</Link></li>
                <li className="m-mnu-list-item"><Link className="m-mnu-link" to="/posts">Post List</Link></li>
                <li className="m-mnu-list-item"><Link className="m-mnu-link" to="/settings">Settings</Link></li>
                <li className="m-mnu-list-item"><a className="m-mnu-link" href="#" onClick={e =>
                {
                    e.preventDefault();
                    logout().then(authenticate);
                }}>Logout</a></li>
            </ul>
            <p className="m-mnu-message">Hello, {loggedInUser.display_name}!</p>
        </nav>
    );
};

Menu = connect(s => s, actionCreators)(Menu);

export default Menu;