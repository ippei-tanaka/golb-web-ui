import React from 'react';
import PropTypes from 'prop-types';
import FormElement from './FormElement';
import {generate} from '../../helpers/random-string-generator';

class TextArea extends FormElement
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
                    htmlFor={`textarea-${randomString}`}
                    className="m-fel-label"
                >{label}</label>
                <textarea
                    id={`textarea-${randomString}`}
                    className="m-fel-element m-fel-textarea-element"
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

TextArea.propTypes = Object.assign({
    placeholder: PropTypes.string,
    label: PropTypes.string,
    disabled: PropTypes.bool,
    initialValue: PropTypes.string
}, FormElement.propTypes);

export default TextArea;