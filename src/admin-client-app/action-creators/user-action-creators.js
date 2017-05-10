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

const loadUsersRequest = (id = "") => fetch(
    `/users/${id}`,
    {
        method: "GET"
    })
    .then(obj => {
        if (id) return [obj];
        return obj.items;
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

export const loadUsers = (id) =>
{
    return async dispatch =>
    {
        dispatch({
            type: USER_LOAD_REQUEST,
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        try
        {
            dispatch({
                type: USER_LOAD_SUCCESS,
                payload: await loadUsersRequest(id)
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
            type: USER_CREATE_REQUEST,
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        try
        {
            const payload = await createUsersRequest(user);

            dispatch({
                type: USER_CREATE_SUCCESS,
                payload
            });

            return Promise.resolve(payload);
        }
        catch (error)
        {
            dispatch({
                type: USER_CREATE_FAILURE,
                payload: error,
            });

            return Promise.reject(error);
        }
    };
};

export const editUser = (id, user) =>
{
    return async dispatch =>
    {
        dispatch({
            type: USER_EDIT_REQUEST
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        try
        {
            const payload = await editUsersRequest(id, user);

            dispatch({
                type: USER_EDIT_SUCCESS,
                payload
            });

            return Promise.resolve(payload);
        }
        catch (error)
        {
            dispatch({
                type: USER_EDIT_FAILURE,
                payload: error
            });

            return Promise.reject(error);
        }
    };
};