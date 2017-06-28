import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {generate} from '../../helpers/random-string-generator';

class TextArea extends Component
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
                    htmlFor={`textarea-${randomString}`}
                    className="m-fel-label"
                >{label}</label>
                <textarea
                    id={`textarea-${randomString}`}
                    className="m-fel-element m-fel-textarea-element"
                    name={name}
                    placeholder={placeholder}
                    value={entries[name] || ""}
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

TextArea.propTypes =
{
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool
};

TextArea.contextTypes =
{
    update: PropTypes.func.isRequired,
    entries: PropTypes.object.isRequired,
    errorMessages: PropTypes.object
};

export default TextArea;