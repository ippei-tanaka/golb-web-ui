import React, {Component} from 'react';
import {connect} from 'react-redux';
import Header from './Header';
import UserForm from '../components/UserForm';
import {createUser} from '../action-creators/user-action-creators';

let UserCreator = class extends Component
{
    constructor (props)
    {
        super(props);

        this.state =
        {
            email: "",
            password: "",
            display_name: "",
            slug: ""
        }
    }

    render ()
    {
        const {createUser, userCreateError} = this.props;

        return (
            <div>
                <Header/>

                <h2>Create New User</h2>

                <UserForm
                    onSubmit={e => {
                        e.preventDefault();
                        createUser(this.state);
                    }}

                    onChange={e => {
                        this.setState({[e.target.name]: e.target.value});
                    }}

                    error={userCreateError}

                    {...this.state}
                />
            </div>
        );
    }
};

const mapStateToProps = (state) =>
{
    return {
        userCreateError: state.userCreateError
    };
};

const mapDispatchToProps = dispatch => ({
    createUser: (user) => dispatch(createUser(user)),
});

UserCreator = connect(mapStateToProps, mapDispatchToProps)(UserCreator);

export default UserCreator;