import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Header from './Header';
import {Text, Form} from './form';
import actionCreators from '../action-creators'

let UserEditor = class extends Component
{
    componentWillMount ()
    {
        const {match, users, loadUsers} = this.props;
        const id = match.params.id;
        const user = users.find(u => u._id === id);

        if (!user)
        {
            loadUsers(id);
        }

        this._token = Symbol("UserEditor" + id);
    }

    render ()
    {
        const {editUser, users, match, _token: token} = this.props;
        const id = match.params.id;
        const user = users.find(u => u._id === id);

        return (
            <div>
                <Header/>
                <section>
                    <h2>Edit User</h2>
                    {user ? (
                        <Form
                            formId={token}
                            initialValues={user}
                            onSubmit={values => editUser(id, values, token)}>
                            <Text name="email" label="Email" />
                            <Text name="display_name" label="Display Name" />
                            <Text name="slug" label="Slug" />
                            <button>Submit</button>
                        </Form>
                    ) : (
                        <div>loading...</div>
                    )}
                </section>
                <nav>
                    <Link to="/users">user list</Link>
                </nav>
            </div>
        );
    }
};

UserEditor = connect(s => s, actionCreators)(UserEditor);

export default UserEditor;