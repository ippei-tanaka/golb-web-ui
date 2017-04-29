import 'whatwg-fetch';

/*
 * action types
 */

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const AUTHENTICATION_REQUEST = 'AUTHENTICATION_REQUEST';
export const FOUND_UNAUTHENTICATED = 'FOUND_UNAUTHENTICATED';
export const FOUND_AUTHENTICATED = 'FOUND_AUTHENTICATED';


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

const wrappedFetch = (url, options) =>
{
    return fetch(url, {
        credentials: 'include',
        ...options
    }).then(async response =>
    {
        if (response.status >= 400)
        {
            throw await response.json();
        }

        return await response.json();
    });
};

const loginRequest = (credentials) => wrappedFetch(
    "http://localhost:3000/admin-api/login",
    {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json"
        }
    });

const logoutRequest = () => wrappedFetch(
    "http://localhost:3000/admin-api/logout",
    {
        method: "GET"
    });

const getMe = () => wrappedFetch(
    "http://localhost:3000/admin-api/users/me",
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

        try
        {
            const me = await getMe();

            dispatch({
                type: FOUND_AUTHENTICATED,
                payload: me
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
