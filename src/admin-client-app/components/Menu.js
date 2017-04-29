import React, { PropTypes } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../actions';

let Menu = ({dispatch}) => {
    return (
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><a href="#" onClick={e => {
                e.preventDefault();
                dispatch(logout());
            }}>Logout</a></li>
        </ul>
    );
};

Menu = connect()(Menu);

export default Menu;