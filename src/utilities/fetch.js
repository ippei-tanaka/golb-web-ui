import fetch from 'node-fetch';
import urlModule from 'url';
import pathModule from 'path';

export default ({
                    protocol = "http",
                    host = "localhost",
                    port = 80,
                    base = "",
                    path = "",
                    options = {}
}) =>
{
    const url = urlModule.parse(`${protocol}://${host}:${port}/${base}`);
    const base_pathname = url.pathname;

    try {
        url.pathname = pathModule.resolve('/', base_pathname, "." + pathModule.resolve('/', path));

        const fetchedURL = url.format();

        return fetch(fetchedURL, {
            headers: {
                "Origin": `${url.protocol}//${url.host}`
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