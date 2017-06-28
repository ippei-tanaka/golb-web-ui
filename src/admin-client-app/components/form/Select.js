import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {generate} from '../../helpers/random-string-generator';

class Select extends Component
{
    render ()
    {
        const {
            name,
            label = "",
            disabled = false,
            children
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
                    htmlFor={`select-${randomString}`}
                    className="m-fel-label"
                >{label}</label>
                <select
                    id={`select-${randomString}`}
                    className="m-fel-element m-fel-select-element"
                    name={name}
                    value={entries[name] || ""}
                    onChange={e => update(name, e.target.value)}
                    disabled={disabled}
                >{children}</select>
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

Select.propTypes =
{
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired
};

Select.contextTypes =
{
    update: PropTypes.func.isRequired,
    entries: PropTypes.object.isRequired,
    errorMessages: PropTypes.object
};

export default Select;