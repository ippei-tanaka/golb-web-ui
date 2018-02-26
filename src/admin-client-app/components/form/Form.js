import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Form extends Component
{
    constructor (props)
    {
        super(props);
        this._submitCallbacks = {};
        this._submitFailCallbacks = {};
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
            setSubmitCallback: (name, callback) => {
                this._submitCallbacks[name] = callback;
            },
            setSubmitFailCallback: (name, callback) => {
                this._submitFailCallbacks[name] = callback;
            }
        };
    }

    submit (event)
    {
        event.preventDefault();

        const data = {};

        const callbacks = this._submitCallbacks;

        for (let key of Object.keys(callbacks))
        {
            const callback = callbacks[key];
            data[key] = callback();
        }

        const obj = this.props.onSubmit(data);

        if (typeof obj === 'object' && obj && typeof obj.then === 'function')
        {
            obj
                .then(this._submissionDidSucceed.bind(this))
                .catch(this._submissionDidFail.bind(this));
        }
    }

    _submissionDidSucceed ()
    {
        if (!this._isMounted) return;

        this.props.onSubmissionSucceed();
    }

    _submissionDidFail (error)
    {
        if (!this._isMounted) return;

        if (error && error.message && !Array.isArray(error.message))
        {
            const callbacks = this._submitFailCallbacks;

            for (let key of Object.keys(callbacks))
            {
                const callback = callbacks[key];
                callback(error.message[key]);
            }
        }

        this.props.onSubmissionFail();
    }

    componentWillUnmount ()
    {
        this._isMounted = false;
    }
}

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
    setSubmitCallback: PropTypes.func,
    setSubmitFailCallback: PropTypes.func
};

export default Form;