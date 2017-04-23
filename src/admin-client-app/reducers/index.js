import { combineReducers } from 'redux';

import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    AuthorizationProcess
} from '../actions';

const authorizationProcess = (state = AuthorizationProcess.PRISTINE, action) =>
{
    switch (action.type)
    {
        case LOGIN_REQUEST:
            return AuthorizationProcess.PENDING;

        case LOGIN_FAILURE:
            return AuthorizationProcess.FAILED;

        case LOGIN_SUCCESS:
            return AuthorizationProcess.SUCCEEDED;

        default:
            return state;
    }
};

const loggedInUser = (state = null, action) =>
{
    switch (action.type)
    {
        case LOGIN_REQUEST:
            return null;

        case LOGIN_FAILURE:
            return null;

        case LOGIN_SUCCESS:
            return action.payload;

        default:
            return state;
    }
};

/*
export default (state = {}, action) =>
{
    return {
        authorizationProcess: authorizationProcess(state.authorizationProcess, action),
        loggedInUser: loggedInUser(state.loggedInUser, action)
    }
};
*/
export default combineReducers({
    authorizationProcess,
    loggedInUser
});