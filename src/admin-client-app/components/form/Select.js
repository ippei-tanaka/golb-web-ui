import React from 'react';
import PropTypes from 'prop-types';
import FormElement from './FormElement';
import {generate} from '../../helpers/random-string-generator';

class Select extends FormElement
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
            label = "",
            disabled = false,
            children
        } = this.props;

        const {
            value,
            error
        } = this.state;

        const randomString = generate();

        return (
            <div className="module-form-element">
                <label
                    htmlFor={`select-${randomString}`}
                    className="m-fel-label"
                >{label}</label>
                <select
                    id={`select-${randomString}`}
                    className="m-fel-element m-fel-select-element"
                    name={name}
                    value={value}
                    onChange={e => this.setState({value: e.target.value})}
                    disabled={disabled}
                >{children}</select>
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

Select.propTypes = Object.assign({
    label: PropTypes.string,
    disabled: PropTypes.bool,
    children: PropTypes.node.isRequired,
    initialValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
}, FormElement.propTypes);

export default Select;