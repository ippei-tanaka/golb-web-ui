import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Root from '../components/Root';
import {Text, Form} from '../components/form';
import actionCreators from '../action-creators'

let UserEditor = class extends Component
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
        const {editUser, users, match, history} = this.props;
        const id = match.params.id;
        const user = users[id];

        return (
            <Root>
                <section>
                    <h2>Edit User</h2>
                    {user ? (
                        <Form
                            initialEntries={user}
                            onSubmit={values => editUser(id, values)}
                            onSubmissionSucceed={() => history.push('/users')}>
                            <Text name="email" label="Email" />
                            <Text name="display_name" label="Display Name" />
                            <Text name="slug" label="Slug" />
                            <button>Submit</button>
                        </Form>
                    ) : (
                        <div>loading...</div>
                    )}
                </section>
                <nav><Link to={`/users/${id}/password`}>Edit Password</Link></nav>
            </Root>
        );
    }
};

UserEditor = connect(s => s, actionCreators)(UserEditor);

export default UserEditor;