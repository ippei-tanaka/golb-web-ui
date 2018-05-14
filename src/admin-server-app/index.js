import express from 'express';
import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import config from './admin-server.setting';

const ADMIN_DOC_ROOT = config.adminDocRoot;
const ejsFile = fs.readFileSync(path.resolve(__dirname, '../admin-client-app/index.ejs'), 'utf8');

export default class {

    constructor ({adminRoot, adminApiHostname, adminApiPort, adminApiBasename, adminApiProtocol})
    {
        const app = express();

        app.use(express.static(ADMIN_DOC_ROOT));

        app.get("*", (request, response) => {
            response.type('html').send(ejs.render(ejsFile, {
                ADMIN_ROOT: adminRoot,
                ADMIN_API_HOSTNAME: adminApiHostname,
                ADMIN_API_PROTOCOL: adminApiProtocol,
                ADMIN_API_PORT: adminApiPort,
                ADMIN_API_BASENAME: adminApiBasename,
            }));
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