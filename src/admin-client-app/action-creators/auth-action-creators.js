import fetch from './fetch';

/*
 * action types
 */

export const LOGIN_REQUEST = Symbol('LOGIN_REQUEST');
export const LOGIN_FAILURE = Symbol('LOGIN_FAILURE');
export const LOGIN_SUCCESS = Symbol('LOGIN_SUCCESS');
export const LOGOUT_REQUEST = Symbol('LOGOUT_REQUEST');
export const LOGOUT_FAILURE = Symbol('LOGOUT_FAILURE');
export const LOGOUT_SUCCESS = Symbol('LOGOUT_SUCCESS');
export const AUTHENTICATION_REQUEST = Symbol('AUTHENTICATION_REQUEST');
export const FOUND_UNAUTHENTICATED = Symbol('FOUND_UNAUTHENTICATED');
export const FOUND_AUTHENTICATED = Symbol('FOUND_AUTHENTICATED');


/*
 * other constants
 */

export const AuthenticationStatus = {
    PRISTINE: "PRISTINE",
    PENDING: "PENDING",
    UNAUTHENTICATED: "UNAUTHENTICATED",
    AUTHENTICATED: "AUTHENTICATED"
};

export const LoginProcess = {
    PRISTINE: "PRISTINE",
    PENDING: "PENDING",
    FAILED: "FAILED",
    SUCCEEDED: "SUCCEEDED"
};

export const LogoutProcess = {
    PRISTINE: "PRISTINE",
    PENDING: "PENDING",
    FAILED: "FAILED",
    SUCCEEDED: "SUCCEEDED"
};


/*
 * fetch functions
 */

const loginRequest = (credentials) => fetch(
    "/login",
    {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json"
        }
    });

const logoutRequest = () => fetch(
    "/logout",
    {
        method: "GET"
    });

const getMe = () => fetch(
    "/users/me",
    {
        method: "GET"
    });


/*
 * action creators
 */

export const authenticate = () =>
{
    return async dispatch =>
    {
        dispatch({
            type: AUTHENTICATION_REQUEST
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        try
        {
            dispatch({
                type: FOUND_AUTHENTICATED,
                payload: await getMe()
            });
        }
        catch (error)
        {
            dispatch({
                type: FOUND_UNAUTHENTICATED
            });
        }
    };
};

export const login = ({email, password}) =>
{
    return async dispatch =>
    {
        dispatch({type: LOGIN_REQUEST});

        try
        {
            await loginRequest({email, password});

            dispatch({
                type: LOGIN_SUCCESS
            });
        }
        catch (error)
        {
            dispatch({
                type: LOGIN_FAILURE,
                payload: error
            });
        }

        dispatch(authenticate());
    }
};

export const logout = () =>
{
    return async dispatch =>
    {
        dispatch({type: LOGOUT_REQUEST});

        try
        {
            await logoutRequest();

            dispatch({
                type: LOGOUT_SUCCESS
            });
        }
        catch (error)
        {
            dispatch({
                type: LOGOUT_FAILURE,
                payload: error
            });
        }

        dispatch(authenticate());
    }
};
