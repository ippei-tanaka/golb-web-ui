import fetch from './fetch';

/*
 * action types
 */

export const USER_LOAD_REQUEST = Symbol("USER_LOAD_REQUEST");
export const USER_LOAD_FAILURE = Symbol('USER_LOAD_FAILURE');
export const USER_LOAD_SUCCESS = Symbol('USER_LOAD_SUCCESS');

export const USER_CREATE_REQUEST = Symbol('USER_CREATE_REQUEST');
export const USER_CREATE_FAILURE = Symbol('USER_CREATE_FAILURE');
export const USER_CREATE_SUCCESS = Symbol('USER_CREATE_SUCCESS');

export const USER_EDIT_REQUEST = Symbol('USER_EDIT_REQUEST');
export const USER_EDIT_FAILURE = Symbol('USER_EDIT_FAILURE');
export const USER_EDIT_SUCCESS = Symbol('USER_EDIT_SUCCESS');

/*
 * fetch functions
 */

const loadUsersRequest = (credentials) => fetch(
    "/users",
    {
        method: "GET"
    });

const createUsersRequest = (user) => fetch(
    "/users",
    {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    });

const editUsersRequest = (id, user) => fetch(
    `/users/${id}`,
    {
        method: "PUT",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    });

/*
 * action creators
 */

export const loadUsers = () =>
{
    return async dispatch =>
    {
        dispatch({
            type: USER_LOAD_REQUEST
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        try
        {
            dispatch({
                type: USER_LOAD_SUCCESS,
                payload: await loadUsersRequest()
            });
        }
        catch (error)
        {
            dispatch({
                type: USER_LOAD_FAILURE
            });
        }
    };
};

export const createUser = (user, token) =>
{
    return async dispatch =>
    {
        dispatch({
            type: USER_CREATE_REQUEST,
            token
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        try
        {
            dispatch({
                type: USER_CREATE_SUCCESS,
                payload: await createUsersRequest(user),
                token
            });
        }
        catch (error)
        {
            dispatch({
                type: USER_CREATE_FAILURE,
                payload: error,
                token
            });
        }
    };
};

export const editUser = (id, user, token) =>
{
    return async dispatch =>
    {
        dispatch({
            type: USER_EDIT_REQUEST,
            token
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        try
        {
            dispatch({
                type: USER_EDIT_SUCCESS,
                payload: await editUsersRequest(id, user),
                token
            });
        }
        catch (error)
        {
            dispatch({
                type: USER_EDIT_FAILURE,
                payload: error,
                token
            });
        }
    };
};
