import React from 'react';
import './Input.scss';
import PropTypes from 'prop-types';

const Input = ({ placeholder, type, value, onChange, onBlur, valid, touched }) => {
    const error = !valid && touched;
    return (
        <div className="form-group">
            <label htmlFor={type}>
                {placeholder}
            </label>
            <input
                type={type}
                className={error ? 'form-control invalidInput' : 'form-control'}
                placeholder={placeholder}
                autoComplete="on"
                value={value}
                onBlur={onBlur}
                onChange={onChange} />
            {error && <div className="errorMessage">Type correct {type}</div>}
        </div>
    );
};

Input.propTypes = {
    placeholder: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    valid: PropTypes.bool,
    touched: PropTypes.bool,
};

export default Input;
