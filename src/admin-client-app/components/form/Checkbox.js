import React, {Component} from 'react';
import PropTypes from 'prop-types';

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

        return (
            <div>
                <label>{label}</label>
                <input
                    type="checkbox"
                    name={name}
                    placeholder={placeholder}
                    checked={entries[name]}
                    value="on"
                    onChange={e => update(name, e.target.checked)}
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