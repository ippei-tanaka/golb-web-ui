import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Header from '../components/Header';

let UserList = () =>
{
    return (
        <div>
            <Header/>

            <h2>User List</h2>
            <table>
                <thead>
                <tr>
                    <td>#</td>
                    <td>Display Name</td>
                    <td>Email</td>
                    <td>Slug</td>
                    <td>Created</td>
                    <td>Updated</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>dd</td>
                    <td>dd</td>
                    <td>dd</td>
                    <td>dd</td>
                    <td>dd</td>
                    <td>dd</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

const mapStateToProps = (state) =>
{
    return {
        loginProcessError: state.loginProcessError
    };
};

UserList = connect(mapStateToProps)(UserList);

export default UserList;