import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Text extends Component
{
    render ()
    {
        const {
            name,
            placeholder = "",
            label = "",
            type = "text",
            disabled = false
        } = this.props;

        const {
            values,
            update,
            errorMessages = {}
        } = this.context;

        const messages = errorMessages[name] || [];

        return (
            <div>
                <label>{label}</label>
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={values[name] || ""}
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

    static get propTypes ()
    {
        return {
            name: PropTypes.string.isRequired,
            placeholder: PropTypes.string,
            label: PropTypes.string,
            type: PropTypes.string,
            disabled: PropTypes.bool
        };
    }

    static get contextTypes ()
    {
        return {
            update: PropTypes.func.isRequired,
            values: PropTypes.object.isRequired,
            errorMessages: PropTypes.object
        }
    }
}

export default Text;