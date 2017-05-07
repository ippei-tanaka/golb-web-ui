import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createForm, update, clear} from '../../action-creators/form-action-creators';

let Form = class extends Component
{
    componentWillMount ()
    {
        const {formId, createForm, initialValues} = this.props;
        createForm(formId, initialValues);
    }

    componentWillUnmount ()
    {
        const {formId, clear} = this.props;
        clear(formId);
    }

    render ()
    {
        const {children} = this.props;

        return (
            <form onSubmit={this.submit.bind(this)}>{children}</form>
        );
    }

    getChildContext ()
    {
        const {data, update, error, formId} = this.props;

        return {
            update: (name, value) => update(formId, name, value),
            values: {...data[formId]},
            errorMessages: error[formId]
        };
    }

    submit (event)
    {
        const {onSubmit, data, formId} = this.props;
        event.preventDefault();
        onSubmit(data[formId]);
    }
};

Form.propTypes =
{
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.object,
    formId: PropTypes.symbol
};

Form.childContextTypes = {
    update: PropTypes.func,
    values: PropTypes.object,
    errorMessages: PropTypes.object
};

const mapStateToProps = (state) =>
{
    return {
        data: state.formData,
        error: state.formError
    };
};

const mapDispatchToProps = dispatch => ({
    createForm: (...args) => dispatch(createForm(...args)),
    update: (...args) => dispatch(update(...args)),
    clear: (...args) => dispatch(clear(...args))
});

Form = connect(mapStateToProps, mapDispatchToProps)(Form);

export default Form;