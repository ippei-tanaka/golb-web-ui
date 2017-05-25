import {
    SETTING_LOAD_SUCCESS,
    SETTING_EDIT_SUCCESS
} from '../action-creators/setting-action-creators';

export const settings = (state = {}, action) =>
{
    switch (action.type)
    {
        case SETTING_LOAD_SUCCESS:
            return action.payload;

        case SETTING_EDIT_SUCCESS:
            return action.payload;

        default:
            return state;
    }
};