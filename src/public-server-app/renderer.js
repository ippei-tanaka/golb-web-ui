import React from "react";
import { renderToStaticMarkup } from 'react-dom/server';
import Root from '../public-client-app/components/Root';

const renderDocument = (title, html, preloadedState) => (
    `<!doctype html>
    <html>
      <head>
        <title>${title}</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/vendor.bundle.js"></script>
        <script src="/index.bundle.js"></script>
      </body>
    </html>`
);

export const render = (data = {}) =>
{
    return renderDocument(data.title, renderToStaticMarkup(<Root {...data} />), data);
};