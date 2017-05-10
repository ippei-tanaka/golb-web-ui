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

export const USER_DELETE_REQUEST = Symbol('USER_DELETE_REQUEST');
export const USER_DELETE_FAILURE = Symbol('USER_DELETE_FAILURE');
export const USER_DELETE_SUCCESS = Symbol('USER_DELETE_SUCCESS');

/*
 * fetch functions
 */

const loadUsersRequest = () => fetch(
    `/users`,
    {
        method: "GET"
    })
    .then(obj => obj.items);

const loadUserRequest = (id) => fetch(
    `/users/${id}`,
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

const deleteUserRequest = (id) => fetch(
    `/users/${id}`,
    {
        method: "DELETE"
    });

/*
 * action creators
 */

export const loadUsers = () =>
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
            type: USER_CREATE_REQUEST,
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        try
        {
            const {_id} = await createUsersRequest(user);
            const payload = await loadUserRequest(_id);

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

export const deleteUser = (id) =>
{
    return async dispatch =>
    {
        dispatch({
            type: USER_DELETE_REQUEST
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        try
        {
            await deleteUserRequest(id);

            dispatch({
                type: USER_DELETE_SUCCESS,
                payload: {_id: id}
            });

            return Promise.resolve();
        }
        catch (error)
        {
            dispatch({
                type: USER_DELETE_FAILURE,
                payload: error
            });

            return Promise.reject(error);
        }
    };
};