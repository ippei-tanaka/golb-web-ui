import React, {Component} from 'react';
import {connect} from 'react-redux';
import Root from '../components/Root';
import {Text, Button, Form} from '../components/form';
import actionCreators from '../action-creators'

let CategoryCreator = class extends Component
{
    render ()
    {
        const {createCategory, history} = this.props;

        return (
            <Root>
                <div className="module-content">
                    <h1 className="m-ctt-title">Create New Category</h1>
                    <section className="m-ctt-section">
                        <Form
                            onSubmit={values => createCategory(values)}
                            onSubmissionSucceed={() => history.push('/categories')}>
                            <Text name="name" label="Name" />
                            <Text name="slug" label="Slug" />
                            <Button>Submit</Button>
                        </Form>
                    </section>
                </div>
            </Root>
        );
    }
};

CategoryCreator = connect(null, actionCreators)(CategoryCreator);

export default CategoryCreator;