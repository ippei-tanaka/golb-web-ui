import React, {Component} from 'react';
import {connect} from 'react-redux';
import Layout from '../components/Layout';
import {Text, Form} from '../components/form';
import actionCreators from '../action-creators'

let UserPasswordEditor = class extends Component
{
    componentWillMount ()
    {
        const {loadUsers, users, match} = this.props;
        const id = match.params.id;

        if (!users[id])
        {
            loadUsers();
        }
    }

    render ()
    {
        const {editUserPassword, users, match, history} = this.props;
        const id = match.params.id;
        const user = users[id];

        return (
            <Layout>
                <section>
                    <h2>Edit User Password</h2>
                    {user ? (
                        <Form
                            onSubmit={values => editUserPassword(id, values)}
                            onSubmissionSucceed={() => history.push(`/users/${id}`)}>
                            <Text name="old_password" label="Current Password" type="password" />
                            <Text name="password" label="New Password" type="password" />
                            <Text name="password_confirmed" label="New Password Confirmed" type="password" />
                            <button>Submit</button>
                        </Form>
                    ) : (
                        <div>loading...</div>
                    )}
                </section>
            </Layout>
        );
    }
};

UserPasswordEditor = connect(s => s, actionCreators)(UserPasswordEditor);

export default UserPasswordEditor;