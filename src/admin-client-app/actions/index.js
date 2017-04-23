/*
 * action types
 */

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';


/*
 * other constants
 */

export const AuthorizationProcess = {
    PRISTINE: "PRISTINE",
    PENDING: "PENDING",
    FAILED: "FAILED",
    SUCCEEDED: "SUCCEEDED"
};


/*
 * action creators
 */

const login = () => Promise.resolve(JSON.stringify({"test": true}));

export const requestLogin = () =>
{
    return {type: LOGIN_REQUEST}
};

export const postLoginCredentials = ({email, password}) =>
{
    return dispatch =>
    {
        dispatch(requestLogin());

        return login({email, password})
            .then(response => JSON.parse(response))
            .then(user => dispatch(receiveAuthResult({user})))
            .catch(error => dispatch(receiveAuthResult({error})))
    }
};

export const receiveAuthResult = ({user, error}) =>
{
    return user ? {
        type: LOGIN_SUCCESS,
        payload: user
    } : {
        type: LOGIN_FAILURE,
        payload: error
    }
};