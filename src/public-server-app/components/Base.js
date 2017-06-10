import React from 'react';
import Header from './Header';

const Base = ({title}) =>
{
    return (
        <html>
        <head>
            <title>{title}</title>
        </head>
        <body>
        <div>
            <Header/>
            Hello!
        </div>
        </body>
        </html>
    );
};

export default Base;