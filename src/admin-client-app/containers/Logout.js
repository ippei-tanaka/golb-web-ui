import React, {Component} from 'react';
import {connect} from 'react-redux';
import {logout} from '../actions';

let Logout = class extends Component
{
    componentDidMount ()
    {
        this.props.logout();
    }

    render ()
    {
        return <div>Logout</div>
    };
};

const mapStateToProps = (state) =>
{
    return {
        authenticationStatus: state.authenticationStatus
    };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout())
});

Logout = connect(mapStateToProps, mapDispatchToProps)(Logout);

export default Logout;