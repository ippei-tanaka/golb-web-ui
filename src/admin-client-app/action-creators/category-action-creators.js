import fetch from './fetch';

/*
 * action types
 */

export const CATEGORY_LOAD_REQUEST = Symbol("CATEGORY_LOAD_REQUEST");
export const CATEGORY_LOAD_FAILURE = Symbol('CATEGORY_LOAD_FAILURE');
export const CATEGORY_LOAD_SUCCESS = Symbol('CATEGORY_LOAD_SUCCESS');

export const CATEGORY_CREATE_REQUEST = Symbol('CATEGORY_CREATE_REQUEST');
export const CATEGORY_CREATE_FAILURE = Symbol('CATEGORY_CREATE_FAILURE');
export const CATEGORY_CREATE_SUCCESS = Symbol('CATEGORY_CREATE_SUCCESS');

export const CATEGORY_EDIT_REQUEST = Symbol('CATEGORY_EDIT_REQUEST');
export const CATEGORY_EDIT_FAILURE = Symbol('CATEGORY_EDIT_FAILURE');
export const CATEGORY_EDIT_SUCCESS = Symbol('CATEGORY_EDIT_SUCCESS');

export const CATEGORY_DELETE_REQUEST = Symbol('CATEGORY_DELETE_REQUEST');
export const CATEGORY_DELETE_FAILURE = Symbol('CATEGORY_DELETE_FAILURE');
export const CATEGORY_DELETE_SUCCESS = Symbol('CATEGORY_DELETE_SUCCESS');

/*
 * fetch functions
 */

const loadCategoriesRequest = () => fetch(
    `/categories`,
    {
        method: "GET"
    })
    .then(obj => obj.items);

const loadCategoryRequest = (id) => fetch(
    `/categories/${id}`,
    {
        method: "GET"
    });

const createCategoriesRequest = (category) => fetch(
    "/categories",
    {
        method: "POST",
        body: JSON.stringify(category),
        headers: {
            "Content-Type": "application/json"
        }
    });

const editCategoriesRequest = (id, category) => fetch(
    `/categories/${id}`,
    {
        method: "PUT",
        body: JSON.stringify(category),
        headers: {
            "Content-Type": "application/json"
        }
    });

const deleteCategoryRequest = (id) => fetch(
    `/categories/${id}`,
    {
        method: "DELETE"
    });

/*
 * action creators
 */

export const loadCategories = () =>
{
    return async dispatch =>
    {
        dispatch({
            type: CATEGORY_LOAD_REQUEST,
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        try
        {
            dispatch({
                type: CATEGORY_LOAD_SUCCESS,
                payload: await loadCategoriesRequest()
            });
        }
        catch (error)
        {
            dispatch({
                type: CATEGORY_LOAD_FAILURE
            });
        }
    };
};

export const createCategory = (category) =>
{
    return async dispatch =>
    {
        dispatch({
            type: CATEGORY_CREATE_REQUEST,
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        try
        {
            const {_id} = await createCategoriesRequest(category);
            const payload = await loadCategoryRequest(_id);

            dispatch({
                type: CATEGORY_CREATE_SUCCESS,
                payload
            });

            return Promise.resolve(payload);
        }
        catch (error)
        {
            dispatch({
                type: CATEGORY_CREATE_FAILURE,
                payload: error,
            });

            return Promise.reject(error);
        }
    };
};

export const editCategory = (id, category) =>
{
    return async dispatch =>
    {
        dispatch({
            type: CATEGORY_EDIT_REQUEST
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        try
        {
            await editCategoriesRequest(id, category);
            const payload = await loadCategoryRequest(id);

            dispatch({
                type: CATEGORY_EDIT_SUCCESS,
                payload
            });

            return Promise.resolve(payload);
        }
        catch (error)
        {
            dispatch({
                type: CATEGORY_EDIT_FAILURE,
                payload: error
            });

            return Promise.reject(error);
        }
    };
};

export const deleteCategory = (id) =>
{
    return async dispatch =>
    {
        dispatch({
            type: CATEGORY_DELETE_REQUEST
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        try
        {
            await deleteCategoryRequest(id);

            dispatch({
                type: CATEGORY_DELETE_SUCCESS,
                payload: {_id: id}
            });

            return Promise.resolve();
        }
        catch (error)
        {
            dispatch({
                type: CATEGORY_DELETE_FAILURE,
                payload: error
            });

            return Promise.reject(error);
        }
    };
};