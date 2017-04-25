import React from 'react';
import { connect } from 'react-redux';
import {Route} from 'react-router-dom';

let ProtectedRoute = ({
    component: Component,
    alternativeComponent: AlternativeComponent,
    isAuthenticated,
    ...rest}) =>
{
    return (
        <Route {...rest} render={props => (
            isAuthenticated ? (
                <Component {...props} />
            ) : (
                <AlternativeComponent {...props} />
            )
        )}/>
    );
};

const mapStateToProps = (state) =>
{
    return {
        isAuthenticated: state.loggedInUser
    };
};

ProtectedRoute = connect(mapStateToProps)(ProtectedRoute);

export default ProtectedRoute;