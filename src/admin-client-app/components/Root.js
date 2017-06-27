import React from 'react';
import Menu from '../containers/Menu';

const Root = ({children}) =>
{
    return (
        <div className="module-layout">
            <div className="m-lyt-menu-container">
                <Menu/>
            </div>
            <div className="m-lyt-content-container">
                {children}
            </div>
        </div>
    );
};

export default Root;