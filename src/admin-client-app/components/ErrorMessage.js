import React, {Component} from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({message}) =>
{
    return (
        <div>
            {Object.keys(message).map(key =>
                <div key={key}>
                    <h5>{key}</h5>
                    <ul>
                        {message[key].map((item, index) =>
                            <li key={index}>{item}</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

ErrorMessage.propTypes =
{
    message: PropTypes.object.isRequired,
};

export default ErrorMessage;