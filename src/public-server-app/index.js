import express from 'express';
import fetch from './fetch';
import {BAD_REQUEST, OK} from './status-codes';
import {render} from './renderer';
import fs from 'fs';
import path from 'path';

const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, './public-server.setting.json'), 'utf8'));

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

export default class
{
    constructor ({
        publicApiHostname,
        publicApiPort,
        publicApiBasename
    })
    {
        const app = express();

        const _fetch = fetch.bind(null, publicApiHostname, publicApiPort, publicApiBasename);

        app.use(express.static(path.resolve(__dirname, config.publicDocRoot)));

        app.get("/", respond(async () => {
            const posts = await _fetch('/posts', {method: 'get'});
            const settings = await _fetch('/settings', {method: 'get'});
            return render({
                posts: posts.posts,
                settings,
                title: settings.name
            });
        }));

        app.get("/post/:slug", respond(async (request, responce) => {
            const slug = request.params.slug;
            const post = await _fetch(`/post/${slug}`, {method: 'get'});
            const settings = await _fetch('/settings', {method: 'get'});
            return render({
                posts: [post],
                settings,
                title: settings.name
            });
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