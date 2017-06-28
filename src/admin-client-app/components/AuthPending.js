import React from 'react';
import AuthRoot from './AuthRoot';

const Pending = ({children}) => {

    return (
        <AuthRoot>{children}</AuthRoot>
    );
};

export default Pending;