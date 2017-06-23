import 'whatwg-fetch';
import url from 'url';
import path from 'path';

const {
    ADMIN_API_HOSTNAME,
    ADMIN_API_PORT,
    ADMIN_API_BASENAME
} = window.__GOLB_ENV__;

const _url = url.parse(`http://${ADMIN_API_HOSTNAME}:${ADMIN_API_PORT}/${ADMIN_API_BASENAME}`);
const _base_pathname = _url.pathname;

export default (_path, options) =>
{
    _url.pathname = path.resolve('/', _base_pathname, "." + path.resolve('/', _path));

    return fetch(_url.format(), {
        credentials: 'include',
        ...options
    }).then(async response =>
    {
        if (response.status >= 400)
        {
            throw await response.json();
        }

        return await response.json();
    });
};