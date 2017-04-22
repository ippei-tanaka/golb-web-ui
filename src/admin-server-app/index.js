import express from 'express';

export default class {

    constructor (config)
    {
        const app = express();

        app.use(express.static(config.adminDocRoot));

        // adding class methods to the express app

        for (let propName of Object.getOwnPropertyNames(this.constructor.prototype))
        {
            if (propName === "constructor") continue;
            app[propName] = this[propName].bind(this);
        }

        return app;
    }

};