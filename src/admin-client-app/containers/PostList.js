import React, {Component} from 'react';
import queryString from 'query-string';
import compare from '../helpers/compare';
import {build as paginatorBuild} from '../helpers/paginator';
import {connect} from 'react-redux';
import Header from './Header';
import {Link} from 'react-router-dom';
import actionCreators from '../action-creators'

let PostList = class extends Component
{
    componentWillMount ()
    {
        const {posts, users, categories, loadPosts, loadUsers, loadCategories} = this.props;

        if (Object.keys(posts).length === 0)
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
        const {posts, users, categories, location} = this.props;

        const {sort = 'created_date', order = 'asc', page = 1} = queryString.parse(location.search);

        const postArray = Object.keys(posts).map(id => posts[id]);

        const {
            first_result,
            last_result,
            pages,
            has_previous_page,
            has_next_page,
            total_pages,
            previous_page,
            next_page,
            first_page
        } = paginatorBuild(postArray.length, page);

        const processedPosts = postArray
            .sort(compare(sort, order === "asc"))
            .slice(first_result, last_result + 1);

        const reverseOrder = order === 'asc' ? 'desc' : 'asc';

        return (
            <div>
                <Header/>
                <section>
                    <h2>Post List</h2>
                    <table>
                        <thead>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><Link to={`/posts/?sort=title&order=${reverseOrder}`}>Title</Link></td>
                            <td><Link to={`/posts/?sort=author_id&order=${reverseOrder}`}>Author</Link></td>
                            <td><Link to={`/posts/?sort=category_id&order=${reverseOrder}`}>Category</Link></td>
                            <td><Link to={`/posts/?sort=slug&order=${reverseOrder}`}>Slug</Link></td>
                            <td><Link to={`/posts/?sort=is_draft&order=${reverseOrder}`}>Draft</Link></td>
                            <td><Link to={`/posts/?sort=published_date&order=${reverseOrder}`}>Published Date</Link></td>
                            <td><Link to={`/posts/?sort=created_date&order=${reverseOrder}`}>Created</Link></td>
                            <td><Link to={`/posts/?sort=updated_date&order=${reverseOrder}`}>Updated</Link></td>
                        </tr>
                        </thead>
                        <tbody>
                        {processedPosts.map(({
                            _id, title, slug, author_id, category_id,
                            is_draft, published_date, created_date, updated_date}, index) =>
                        {
                            return (
                                <tr key={_id}>
                                    <td>{first_result + index + 1}</td>
                                    <td><Link to={`/posts/${_id}`}>edit</Link></td>
                                    <td><a href="#"
                                           data-post-id={_id}
                                           data-post-title={title}
                                           onClick={this.onClickDelete.bind(this)}>delete</a></td>
                                    <td>{title}</td>
                                    <td>{this.getRelatedValue(users, author_id, 'display_name')}</td>
                                    <td>{this.getRelatedValue(categories, category_id, 'name')}</td>
                                    <td>{slug}</td>
                                    <td>{is_draft}</td>
                                    <td>{published_date}</td>
                                    <td>{created_date}</td>
                                    <td>{updated_date}</td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </table>
                </section>
                <menu>
                    {pages > 0 ? (
                        <li><Link to={`/posts/?sort=${sort}&order=${order}`}>&lt;&lt; Fist</Link></li>
                    ) : null}

                    {has_previous_page ? (
                        <li><Link to={`/posts/?sort=${sort}&order=${order}&page=${previous_page}`}>&lt; Prev</Link></li>
                        ) : null}

                    {pages > 0 ? [...(new Array(pages)).keys()].map(i =>
                        <li key={i}><Link to={`/posts/?sort=${sort}&order=${order}&page=${first_page + i}`}>{first_page + i}</Link></li>
                        ) : null}

                    {has_next_page ? (
                        <li><Link to={`/posts/?sort=${sort}&order=${order}&page=${next_page}`}>Next &gt;</Link></li>
                    ) : null}

                    {total_pages > 0 ? (
                        <li><Link to={`/posts/?sort=${sort}&order=${order}&page=${total_pages}`}>Last &gt;&gt;</Link></li>
                    ) : null}
                </menu>
                <nav>
                    <Link to="/posts/new">create a new post</Link>
                </nav>
            </div>
        );
    }

    getRelatedValue (resource, id, fieldName)
    {
        if (!id) {
            return '(none)'
        }

        const item = resource[id];

        if (!item) {
            return '(deleted)'
        }

        return item[fieldName];
    }

    onClickDelete (event)
    {
        event.preventDefault();
        const {deletePost} = this.props;
        const id = event.target.getAttribute('data-post-id');
        const displayName = event.target.getAttribute('data-post-title');

        if (window.confirm(`Do you want to delete ${displayName}?`))
        {
            deletePost(id).catch(error => alert(error.message.reduce((i, j) => i + ', ' + j)));
        }
    }
};

PostList = connect(s => s, actionCreators)(PostList);

export default PostList;