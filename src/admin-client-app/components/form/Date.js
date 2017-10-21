import React from 'react';
import PropTypes from 'prop-types';
import FormElement from './FormElement';
import {formatForInput} from '../../helpers/date-formatter';
import {generate} from '../../helpers/random-string-generator';

class Date extends FormElement
{
    constructor (props)
    {
        super(props);

        this.state = {
            value: props.initialValue || new window.Date(),
            error: []
        };
    }

    onFormSubmit ()
    {
        return this.state.value;
    }

    onFormSubmitFailed (error)
    {
        this.setState({error: error || []});
    }

    render ()
    {
        const {
            name,
            placeholder = "",
            label = "",
            disabled = false
        } = this.props;

        const {
            value,
            error
        } = this.state;

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
                    value={formatForInput(value)}
                    onChange={e => this.setState({value: e.target.value})}
                    disabled={disabled}
                />
                {error.length > 0 ? (
                    <ul className="m-fel-error-message-list">
                        {error.map((message, index) => (
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

Date.propTypes = Object.assign({
    placeholder: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    initialValue: PropTypes.oneOfType([
        PropTypes.instanceOf(window.Date),
        PropTypes.string
    ])
}, FormElement.propTypes);

export default Date;