import {
    USER_LOAD_SUCCESS
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

        default:
            return state;
    }
};