import React, {Component} from 'react';
import {connect} from 'react-redux';
import Root from '../components/Root';
import {Text, Date, Checkbox, TextArea, Select, Form} from '../components/form';
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
        const {createPost, users, categories, history, loggedInUser} = this.props;

        return (
            <Root>
                <div className="module-content">
                    <h1 className="m-ctt-title">Create New Post</h1>
                    <section className="m-ctt-section">
                        <Form
                            initialEntries={{
                                published_date: new window.Date(),
                                author_id: loggedInUser._id
                            }}
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
                            <TextArea name="content" label="Content" placeholder="Write your post here." />
                            <Checkbox name="is_draft" label="Draft" />
                            <Date name="published_date" label="Published Date" />
                            <button>Submit</button>
                        </Form>
                    </section>
                </div>
            </Root>
        );
    }
};

PostCreator = connect(s => s, actionCreators)(PostCreator);

export default PostCreator;