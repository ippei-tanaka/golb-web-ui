# Golb Web UI

This is the web UI for Golb, a blogging platform for Node.js.

## Installation

To install this package, run:

```
npm install --save golb-web-ui
```

## Usages

### AdminServerApp

AdminServerApp is an express application that provide the restricted admin site, where a user manages the blog.

```js
import {AdminServerApp} from 'golb-web-ui';
import express from 'express';

const config = 
{
    // The root of the admin site URL.
    // `http://myhost.com:3000${adminRoot}`
    adminRoot: "/admin",
    
    // The hostname, port and basename to access the Golb RESTful API, which you need to install and set up separatly.
    adminApiHostname: "localhost",
    adminApiPort: 8888,
    adminApiBasename: "/admin-api",
};

const adminServerApp = new AdminServerApp(config);

const app = express();

app.use(config.adminRoot, adminServerApp);

app.listen(3000);

```

### PublicServerApp

PublicServerApp is an express application that provide the public site, which is exposed to public.

```js
import {PublicServerApp} from 'golb-web-ui';
import express from 'express';

const config = 
{
    // The root of the admin site URL.
    // `http://myhost.com:3000${publicRoot}`
    publicRoot: "/",
    
    // The hostname, port and basename to access the Golb RESTful API, which you need to install and set up separatly.
    publicApiHostname: "localhost",
    publicApiPort: 8888,
    publicApiBasename: "/public-api"
};

const publicServerApp = new PublicServerApp(config);

const app = express();

app.use(config.publicRoot, publicServerApp);

app.listen(3000);

```


