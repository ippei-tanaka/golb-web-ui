import React from 'react';
import Menu from '../containers/Menu';

const Layout = ({children}) => {
    return (
        <div>
            Layout
            <Menu/>
            <div>{children}</div>
        </div>
    );
};

export default Layout;