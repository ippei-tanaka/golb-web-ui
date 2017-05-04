import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {Link} from 'react-router-dom';
import actionCreators from '../action-creators'

let UserList = class extends Component
{
    componentWillMount ()
    {
        this.props.loadUsers();
    }

    render ()
    {
        const {users} = this.props;

        return (
            <div>
                <Header/>
                <section>
                    <h2>User List</h2>
                    <table>
                        <thead>
                        <tr>
                            <td></td>
                            <td></td>
                            <td>Display Name</td>
                            <td>Email</td>
                            <td>Slug</td>
                            <td>Created</td>
                            <td>Updated</td>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td><Link to={`/users/${user._id}`}>edit</Link></td>
                                <td>{user.display_name}</td>
                                <td>{user.email}</td>
                                <td>{user.slug}</td>
                                <td>{user.created_date}</td>
                                <td>{user.updated_date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
                <aside>
                    <Link to="/users/new">create a new user</Link>
                </aside>
            </div>
        );
    }
};

UserList = connect(s => s, actionCreators)(UserList);

export default UserList;