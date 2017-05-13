import React, {Component} from 'react';
import PropTypes from 'prop-types';

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

        return (
            <div>
                <label>{label}</label>
                <textarea
                    name={name}
                    placeholder={placeholder}
                    value={entries[name] || ""}
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