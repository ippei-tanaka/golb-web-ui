import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {loadUsers} from '../action-creators/user-action-creators';

let UserList = class extends Component
{
    componentDidMount ()
    {
        this.props.loadUsers();
    }

    render ()
    {
        const {users} = this.props;

        return (
            <div>
                <Header/>

                <h2>User List</h2>
                <table>
                    <thead>
                    <tr>
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
                            <td>{user.display_name}</td>
                            <td>{user.email}</td>
                            <td>{user.slug}</td>
                            <td>{user.created_date}</td>
                            <td>{user.updated_date}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    }
};

const mapStateToProps = (state) =>
{
    return {
        users: state.users
    };
};

const mapDispatchToProps = dispatch => ({
    loadUsers: () => dispatch(loadUsers()),
});

UserList = connect(mapStateToProps, mapDispatchToProps)(UserList);

export default UserList;