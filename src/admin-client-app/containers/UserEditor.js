import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {Text, Form} from '../components/form';
import actionCreators from '../action-creators'

let UserEditor = class extends Component
{
    componentWillMount ()
    {
        this.props.loadUsers();
    }

    render ()
    {
        const {editUser, users, match, history} = this.props;
        const id = match.params.id;
        const user = users[id];

        return (
            <div>
                <Header/>
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
            </div>
        );
    }
};

UserEditor = connect(s => s, actionCreators)(UserEditor);

export default UserEditor;