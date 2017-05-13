import React, {Component} from 'react';
import queryString from 'query-string';
import compare from '../helpers/compare';
import {build as paginatorBuild} from '../helpers/paginator';
import {connect} from 'react-redux';
import Header from './Header';
import {Link} from 'react-router-dom';
import actionCreators from '../action-creators'

let CategoryList = class extends Component
{
    componentWillMount ()
    {
        const {categories, loadCategories} = this.props;

        if (Object.keys(categories).length === 0)
        {
            loadCategories();
        }
    }

    render ()
    {
        const {categories, location} = this.props;

        const {sort = 'created_date', order = 'asc', page = 1} = queryString.parse(location.search);

        const categoryArray = Object.keys(categories).map(id => categories[id]);

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
        } = paginatorBuild(categoryArray.length, page);

        const processedCategories = categoryArray
            .sort(compare(sort, order === "asc"))
            .slice(first_result, last_result + 1);

        const reverseOrder = order === 'asc' ? 'desc' : 'asc';

        return (
            <div>
                <Header/>
                <section>
                    <h2>Category List</h2>
                    <table>
                        <thead>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><Link to={`/categories/?sort=name&order=${reverseOrder}`}>Name</Link></td>
                            <td><Link to={`/categories/?sort=slug&order=${reverseOrder}`}>Slug</Link></td>
                            <td><Link to={`/categories/?sort=created_date&order=${reverseOrder}`}>Created</Link></td>
                            <td><Link to={`/categories/?sort=updated_date&order=${reverseOrder}`}>Updated</Link></td>
                        </tr>
                        </thead>
                        <tbody>
                        {processedCategories.map(({_id, name, slug, created_date, updated_date}, index) => (
                            <tr key={_id}>
                                <td>{first_result + index + 1}</td>
                                <td><Link to={`/categories/${_id}`}>edit</Link></td>
                                <td><a href="#"
                                       data-category-id={_id}
                                       data-category-name={name}
                                       onClick={this.onClickDelete.bind(this)}>delete</a></td>
                                <td>{name}</td>
                                <td>{slug}</td>
                                <td>{created_date}</td>
                                <td>{updated_date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
                <menu>
                    {pages > 0 ? (
                        <li><Link to={`/categories/?sort=${sort}&order=${order}`}>&lt;&lt; Fist</Link></li>
                    ) : null}

                    {has_previous_page ? (
                        <li><Link to={`/categories/?sort=${sort}&order=${order}&page=${previous_page}`}>&lt; Prev</Link></li>
                        ) : null}

                    {pages > 0 ? [...(new Array(pages)).keys()].map(i =>
                        <li key={i}><Link to={`/categories/?sort=${sort}&order=${order}&page=${first_page + i}`}>{first_page + i}</Link></li>
                        ) : null}

                    {has_next_page ? (
                        <li><Link to={`/categories/?sort=${sort}&order=${order}&page=${next_page}`}>Next &gt;</Link></li>
                    ) : null}

                    {total_pages > 0 ? (
                        <li><Link to={`/categories/?sort=${sort}&order=${order}&page=${total_pages}`}>Last &gt;&gt;</Link></li>
                    ) : null}
                </menu>
                <nav>
                    <Link to="/categories/new">create a new category</Link>
                </nav>
            </div>
        );
    }

    onClickDelete (event)
    {
        event.preventDefault();
        const {deleteCategory} = this.props;
        const id = event.target.getAttribute('data-category-id');
        const name = event.target.getAttribute('data-category-name');

        if (window.confirm(`Do you want to delete ${name}?`))
        {
            deleteCategory(id).catch(error => alert(error.message.reduce((i, j) => i + ', ' + j)));
        }
    }
};

CategoryList = connect(s => s, actionCreators)(CategoryList);

export default CategoryList;