import express from 'express';
import fetch from './fetch';
import {BAD_REQUEST, OK} from './status-codes';
import {render} from './renderer';
import config from './public-server.setting';

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

        this._fetch = fetch.bind(null, publicApiHostname, publicApiPort, publicApiBasename);

        app.use(express.static(config.publicDocRoot));

        app.get("/", respond(this.homeRoute));

        app.get("/post/:slug", respond(this.singlePostRoute));

        // adding class methods to the express app

        for (let propName of Object.getOwnPropertyNames(this.constructor.prototype))
        {
            if (propName === "constructor") continue;
            app[propName] = this[propName].bind(this);
        }

        return app;
    }

    get homeRoute ()
    {
        return async () =>
        {
            const posts = await this._fetch('/posts', {method: 'get'});
            const settings = await this._fetch('/settings', {method: 'get'});
            return render({
                posts: posts.posts,
                settings,
                title: settings.name
            });
        }
    }

    get singlePostRoute ()
    {
        return async (request) =>
        {
            const slug = request.params.slug;
            const post = await this._fetch(`/post/${slug}`, {method: 'get'});
            const settings = await this._fetch('/settings', {method: 'get'});
            return render({
                posts: [post],
                settings,
                title: post.title
            });
        }
    }

};