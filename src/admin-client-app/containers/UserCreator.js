import React, {Component} from 'react';
import {connect} from 'react-redux';
import Root from '../components/Root';
import {Text, Form} from '../components/form';
import actionCreators from '../action-creators'

let UserCreator = class extends Component
{
    render ()
    {
        const {createUser, history} = this.props;

        return (
            <Root>
                <div className="module-content">
                    <h1 className="m-ctt-title">Create New User</h1>
                    <Form
                        onSubmit={values => createUser(values)}
                        onSubmissionSucceed={() => history.push('/users')}>
                        <Text name="email" label="Email"/>
                        <Text name="password" label="Password" type="password"/>
                        <Text name="display_name" label="Display Name"/>
                        <Text name="slug" label="Slug"/>
                        <button>Submit</button>
                    </Form>
                </div>
            </Root>
        );
    }
};

UserCreator = connect(null, actionCreators)(UserCreator);

export default UserCreator;