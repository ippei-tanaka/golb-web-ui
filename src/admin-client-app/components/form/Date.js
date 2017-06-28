import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {formatForInput} from '../../helpers/date-formatter';

class Date extends Component
{
    render ()
    {
        const {
            name,
            placeholder = "",
            label = "",
            disabled = false
        } = this.props;

        const {
            entries,
            update,
            errorMessages = {}
        } = this.context;

        const messages = errorMessages[name] || [];

        const value = entries[name] ? formatForInput(entries[name]) : "";

        return (
            <div>
                <label>{label}</label>
                <input
                    type="datetime-local"
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={e => update(name, e.target.value)}
                    disabled={disabled}
                />
                {messages.length > 0 ? (
                    <ul>
                        {messages.map((message, index) => (
                            <li key={index} style={{color: 'red'}}>{message}</li>
                        ))}
                    </ul>
                ) : null}
            </div>
        );
    }
}

Date.propTypes =
{
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool
};

Date.contextTypes =
{
    update: PropTypes.func.isRequired,
    entries: PropTypes.object.isRequired,
    errorMessages: PropTypes.object
};

export default Date;