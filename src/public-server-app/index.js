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

        app.get("/post/:slug", respond(this.singlePostRoute));

        app.get(/^\/(page\/\d\/?)?/, respond(this.homeRoute));

        for (let propName of Object.getOwnPropertyNames(this.constructor.prototype))
        {
            if (propName === "constructor") continue;
            app[propName] = this[propName].bind(this);
        }

        return app;
    }

    get homeRoute ()
    {
        return async (request) =>
        {
            const page = request.params[0] ? request.params[0].split('/')[1] : 1;
            const {posts, currentPage, nextPage, prevPage} = await this._fetch(`/posts/page/${page}`, {method: 'get'});
            const {categories} = await this._fetch('/categories', {method: 'get'});
            const settings = await this._fetch('/settings', {method: 'get'});
            return render({
                posts,
                nextPage,
                prevPage,
                settings,
                categories,
                title: settings.name + (currentPage > 1 ? ` - page ${currentPage}` : "")
            });
        }
    }

    get singlePostRoute ()
    {
        return async (request) =>
        {
            const slug = request.params.slug;
            const post = await this._fetch(`/post/${slug}`, {method: 'get'});
            const {categories} = await this._fetch('/categories', {method: 'get'});
            const settings = await this._fetch('/settings', {method: 'get'});
            return render({
                posts: [post],
                settings,
                categories,
                title: post.title
            });
        }
    }

};