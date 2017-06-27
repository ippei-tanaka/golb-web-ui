import React, {Component} from 'react';
import {connect} from 'react-redux';
import Layout from '../components/Layout';
import {Text, Form} from '../components/form';
import actionCreators from '../action-creators'

let CategoryCreator = class extends Component
{
    render ()
    {
        const {createCategory, history} = this.props;

        return (
            <Layout>
                <section>
                    <h2>Create New Category</h2>
                    <Form
                        onSubmit={values => createCategory(values)}
                        onSubmissionSucceed={() => history.push('/categories')}>
                        <Text name="name" label="Name" />
                        <Text name="slug" label="Slug" />
                        <button>Submit</button>
                    </Form>
                </section>
            </Layout>
        );
    }
};

CategoryCreator = connect(null, actionCreators)(CategoryCreator);

export default CategoryCreator;