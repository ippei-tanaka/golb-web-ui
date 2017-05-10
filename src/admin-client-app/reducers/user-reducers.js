import {
    USER_LOAD_SUCCESS,
    USER_DELETE_SUCCESS
} from '../action-creators/user-action-creators';

export const users = (state = {}, action) =>
{
    switch (action.type)
    {
        case USER_LOAD_SUCCESS:
            const users = {};

            for (let u of action.payload)
            {
                users[u._id] = u;
            }

            return {...state, ...users};

        case USER_DELETE_SUCCESS:
            const newState = {...state};
            delete newState[action.payload._id];
            return newState;

        default:
            return state;
    }
};