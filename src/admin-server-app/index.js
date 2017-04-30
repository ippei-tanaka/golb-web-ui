import express from 'express';

export default class {

    constructor ({adminDocRoot})
    {
        const app = express();

        app.use(express.static(adminDocRoot));

        app.get("*", (request, response) => {
            response.sendFile('index.html', {root: adminDocRoot});
        });

        // adding class methods to the express app

        for (let propName of Object.getOwnPropertyNames(this.constructor.prototype))
        {
            if (propName === "constructor") continue;
            app[propName] = this[propName].bind(this);
        }

        return app;
    }

};