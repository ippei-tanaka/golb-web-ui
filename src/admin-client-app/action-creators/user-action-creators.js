import fetch from './fetch';

/*
 * action types
 */

export const USER_LOAD_REQUEST = Symbol("USER_LOAD_REQUEST");
export const USER_LOAD_FAILURE = Symbol('USER_LOAD_FAILURE');
export const USER_LOAD_SUCCESS = Symbol('USER_LOAD_SUCCESS');

/*
 * fetch functions
 */

const loadUsersRequest = (credentials) => fetch(
    "http://localhost:3000/admin-api/users",
    {
        method: "GET"
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
