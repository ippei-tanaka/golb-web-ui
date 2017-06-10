import fetch from 'node-fetch';
import url from 'url';
import path from 'path';
import {load} from '../../config-loader';

const {
    publicApiHostname,
    publicApiPort,
    publicApiBasename
} = load();

const _url = url.parse(`http://${publicApiHostname}:${publicApiPort}/${publicApiBasename}`);
const _base_pathname = _url.pathname;

export default (_path, options) =>
{
    try {
        _url.pathname = path.resolve('/', _base_pathname, "." + path.resolve('/', _path));

        const fetchedURL = _url.format();

        return fetch(fetchedURL, {
            headers: {
                "Origin": `${_url.protocol}//${_url.host}`
            },
            ...options
        }).then(async response =>
        {
            if (response.status < 400)
            {
                return await response.json();
            }

            if (response.status === 404)
            {
                throw new Error(`${fetchedURL} is not found.`);
            } else {
                throw new Error(`An error occurred while accessing ${fetchedURL}.`);
            }
        });
    } catch (e)
    {
        console.error(e);
    }
};