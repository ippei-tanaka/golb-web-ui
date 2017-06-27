import React, {Component} from 'react';
import {connect} from 'react-redux';
import Layout from '../components/Layout';
import {Text, Form} from '../components/form';
import actionCreators from '../action-creators'

let UserCreator = class extends Component
{
    render ()
    {
        const {createUser, history} = this.props;

        return (
            <Layout>
                <section>
                    <h2>Create New User</h2>
                    <Form
                        onSubmit={values => createUser(values)}
                        onSubmissionSucceed={() => history.push('/users')}>
                        <Text name="email" label="Email" />
                        <Text name="password" label="Password" type="password" />
                        <Text name="display_name" label="Display Name" />
                        <Text name="slug" label="Slug" />
                        <button>Submit</button>
                    </Form>
                </section>
            </Layout>
        );
    }
};

UserCreator = connect(null, actionCreators)(UserCreator);

export default UserCreator;