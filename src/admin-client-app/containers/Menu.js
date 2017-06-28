import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import actionCreators from '../action-creators'

let Menu = class extends Component
{
    constructor (props)
    {
        super(props);

        this.state = {
            expanded: false
        }
    }

    render ()
    {
        const {logout, authenticate, loggedInUser} = this.props;

        return (
            <nav className="module-menu">
                <button className="m-mnu-fold-button" onClick={e => {
                    e.preventDefault();
                    this.setState({expanded: !this.state.expanded});
                }}>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </button>
                <ul className={`m-mnu-list ${this.state.expanded ? 'm-mnu-expanded' : ''}`}>
                    <li className="m-mnu-list-item"><Link className="m-mnu-link" to="/">Home</Link></li>
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
    }
};

Menu = connect(s => s, actionCreators)(Menu);

export default Menu;