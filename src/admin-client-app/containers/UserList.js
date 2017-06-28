import React, {Component} from 'react';
import queryString from 'query-string';
import {calculate} from '../helpers/paginationCalculator';
import {connect} from 'react-redux';
import Root from '../components/Root';
import Pagination from '../components/Pagination';
import {Link} from 'react-router-dom';
import actionCreators from '../action-creators'
import {formatForDisplay} from '../helpers/date-formatter';

let UserList = class extends Component
{
    componentWillMount ()
    {
        const {users, loadUsers} = this.props;

        if (Object.keys(users).length === 0)
        {
            loadUsers();
        }
    }

    render ()
    {
        const {users, location} = this.props;

        const query = queryString.parse(location.search);

        const userArray = Object.keys(users).map(id => users[id]);

        const paginationData = calculate({...query, dataArray: userArray});

        const {
            sortedAndFilteredArray,
            reverseOrder,
            firstResult
        } = paginationData;

        return (
            <Root>
                <div className="module-content">
                    <h1 className="m-ctt-title">User List</h1>
                    <section className="m-ctt-section">
                        <nav>
                            <Link to="/users/new">
                                <i className="fa fa-plus-square-o" aria-hidden="true"></i>{' '}create a new user
                            </Link>
                        </nav>
                    </section>
                    <section className="m-ctt-section">
                        {sortedAndFilteredArray.length > 0 ? (
                            <table>
                                <thead>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td><Link to={`/users/?sortedBy=display_name&order=${reverseOrder}`}>Display Name</Link></td>
                                    <td><Link to={`/users/?sortedBy=email&order=${reverseOrder}`}>Email</Link></td>
                                    <td><Link to={`/users/?sortedBy=slug&order=${reverseOrder}`}>Slug</Link></td>
                                    <td><Link to={`/users/?sortedBy=created_date&order=${reverseOrder}`}>Created</Link></td>
                                    <td><Link to={`/users/?sortedBy=updated_date&order=${reverseOrder}`}>Updated</Link></td>
                                </tr>
                                </thead>
                                <tbody>
                                {sortedAndFilteredArray.map(({_id, display_name, email, slug, created_date, updated_date},
                                    index) => (
                                    <tr key={_id}>
                                        <td>{firstResult + index + 1}</td>
                                        <td><Link to={`/users/${_id}`}>edit</Link></td>
                                        <td><a href="#"
                                               data-user-id={_id}
                                               data-user-display-name={display_name}
                                               onClick={this.onClickDelete.bind(this)}>delete</a></td>
                                        <td>{display_name}</td>
                                        <td>{email}</td>
                                        <td>{slug}</td>
                                        <td>{formatForDisplay(created_date)}</td>
                                        <td>{formatForDisplay(updated_date)}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </section>
                    {paginationData.totalPages > 1 ? (
                        <section className="m-ctt-section">
                            <Pagination linkUrlBase="/users/" {...paginationData} />
                        </section>
                    ) : null}
                </div>
            </Root>
        );
    }

    onClickDelete (event)
    {
        event.preventDefault();
        const {deleteUser} = this.props;
        const id = event.target.getAttribute('data-user-id');
        const displayName = event.target.getAttribute('data-user-display-name');

        if (window.confirm(`Do you want to delete ${displayName}?`))
        {
            deleteUser(id).catch(error => alert(error.message.reduce((i, j) => i + ', ' + j)));
        }
    }
};

UserList = connect(s => s, actionCreators)(UserList);

export default UserList;