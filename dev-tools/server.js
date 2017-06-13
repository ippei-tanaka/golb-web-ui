import express from 'express';
import {AdminServerApp, PublicServerApp} from '../src';

let server;
let app;
let adminServerApp;
let publicServerApp;

export const start = async (config = {}) =>
{
    if (!app)
    {
        app = express();
    }

    if (!adminServerApp)
    {
        adminServerApp = new AdminServerApp(config);
        app.use(config.adminRoot, adminServerApp);
    }

    if (!publicServerApp)
    {
        publicServerApp = new PublicServerApp(config);
        app.use(config.publicRoot, publicServerApp);
    }

    server = await app.listen(config.webPort, config.webHost,
        error =>
        {
            if (error) throw error;
            if (!config.silent) console.log("Golb has started.");
        }
    );
};

export const stop = async (config = {}) =>
{
    if (server)
    {
        await server.close();
        if (!config.silent) console.log("Golb has stopped.");
    }
};