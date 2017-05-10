import React, {Component} from 'react';
import queryString from 'query-string';
import Paginator from "paginator";
import {connect} from 'react-redux';
import Header from './Header';
import {Link} from 'react-router-dom';
import actionCreators from '../action-creators'

const compare = (field, asc) =>
{
    const order = asc ? 1 : -1;

    switch (field)
    {
        case "_id":
            return (a, b) => {
                const A = a[field] || -Number.MAX_VALUE;
                const B = b[field] || -Number.MAX_VALUE;
                return (Number.parseInt(A) - Number.parseInt(B)) * order;
            };
        case "created_date":
        case "updated_date":
            return (a, b) => {
                const A = a[field] || 0;
                const B = b[field] || 0;
                return (Date.parse(A) - Date.parse(B)) * order;
            };
        default:
            return (a, b) => {
                const A = a[field] || "";
                const B = b[field] || "";
                return A.localeCompare(B) * order;
            }
    }
};

const ITEM_PER_PAGE = 15;
const NUMBER_OF_PAGINATION_LINK = 3;
const paginator = new Paginator(ITEM_PER_PAGE, NUMBER_OF_PAGINATION_LINK);

let UserList = class extends Component
{
    componentWillMount ()
    {
        this.props.loadUsers();
    }

    render ()
    {
        const {users, location} = this.props;

        const {sort = 'created_date', order = 'asc', page = 1} = queryString.parse(location.search);

        const userArray = Object.keys(users).map(id => users[id]);

        const paginatorObj = paginator.build(userArray.length, page);

        const processedUsers = userArray
            .sort(compare(sort, order === "asc"))
            .slice(paginatorObj.first_result, paginatorObj.last_result + 1);

        const reverseOrder = order === 'asc' ? 'desc' : 'asc';

        return (
            <div>
                <Header/>
                <section>
                    <h2>User List</h2>
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
                        {processedUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td><Link to={`/users/${user._id}`}>edit</Link></td>
                                <td><a href="#"
                                       data-user-id={user._id}
                                       data-user-display-name={user.display_name}
                                       onClick={this.onClickDelete.bind(this)}>delete</a></td>
                                <td>{user.display_name}</td>
                                <td>{user.email}</td>
                                <td>{user.slug}</td>
                                <td>{user.created_date}</td>
                                <td>{user.updated_date}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </section>
                <menu>
                    {paginatorObj.pages > 0 ? (
                        <li><Link to={`/users/?sort=${sort}&order=${order}`}>&lt;&lt; Fist</Link></li>
                    ) : null}

                    {paginatorObj.has_previous_page ? (
                        <li><Link to={`/users/?sort=${sort}&order=${order}&page=${paginatorObj.previous_page}`}>&lt; Prev</Link></li>
                        ) : null}

                    {paginatorObj.pages > 0 ? [...(new Array(paginatorObj.pages)).keys()].map(i =>
                        <li key={i}><Link to={`/users/?sort=${sort}&order=${order}&page=${paginatorObj.first_page + i}`}>{paginatorObj.first_page + i}</Link></li>
                        ) : null}

                    {paginatorObj.has_next_page ? (
                        <li><Link to={`/users/?sort=${sort}&order=${order}&page=${paginatorObj.next_page}`}>Next &gt;</Link></li>
                    ) : null}

                    {paginatorObj.total_pages > 0 ? (
                        <li><Link to={`/users/?sort=${sort}&order=${order}&page=${paginatorObj.total_pages}`}>Last &gt;&gt;</Link></li>
                    ) : null}
                </menu>
                <aside>
                    <Link to="/users/new">create a new user</Link>
                </aside>
            </div>
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