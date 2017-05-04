import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Header from './Header';
import {Text, Form} from './form';
import {createUser} from '../action-creators/user-action-creators';

let UserCreator = class extends Component
{
    constructor (props)
    {
        super(props);
        this._token = Symbol("UserCreator");
    }

    render ()
    {
        const {createUser} = this.props;
        const {_token: token} = this;

        return (
            <div>
                <Header/>
                <section>
                    <h2>Create New User</h2>
                    <Form
                        formId={token}
                        onSubmit={values => createUser(values, token)}>
                        <Text name="email" label="Email" />
                        <Text name="password" label="Password" type="password" />
                        <Text name="display_name" label="Display Name" />
                        <Text name="slug" label="Slug" />
                        <button>Submit</button>
                    </Form>
                </section>
                <nav>
                    <Link to="/users">user list</Link>
                </nav>
            </div>
        );
    }
};

const mapDispatchToProps = dispatch => ({
    createUser: (...args) => dispatch(createUser(...args))
});

UserCreator = connect(null, mapDispatchToProps)(UserCreator);

export default UserCreator;