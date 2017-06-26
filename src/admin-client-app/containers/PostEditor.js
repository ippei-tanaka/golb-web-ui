import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import {Text, Checkbox, Date, TextArea, Select, Form} from '../components/form';
import actionCreators from '../action-creators'

let PostEditor = class extends Component
{
    componentWillMount ()
    {
        const {posts, users, categories, loadPosts, loadUsers, loadCategories, match} = this.props;
        const id = match.params.id;

        if (!posts[id])
        {
            loadPosts();
        }

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
        const {editPost, categories, users, posts, match, history} = this.props;
        const id = match.params.id;
        const post = posts[id];

        return (
            <div>
                <Header/>
                <section>
                    <h2>Edit Post</h2>
                    {post ? (
                        <Form
                            initialEntries={post}
                            onSubmit={values => editPost(id, values)}
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
                    ) : (
                        <div>loading...</div>
                    )}
                </section>
            </div>
        );
    }
};

PostEditor = connect(s => s, actionCreators)(PostEditor);

export default PostEditor;