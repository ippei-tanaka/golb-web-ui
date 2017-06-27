import React from 'react';
import Menu from '../containers/Menu';

const Root = ({children}) => {
    return (
        <div>
            Root
            <Menu/>
            <div>{children}</div>
        </div>
    );
};

export default Root;