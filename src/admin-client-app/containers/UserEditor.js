import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Header from './Header';
import {Text, Form} from './form';
import {editUser, loadUsers} from '../action-creators/user-action-creators';

let UserEditor = class extends Component
{
    constructor (props)
    {
        super(props);

        const {match} = this.props;
        const id = match.params.id;
        this._token = Symbol("UserEditor" + id);
    }

    render ()
    {
        const {editUser, loadUsers, users, match, _token: token} = this.props;
        const id = match.params.id;
        const user = users.find(u => u._id === id);

        if (!user)
        {
            loadUsers(id);
        }

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

const mapStateToProps = (state) =>
{
    return {
        users: state.users
    };
};

const mapDispatchToProps = dispatch => ({
    loadUsers: (...args) => dispatch(loadUsers(...args)),
    editUser: (...args) => dispatch(editUser(...args))
});

UserEditor = connect(mapStateToProps, mapDispatchToProps)(UserEditor);

export default UserEditor;