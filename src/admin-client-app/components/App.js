import React, { PropTypes } from 'react';
import Login from '../containers/Login';

const App = ({ params }) => {
    return (
        <div>
            {params}
            <Login />
        </div>
    );
};

export default App;