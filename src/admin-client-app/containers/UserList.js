import React, {Component} from 'react';
import queryString from 'query-string';
import compare from '../helpers/compare';
import {build as paginatorBuild} from '../helpers/paginator';
import {connect} from 'react-redux';
import Root from '../components/Root';
import {Link} from 'react-router-dom';
import actionCreators from '../action-creators'

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

        const {sort = 'created_date', order = 'asc', page = 1} = queryString.parse(location.search);

        const userArray = Object.keys(users).map(id => users[id]);

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
        } = paginatorBuild(userArray.length, page);

        const processedUsers = userArray
            .sort(compare(sort, order === "asc"))
            .slice(first_result, last_result + 1);

        const reverseOrder = order === 'asc' ? 'desc' : 'asc';

        return (
            <Root>
                <div className="module-content">
                    <h1 className="m-ctt-title">User List</h1>
                    <table>
                        <thead>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td><Link to={`/users/?sort=display_name&order=${reverseOrder}`}>Display Name</Link></td>
                            <td><Link to={`/users/?sort=email&order=${reverseOrder}`}>Email</Link></td>
                            <td><Link to={`/users/?sort=slug&order=${reverseOrder}`}>Slug</Link></td>
                            <td><Link to={`/users/?sort=created_date&order=${reverseOrder}`}>Created</Link></td>
                            <td><Link to={`/users/?sort=updated_date&order=${reverseOrder}`}>Updated</Link></td>
                        </tr>
                        </thead>
                        <tbody>
                        {processedUsers.map(({_id, display_name, email, slug, created_date, updated_date}, index) => (
                            <tr key={_id}>
                                <td>{first_result + index + 1}</td>
                                <td><Link to={`/users/${_id}`}>edit</Link></td>
                                <td><a href="#"
                                       data-user-id={_id}
                                       data-user-display-name={display_name}
                                       onClick={this.onClickDelete.bind(this)}>delete</a></td>
                                <td>{display_name}</td>
                                <td>{email}</td>
                                <td>{slug}</td>
                                <td>{created_date}</td>
                                <td>{updated_date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <menu className="module-pagination">
                        {pages > 0 ? (
                            <li className="m-pgn-list-item"><Link to={`/users/?sort=${sort}&order=${order}`}>&lt;&lt; Fist</Link></li>
                        ) : null}

                        {has_previous_page ? (
                            <li className="m-pgn-list-item"><Link to={`/users/?sort=${sort}&order=${order}&page=${previous_page}`}>&lt; Prev</Link></li>
                        ) : null}

                        {pages > 0 ? [...(new Array(pages)).keys()].map(i =>
                            <li className="m-pgn-list-item" key={i}><Link to={`/users/?sort=${sort}&order=${order}&page=${first_page + i}`}>{first_page + i}</Link></li>
                        ) : null}

                        {has_next_page ? (
                            <li className="m-pgn-list-item"><Link to={`/users/?sort=${sort}&order=${order}&page=${next_page}`}>Next &gt;</Link></li>
                        ) : null}

                        {total_pages > 0 ? (
                            <li className="m-pgn-list-item"><Link to={`/users/?sort=${sort}&order=${order}&page=${total_pages}`}>Last &gt;&gt;</Link></li>
                        ) : null}
                    </menu>
                    <nav>
                        <Link to="/users/new">create a new user</Link>
                    </nav>
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