import React, {PropTypes} from 'react';
import Header from './Header';

const List = ({model}) =>
{
    return (
        <div>
            <Header/>

            <h2>{model} List</h2>

            <table>
                <thead>
                <tr>
                    <td>#</td>
                    <td>Display Name</td>
                    <td>Email</td>
                    <td>Slug</td>
                    <td>Created</td>
                    <td>Updated</td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>dd</td>
                    <td>dd</td>
                    <td>dd</td>
                    <td>dd</td>
                    <td>dd</td>
                    <td>dd</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
};

export default List;