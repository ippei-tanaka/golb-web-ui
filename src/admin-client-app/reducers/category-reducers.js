import {
    CATEGORY_LOAD_SUCCESS,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_EDIT_SUCCESS,
    CATEGORY_DELETE_SUCCESS
} from '../action-creators/category-action-creators';

export const categories = (state = {}, action) =>
{
    switch (action.type)
    {
        case CATEGORY_LOAD_SUCCESS:
            const categories = {};

            for (let u of action.payload)
            {
                categories[u._id] = u;
            }

            return {...state, ...categories};

        case CATEGORY_CREATE_SUCCESS:
            const newCategory = action.payload;
            return {...state, [newCategory._id]: newCategory};

        case CATEGORY_EDIT_SUCCESS:
            const editedCategory = action.payload;
            return {...state, [editedCategory._id]: editedCategory};

        case CATEGORY_DELETE_SUCCESS:
            const newState = {...state};
            delete newState[action.payload._id];
            return newState;

        default:
            return state;
    }
};