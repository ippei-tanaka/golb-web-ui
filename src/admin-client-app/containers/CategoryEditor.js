import React, {Component} from 'react';
import {connect} from 'react-redux';
import Root from '../components/Root';
import {Text, Button, Form} from '../components/form';
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
            <Root>
                <div className="module-content">
                    <h1 className="m-ctt-title">Edit Category</h1>
                    <section className="m-ctt-section">
                        {category ? (
                            <Form
                                onSubmit={values => editCategory(id, values)}
                                onSubmissionSucceed={() => history.push('/categories')}>
                                <Text name="name" label="Name" initialValue={category.name} />
                                <Text name="slug" label="Slug" initialValue={category.slug} />
                                <Button>Submit</Button>
                            </Form>
                        ) : (
                            <div>loading...</div>
                        )}
                    </section>
                </div>
            </Root>
        );
    }
};

CategoryEditor = connect(s => s, actionCreators)(CategoryEditor);

export default CategoryEditor;