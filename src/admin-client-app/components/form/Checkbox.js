import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {generate} from '../../helpers/random-string-generator';

class Checkbox extends Component
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

        const randomString = generate();

        return (
            <div className="module-form-element">
                <label
                    htmlFor={`checkbox-${randomString}`}
                    className="m-fel-label m-fel-inline-label"
                >{label}</label>
                <input
                    id={`checkbox-${randomString}`}
                    className="m-fel-element m-fel-checkbox-element"
                    type="checkbox"
                    name={name}
                    placeholder={placeholder}
                    checked={entries[name]}
                    value="on"
                    onChange={e => update(name, e.target.checked)}
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

Checkbox.propTypes =
{
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool
};

Checkbox.contextTypes =
{
    update: PropTypes.func.isRequired,
    entries: PropTypes.object.isRequired,
    errorMessages: PropTypes.object
};

export default Checkbox;