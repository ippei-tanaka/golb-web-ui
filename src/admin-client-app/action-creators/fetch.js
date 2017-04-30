import 'whatwg-fetch';

export default (url, options) =>
{
    return fetch(url, {
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