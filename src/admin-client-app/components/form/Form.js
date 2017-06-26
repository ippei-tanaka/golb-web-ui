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

        this._isMounted = true;
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

        const formElements = event.target.querySelectorAll('input, select, textarea, button');
        const submitted = {};
        const entries = this.state.entries;

        for (let element of formElements)
        {
            const name = element.getAttribute('name');

            if (!name) continue;

            const value = entries[name];

            if (typeof value === "undefined") continue;

            submitted[name] = value;
        }

        const obj = this.props.onSubmit(submitted);

        if (obj instanceof Promise)
        {
            obj
                .then(this._submissionDidSucceed.bind(this))
                .catch(this._submissionDidFail.bind(this));
        }
    }

    _submissionDidSucceed ()
    {
        if (!this._isMounted) return;

        this.setState(s => {s.error = {}});

        this.props.onSubmissionSucceed();
    }

    _submissionDidFail (error)
    {
        if (!this._isMounted) return;

        if (error && error.message && !Array.isArray(error.message))
        {
            this.setState(s => {s.error = error.message});
        }

        this.props.onSubmissionFail();
    }

    componentWillUnmount ()
    {
        this._isMounted = false;
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