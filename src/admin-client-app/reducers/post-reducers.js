import {
    POST_LOAD_SUCCESS,
    POST_CREATE_SUCCESS,
    POST_EDIT_SUCCESS,
    POST_DELETE_SUCCESS
} from '../action-creators/post-action-creators';

export const posts = (state = {}, action) =>
{
    switch (action.type)
    {
        case POST_LOAD_SUCCESS:
            const posts = {};

            for (let u of action.payload)
            {
                posts[u._id] = u;
            }

            return {...state, ...posts};

        case POST_CREATE_SUCCESS:
            const newPost = action.payload;
            return {...state, [newPost._id]: newPost};

        case POST_EDIT_SUCCESS:
            const editedPost = action.payload;
            return {...state, [editedPost._id]: editedPost};

        case POST_DELETE_SUCCESS:
            const newState = {...state};
            delete newState[action.payload._id];
            return newState;

        default:
            return state;
    }
};