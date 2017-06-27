import React, {Component} from 'react';
import {connect} from 'react-redux';
import Root from '../components/Root';
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
            <Root>
                <div className="module-content">
                    <h1 className="m-ctt-title">Edit Category</h1>
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
                </div>
            </Root>
        );
    }
};

CategoryEditor = connect(s => s, actionCreators)(CategoryEditor);

export default CategoryEditor;