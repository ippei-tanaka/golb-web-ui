import {
    USER_LOAD_REQUEST,
    USER_LOAD_FAILURE,
    USER_LOAD_SUCCESS
} from '../actions/user-actions';

export const users = (state = [], action) =>
{
    switch (action.type)
    {
        case USER_LOAD_SUCCESS:
            return action.payload.items;

        default:
            return state;
    }
};