/*
 * action types
 */

export const FORM_CREATE = Symbol('FORM_CREATE');
export const FORM_UPDATE = Symbol('FORM_UPDATE');
export const FORM_CLEAR = Symbol('FORM_CLEAR');

/*
 * action creators
 */

export const createForm = (formId, initialValues = {}) =>
{
    return {
        type: FORM_CREATE,
        payload: initialValues,
        formId
    }
};

export const update = (formId, name, value) =>
{
    return {
        type: FORM_UPDATE,
        payload: {[name]: value},
        formId
    };
};

export const clear = (formId) =>
{
    return {
        type: FORM_CLEAR,
        formId
    }
};