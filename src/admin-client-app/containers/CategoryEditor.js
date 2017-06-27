import React, {Component} from 'react';
import {connect} from 'react-redux';
import Layout from '../components/Layout';
import {Text, Form} from '../components/form';
import actionCreators from '../action-creators'

let CategoryEditor = class extends Component
{
    componentWillMount ()
    {
        const {loadCategories, categories, match} = this.props;
        const id = match.params.id;

        if (!categories[id])
        {
            loadCategories();
        }
    }

    render ()
    {
        const {editCategory, categories, match, history} = this.props;
        const id = match.params.id;
        const category = categories[id];

        return (
            <Layout>
                <section>
                    <h2>Edit Category</h2>
                    {category ? (
                        <Form
                            initialEntries={category}
                            onSubmit={values => editCategory(id, values)}
                            onSubmissionSucceed={() => history.push('/categories')}>
                            <Text name="name" label="Name" />
                            <Text name="slug" label="Slug" />
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

CategoryEditor = connect(s => s, actionCreators)(CategoryEditor);

export default CategoryEditor;