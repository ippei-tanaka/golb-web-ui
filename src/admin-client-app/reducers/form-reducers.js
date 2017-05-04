import {
    FORM_CREATE,
    FORM_UPDATE,
    FORM_CLEAR
} from '../action-creators/form-action-creators';

import {
    USER_CREATE_FAILURE
} from '../action-creators/user-action-creators';

export const formData = (state = {}, action) =>
{
    switch (action.type)
    {
        case FORM_CREATE:
            return {[action.formId]: {}};

        case FORM_UPDATE:
            const newData = {...state[action.formId], ...action.payload};
            const _newState = {...state};
            _newState[action.formId] = newData;
            return _newState;

        case FORM_CLEAR:
            const newState = {...state};
            delete newState[action.formId];
            return newState;

        default:
            return state;
    }
};

export const formError = (state = {}, action) =>
{
    switch (action.type)
    {
        case USER_CREATE_FAILURE:
            return {...state, [action.token]: action.payload.message};

        case FORM_CLEAR:
            const newState = {...state};
            delete newState[action.formId];
            return newState;

        default:
            return state;
    }
};