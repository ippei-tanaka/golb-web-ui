import React, {Component} from 'react';
import queryString from 'query-string';
import {calculate} from '../helpers/paginationCalculator';
import {connect} from 'react-redux';
import Root from '../components/Root';
import Pagination from '../components/Pagination';
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

        const query = queryString.parse(location.search);

        const categoryArray = Object.keys(categories).map(id => categories[id]);

        const paginationData = calculate({...query, dataArray: categoryArray});

        const {
            sortedAndFilteredArray,
            reverseOrder,
            firstResult
        } = paginationData;

        return (
            <Root>
                <div className="module-content">
                    <h1 className="m-ctt-title">Category List</h1>
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
                        {sortedAndFilteredArray.map(({_id, name, slug, created_date, updated_date}, index) => (
                            <tr key={_id}>
                                <td>{firstResult + index + 1}</td>
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
                    <Pagination linkUrlBase="/categories/" {...paginationData} />
                    <nav>
                        <Link to="/categories/new">create a new category</Link>
                    </nav>
                </div>
            </Root>
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