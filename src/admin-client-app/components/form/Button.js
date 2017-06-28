import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Button extends Component
{
    render ()
    {
        const {
            children,
            disabled = false
        } = this.props;

        return (
            <div className="module-form-element">
                <button
                    className="m-fel-element m-fel-button-element"
                    disabled={disabled}
                >{children}</button>
            </div>
        );
    }
}

Button.propTypes =
{
    disabled: PropTypes.bool
};

export default Button;