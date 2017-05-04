import {
    USER_LOAD_REQUEST,
    USER_LOAD_FAILURE,
    USER_LOAD_SUCCESS,

    USER_CREATE_REQUEST,
    USER_CREATE_FAILURE,
    USER_CREATE_SUCCESS,

    USER_EDIT_REQUEST,
    USER_EDIT_FAILURE,
    USER_EDIT_SUCCESS
} from '../action-creators/user-action-creators';

export const users = (state = [], action) =>
{
    switch (action.type)
    {
        case USER_LOAD_SUCCESS:
            return action.payload;

        default:
            return state;
    }
};