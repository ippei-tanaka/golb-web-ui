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
    "http://localhost:3000/admin-api/users",
    {
        method: "GET"
    });

const createUsersRequest = (user) => fetch(
    "http://localhost:3000/admin-api/users",
    {
        method: "POST",
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

export const createUser = (user) =>
{
    return async dispatch =>
    {
        dispatch({
            type: USER_CREATE_REQUEST
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        try
        {
            dispatch({
                type: USER_CREATE_SUCCESS,
                payload: await createUsersRequest(user)
            });
        }
        catch (error)
        {
            dispatch({
                type: USER_CREATE_FAILURE,
                payload: error
            });
        }
    };
};

export const editUser = () =>
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
                type: USER_LOAD_FAILURE,
                payload: error
            });
        }
    };
};
