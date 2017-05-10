import React, {Component} from 'react';
import PropTypes from 'prop-types';

let Form = class extends Component {
    constructor (props)
    {
        super(props);

        this.state = {
            entries: {...props.initialEntries},
            error: {}
        };
    }

    render ()
    {
        const {children} = this.props;

        return (
            <form ref="formElement" onSubmit={this.submit.bind(this)}>{children}</form>
        );
    }

    getChildContext ()
    {
        return {
            update: (name, value) => this.setState(s => {s.entries[name] = value}),
            entries: this.state.entries,
            errorMessages: this.state.error
        };
    }

    submit (event)
    {
        event.preventDefault();

        const {onSubmit, onSubmissionSucceed, onSubmissionFail} = this.props;
        const formData = new FormData(this.refs.formElement);
        const submitted = {};
        const entries = this.state.entries;

        for (let key of formData.keys())
        {
            submitted[key] = entries[key];
        }

        const obj = onSubmit(submitted);

        if (obj instanceof Promise)
        {
            obj
                .then(() =>
                {
                    this.setState(s => {s.error = {}});
                    onSubmissionSucceed();
                })
                .catch(error =>
                {
                    if (error && error.message && !Array.isArray(error.message))
                    {
                        this.setState(s => {s.error = error.message});
                    }
                    onSubmissionFail();
                });
        }
    }
};

Form.propTypes =
{
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSubmissionSucceed: PropTypes.func,
    onSubmissionFail: PropTypes.func,
    initialEntries: PropTypes.object
};

Form.defaultProps = {
    onSubmissionSucceed: () => {},
    onSubmissionFail: () => {}
};

Form.childContextTypes = {
    update: PropTypes.func,
    entries: PropTypes.object,
    errorMessages: PropTypes.object
};

export default Form;