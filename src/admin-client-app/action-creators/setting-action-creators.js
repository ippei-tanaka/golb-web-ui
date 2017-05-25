import fetch from './fetch';

/*
 * action types
 */

export const SETTING_LOAD_REQUEST = Symbol("SETTING_LOAD_REQUEST");
export const SETTING_LOAD_FAILURE = Symbol('SETTING_LOAD_FAILURE');
export const SETTING_LOAD_SUCCESS = Symbol('SETTING_LOAD_SUCCESS');

export const SETTING_EDIT_REQUEST = Symbol('SETTING_EDIT_REQUEST');
export const SETTING_EDIT_FAILURE = Symbol('SETTING_EDIT_FAILURE');
export const SETTING_EDIT_SUCCESS = Symbol('SETTING_EDIT_SUCCESS');

/*
 * fetch functions
 */

const loadSettingRequest = () => fetch(
    `/setting`,
    {
        method: "GET"
    });

const editSettingsRequest = (setting) => fetch(
    `/setting`,
    {
        method: "PUT",
        body: JSON.stringify(setting),
        headers: {
            "Content-Type": "application/json"
        }
    });

/*
 * action creators
 */

export const loadSettings = () =>
{
    return async dispatch =>
    {
        dispatch({
            type: SETTING_LOAD_REQUEST,
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        try
        {
            dispatch({
                type: SETTING_LOAD_SUCCESS,
                payload: await loadSettingRequest()
            });
        }
        catch (error)
        {
            dispatch({
                type: SETTING_LOAD_FAILURE
            });
        }
    };
};

export const editSettings = (setting) =>
{
    return async dispatch =>
    {
        dispatch({
            type: SETTING_EDIT_REQUEST
        });

        await new Promise(resolve => setTimeout(resolve, 500));

        try
        {
            await editSettingsRequest(setting);
            const payload = await loadSettingRequest();

            dispatch({
                type: SETTING_EDIT_SUCCESS,
                payload
            });

            return Promise.resolve(payload);
        }
        catch (error)
        {
            dispatch({
                type: SETTING_EDIT_FAILURE,
                payload: error
            });

            return Promise.reject(error);
        }
    };
};