import React, {Component} from 'react';
import PropTypes from 'prop-types';

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

        return (
            <div>
                <label>{label}</label>
                <select
                    name={name}
                    value={entries[name] || ""}
                    onChange={e => update(name, e.target.value)}
                    disabled={disabled}
                >{children}</select>
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