import express from 'express';
import fetch from './fetch';
import {BAD_REQUEST, OK} from './status-codes';
import {render} from './renderer';

const respond = (asyncFn = async () => {}) =>
{
    return (request, response, next) =>
    {
        asyncFn(request, response, next)
            .then((data = {}) =>
            {
                response.type('html').status(OK).send(data);
            })
            .catch((error) =>
            {
                response.type('html').status(BAD_REQUEST).send(error.toString());
            });
    };
};

export default class {

    constructor ({publicDocRoot})
    {
        const app = express();

        app.use(express.static(publicDocRoot));

        app.get("/", respond(async () => {
            const posts = await fetch('/posts', {method: 'get'});
            const settings = await fetch('/settings', {method: 'get'});
            return render({posts, settings});
        }));

        // adding class methods to the express app

        for (let propName of Object.getOwnPropertyNames(this.constructor.prototype))
        {
            if (propName === "constructor") continue;
            app[propName] = this[propName].bind(this);
        }

        return app;
    }

};