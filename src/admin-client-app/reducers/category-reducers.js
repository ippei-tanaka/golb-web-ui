import {
    CATEGORY_LOAD_SUCCESS,
    CATEGORY_DELETE_SUCCESS
} from '../action-creators/category-action-creators';

export const categories = (state = {}, action) =>
{
    switch (action.type)
    {
        case CATEGORY_LOAD_SUCCESS:
            const categories = {};

            for (let c of action.payload)
            {
                categories[c._id] = c;
            }

            return {...state, ...categories};

        case CATEGORY_DELETE_SUCCESS:
            const newState = {...state};
            delete newState[action.payload._id];
            return newState;

        default:
            return state;
    }
};