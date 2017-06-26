import React, {Component} from 'react';
import PropTypes from 'prop-types';

const formatDate = (date) =>
{
    const d = new window.Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    let year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

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

        const value = entries[name] ? formatDate(entries[name]) : "";

        return (
            <div>
                <label>{label}</label>
                <input
                    type="date"
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