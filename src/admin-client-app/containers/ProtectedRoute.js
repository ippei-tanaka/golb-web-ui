import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router-dom';
import Pending from '../components/Pending';
import LoginForm from '../components/LoginForm';
import {AuthenticationStatus} from '../actions';
import {authenticate, login} from '../actions';

let ProtectedRoute = class extends Component {
    constructor (props)
    {
        super(props);

        this.state =
        {
            email: "",
            password: ""
        }
    }

    componentDidMount ()
    {
        this.props.authenticate();
    }

    render ()
    {
        const {
            component: Component,
            authenticationStatus,
            loginProcess,
            loginProcessError,
            login,
            ...rest
        } = this.props;

        const {email, password} = this.state;

        switch (authenticationStatus)
        {
            case AuthenticationStatus.AUTHENTICATED:
                return (
                    <Route {...rest} component={Component}/>
                );

            case AuthenticationStatus.UNAUTHENTICATED:
                return (
                    <Route {...rest} render={props => (
                        <LoginForm
                            email={email}
                            password={password}
                            onSubmit={e =>
                            {
                                e.preventDefault();
                                login({email, password});
                            }}
                            onChange={e => this.setState({[e.target.name]: e.target.value})}
                            error={loginProcessError}
                        />
                    )}/>
                );

            case AuthenticationStatus.PRISTINE:
            case AuthenticationStatus.PENDING:
            default:
                return (
                    <Route {...rest} component={Pending}/>
                );
        }
    }

};

const mapStateToProps = (state) =>
{
    return {
        authenticationStatus: state.authenticationStatus,
        loginProcess: state.loginProcess,
        loginProcessError: state.loginProcessError
    };
};

const mapDispatchToProps = dispatch => ({
    authenticate: () => dispatch(authenticate()),
    login: (arg) => dispatch(login(arg))
});

ProtectedRoute = connect(mapStateToProps, mapDispatchToProps)(ProtectedRoute);

export default ProtectedRoute;