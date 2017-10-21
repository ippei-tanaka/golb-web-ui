import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Root from '../components/Root';
import {Text, Button, Form} from '../components/form';
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
                <div className="module-content">
                    <h1 className="m-ctt-title">Edit User</h1>
                    <section className="m-ctt-section">
                        {user ? (
                            <Form
                                onSubmit={values => editUser(id, values)}
                                onSubmissionSucceed={() => history.push('/users')}>
                                <Text name="email" label="Email" initialValue={user.email} />
                                <Text name="display_name" label="Display Name" initialValue={user.display_name} />
                                <Text name="slug" label="Slug" initialValue={user.slug} />
                                <Button>Submit</Button>
                            </Form>
                        ) : (
                            <div>loading...</div>
                        )}
                    </section>
                    <section className="m-ctt-section">
                        <nav>
                            <Link to={`/users/${id}/password`}>Edit Password</Link>
                        </nav>
                    </section>
                </div>
            </Root>
        );
    }
};

UserEditor = connect(s => s, actionCreators)(UserEditor);

export default UserEditor;