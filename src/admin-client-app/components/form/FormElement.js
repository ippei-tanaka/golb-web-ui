import React, {Component} from 'react';
import PropTypes from 'prop-types';

class FormElement extends Component
{
    componentWillMount ()
    {
        const {name} = this.props;
        const {setSubmitCallback, setSubmitFailCallback} = this.context;

        setSubmitCallback(name, this.onFormSubmit.bind(this));
        setSubmitFailCallback(name, this.onFormSubmitFailed.bind(this));
    }

    onFormSubmit ()
    {
        console.error("[onFormSubmit] method in a class inheriting FormElement needs to be overridden.");
    }

    onFormSubmitFailed (error)
    {
        console.error("[onFormSubmitFailed] method in a class inheriting FormElement needs to be overridden.");
    }
}

FormElement.propTypes = Object.freeze({
    name: PropTypes.string.isRequired
});

FormElement.contextTypes = Object.freeze({
    setSubmitCallback: PropTypes.func.isRequired,
    setSubmitFailCallback: PropTypes.func.isRequired
});

export default FormElement;