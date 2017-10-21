import React from 'react';
import PropTypes from 'prop-types';
import FormElement from './FormElement';
import {generate} from '../../helpers/random-string-generator';

class Text extends FormElement
{
    constructor (props)
    {
        super(props);

        this.state = {
            value: props.initialValue || "",
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
            type = "text",
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
                    htmlFor={`text-${randomString}`}
                    className="m-fel-label"
                >{label}</label>
                <input
                    id={`text-${randomString}`}
                    className="m-fel-element m-fel-input-element"
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    value={value}
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

Text.propTypes = Object.assign({
    placeholder: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    initialValue: PropTypes.string
}, FormElement.propTypes);

export default Text;