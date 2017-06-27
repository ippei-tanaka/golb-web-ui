import React from 'react';
import Root from './Root';

const NotFound = () =>
{
    return (
        <Root>
            <div className="module-content">
                <h1 className="m-ctt-title">404</h1>
                <p>The content you are looking for could not be found.</p>
            </div>
        </Root>
    );
};

export default NotFound;