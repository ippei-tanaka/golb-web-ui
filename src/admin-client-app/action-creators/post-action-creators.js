import fetch from './fetch';

/*
 * action types
 */

export const POST_LOAD_REQUEST = Symbol("POST_LOAD_REQUEST");
export const POST_LOAD_FAILURE = Symbol('POST_LOAD_FAILURE');
export const POST_LOAD_SUCCESS = Symbol('POST_LOAD_SUCCESS');

export const POST_CREATE_REQUEST = Symbol('POST_CREATE_REQUEST');
export const POST_CREATE_FAILURE = Symbol('POST_CREATE_FAILURE');
export const POST_CREATE_SUCCESS = Symbol('POST_CREATE_SUCCESS');

export const POST_EDIT_REQUEST = Symbol('POST_EDIT_REQUEST');
export const POST_EDIT_FAILURE = Symbol('POST_EDIT_FAILURE');
export const POST_EDIT_SUCCESS = Symbol('POST_EDIT_SUCCESS');

export const POST_DELETE_REQUEST = Symbol('POST_DELETE_REQUEST');
export const POST_DELETE_FAILURE = Symbol('POST_DELETE_FAILURE');
export const POST_DELETE_SUCCESS = Symbol('POST_DELETE_SUCCESS');

/*
 * fetch functions
 */

const loadPostsRequest = () => fetch(
    `/posts`,
    {
        method: "GET"
    })
    .then(obj => obj.items);

const loadPostRequest = (id) => fetch(
    `/posts/${id}`,
    {
        method: "GET"
    });

const createPostsRequest = (post) => fetch(
    "/posts",
    {
        method: "POST",
        body: JSON.stringify(post),
        headers: {
            "Content-Type": "application/json"
        }
    });

const editPostsRequest = (id, post) => fetch(
    `/posts/${id}`,
    {
        method: "PUT",
        body: JSON.stringify(post),
        headers: {
            "Content-Type": "application/json"
        }
    });

const deletePostRequest = (id) => fetch(
    `/posts/${id}`,
    {
        method: "DELETE"
    });

/*
 * action creators
 */

export const loadPosts = () =>
{
    return async dispatch =>
    {
        dispatch({
            type: POST_LOAD_REQUEST,
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        try
        {
            dispatch({
                type: POST_LOAD_SUCCESS,
                payload: await loadPostsRequest()
            });
        }
        catch (error)
        {
            dispatch({
                type: POST_LOAD_FAILURE
            });
        }
    };
};

export const createPost = (post) =>
{
    return async dispatch =>
    {
        dispatch({
            type: POST_CREATE_REQUEST,
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        try
        {
            const {_id} = await createPostsRequest(post);
            const payload = await loadPostRequest(_id);

            dispatch({
                type: POST_CREATE_SUCCESS,
                payload
            });

            return Promise.resolve(payload);
        }
        catch (error)
        {
            dispatch({
                type: POST_CREATE_FAILURE,
                payload: error,
            });

            return Promise.reject(error);
        }
    };
};

export const editPost = (id, post) =>
{
    return async dispatch =>
    {
        dispatch({
            type: POST_EDIT_REQUEST
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        try
        {
            await editPostsRequest(id, post);
            const payload = await loadPostRequest(id);

            dispatch({
                type: POST_EDIT_SUCCESS,
                payload
            });

            return Promise.resolve(payload);
        }
        catch (error)
        {
            dispatch({
                type: POST_EDIT_FAILURE,
                payload: error
            });

            return Promise.reject(error);
        }
    };
};

export const deletePost = (id) =>
{
    return async dispatch =>
    {
        dispatch({
            type: POST_DELETE_REQUEST
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        try
        {
            await deletePostRequest(id);

            dispatch({
                type: POST_DELETE_SUCCESS,
                payload: {_id: id}
            });

            return Promise.resolve();
        }
        catch (error)
        {
            dispatch({
                type: POST_DELETE_FAILURE,
                payload: error
            });

            return Promise.reject(error);
        }
    };
};