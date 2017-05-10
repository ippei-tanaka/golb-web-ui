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
                                <td><a href="#"
                                       data-user-id={user._id}
                                       data-user-display-name={user.display_name}
                                       onClick={this.onClickDelete.bind(this)}>delete</a></td>
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

    onClickDelete (event)
    {
        event.preventDefault();
        const {deleteUser} = this.props;
        const id = event.target.getAttribute('data-user-id');
        const displayName = event.target.getAttribute('data-user-display-name');
        if (window.confirm(`Do you want to delete ${displayName}?`))
        {
            deleteUser(id).catch(error => alert(error.message.reduce((i, j) => i + ', ' + j)));
        }
    }
};

UserList = connect(s => s, actionCreators)(UserList);

export default UserList;