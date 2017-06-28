import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {formatForInput} from '../../helpers/date-formatter';
import {generate} from '../../helpers/random-string-generator';

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

        const randomString = generate();

        return (
            <div className="module-form-element">
                <label
                    htmlFor={`datetime-${randomString}`}
                    className="m-fel-label"
                >{label}</label>
                <input
                    id={`datetime-${randomString}`}
                    className="m-fel-element m-fel-datetime-element"
                    type="datetime-local"
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={e => update(name, e.target.value)}
                    disabled={disabled}
                />
                {messages.length > 0 ? (
                    <ul className="m-fel-error-message-list">
                        {messages.map((message, index) => (
                            <li
                                className="m-fel-error-message-list-item"
                                key={index}
                            >{message}</li>
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