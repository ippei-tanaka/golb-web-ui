import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {Text, TextArea, Select, Form} from '../components/form';
import actionCreators from '../action-creators'

let PostCreator = class extends Component
{
    componentWillMount ()
    {
        const {users, categories, loadUsers, loadCategories} = this.props;

        if (Object.keys(users).length === 0)
        {
            loadUsers();
        }

        if (Object.keys(categories).length === 0)
        {
            loadCategories();
        }
    }

    render ()
    {
        const {createPost, users, categories, history} = this.props;

        return (
            <div>
                <Header/>
                <section>
                    <h2>Create New Post</h2>
                    <Form
                        onSubmit={values => createPost(values)}
                        onSubmissionSucceed={() => history.push('/posts')}>
                        <Text name="title" label="Title" />
                        <Text name="slug" label="Slug" />
                        <Select name="author_id" label="Author">
                            <option key="0" value="">(None)</option>
                            {Object.keys(users).map(userId => (
                                <option key={userId} value={userId}>{users[userId].display_name}</option>
                            ))}
                        </Select>
                        <Select name="category_id" label="Category">
                            <option key="0" value="">(None)</option>
                            {Object.keys(categories).map(categoryId => (
                                <option key={categoryId} value={categoryId}>{categories[categoryId].name}</option>
                            ))}
                        </Select>
                        <TextArea name="content" label="Content" placeholder="Love" />
                        <button>Submit</button>
                    </Form>
                </section>
            </div>
        );
    }
};

PostCreator = connect(s => s, actionCreators)(PostCreator);

export default PostCreator;