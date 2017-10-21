import React from 'react';
import PropTypes from 'prop-types';
import FormElement from './FormElement';
import {generate} from '../../helpers/random-string-generator';

class Checkbox extends FormElement
{
    constructor (props)
    {
        super(props);

        this.state = {
            value: props.initialValue || false,
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
                    htmlFor={`checkbox-${randomString}`}
                    className="m-fel-label m-fel-inline-label"
                >{label}</label>
                <input
                    id={`checkbox-${randomString}`}
                    className="m-fel-element m-fel-checkbox-element"
                    type="checkbox"
                    name={name}
                    checked={value}
                    value="on"
                    onChange={e => this.setState({value: e.target.checked})}
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

Checkbox.propTypes = Object.assign({
    label: PropTypes.string,
    disabled: PropTypes.bool,
    initialValue: PropTypes.bool
}, FormElement.propTypes);

export default Checkbox;