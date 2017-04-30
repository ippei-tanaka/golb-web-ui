import {
    LOGIN_REQUEST,
    LOGIN_FAILURE,
    LOGIN_SUCCESS,
    LOGOUT_REQUEST,
    LOGOUT_FAILURE,
    LOGOUT_SUCCESS,
    AUTHENTICATION_REQUEST,
    FOUND_AUTHENTICATED,
    FOUND_UNAUTHENTICATED,
    AuthenticationStatus,
    LoginProcess,
    LogoutProcess
} from '../action-creators/auth-action-creators';

export const authenticationStatus = (state = AuthenticationStatus.PRISTINE, action) =>
{
    switch (action.type)
    {
        case AUTHENTICATION_REQUEST:
            return AuthenticationStatus.PENDING;

        case FOUND_UNAUTHENTICATED:
            return AuthenticationStatus.UNAUTHENTICATED;

        case FOUND_AUTHENTICATED:
            return AuthenticationStatus.AUTHENTICATED;

        default:
            return state;
    }
};

export const loggedInUser = (state = null, action) =>
{
    switch (action.type)
    {
        case FOUND_UNAUTHENTICATED:
            return null;

        case FOUND_AUTHENTICATED:
            return action.payload;

        default:
            return state;
    }
};

export const loginProcess = (state = LoginProcess.PRISTINE, action) =>
{
    switch (action.type)
    {
        case LOGIN_REQUEST:
            return LoginProcess.PENDING;

        case LOGIN_FAILURE:
            return LoginProcess.FAILED;

        case LOGIN_SUCCESS:
            return LoginProcess.SUCCEEDED;

        default:
            return state;
    }
};

export const loginProcessError = (state = null, action) =>
{
    switch (action.type)
    {
        case LOGIN_REQUEST:
            return null;

        case LOGIN_FAILURE:
            return action.payload;

        case LOGIN_SUCCESS:
            return null;

        default:
            return state;
    }
};

export const logoutProcess = (state = LogoutProcess.PRISTINE, action) =>
{
    switch (action.type)
    {
        case LOGOUT_REQUEST:
            return LogoutProcess.PENDING;

        case LOGOUT_FAILURE:
            return LogoutProcess.FAILED;

        case LOGOUT_SUCCESS:
            return LogoutProcess.SUCCEEDED;

        default:
            return state;
    }
};

export const logoutProcessError = (state = null, action) =>
{
    switch (action.type)
    {
        case LOGOUT_REQUEST:
            return null;

        case LOGOUT_FAILURE:
            return action.payload;

        case LOGOUT_SUCCESS:
            return null;

        default:
            return state;
    }
};