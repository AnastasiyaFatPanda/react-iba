import React from 'react';
import './LogIn.scss';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import Input from './input';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logInForm: [
                {
                    id: uuidv4(),
                    type: 'email',
                    placeholder: 'Your E-Mail',
                    value: '',
                    rules: {
                        required: true,
                        isEmail: true
                    },
                    valid: false,
                    touched: false
                },
                {
                    id: uuidv4(),
                    type: 'password',
                    placeholder: 'Your Password',
                    value: '',
                    rules: {
                        required: true,
                        isPassword: true,
                        minLength: 8,
                    },
                    valid: false,
                    touched: false
                },
            ],
            formIsValid: false,
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (!rules) {
            return isValid;
        }

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isPassword) {
            // const pattern = /^(?=.*?[0-9])(?=.*?[A-Za-z])(?=.*[^0-9A-Za-z]).+$/;
            const pattern = /^(\w| )*[0-9A-Za-z](\w| )*$/;
            isValid = pattern.test(value) && isValid;
        }

        return isValid;
    }

    inputOnChangeHandler = (event, id) => {
        const { logInForm } = this.state;
        const newInputState = logInForm.map((input) => input.id === id
            ? {
                ...input,
                valid: this.checkValidity(event.target.value, input.rules),
                value: event.target.value
            }
            : input);
        const formIsValid = newInputState.every(input => input.valid);
        this.setState({ logInForm: newInputState, formIsValid });
    }

    inputOnBlurHandler = (id) => {
        const { logInForm } = this.state;
        const newInputState = logInForm.map((input) => input.id === id
            ? {
                ...input,
                touched: true,
            }
            : input);
        this.setState({ logInForm: newInputState });
    }

    render() {
        const { logIn } = this.props;
        const { logInForm, formIsValid } = this.state;

        return (
            <form className="logIn_form">
                {logInForm.map((formElement) =>
                    <Input
                        key={formElement.id}
                        placeholder={formElement.placeholder}
                        type={formElement.type}
                        value={formElement.value}
                        valid={formElement.valid}
                        touched={formElement.touched}
                        onBlur={() => this.inputOnBlurHandler(formElement.id)}
                        onChange={(event) => this.inputOnChangeHandler(event, formElement.id)}
                    />
                )}
                <Link to="/">
                    <button
                        className="btn btn-light"
                        type="submit"
                        disabled={!formIsValid}
                        onClick={logIn} >
                        Log In
                    </button>
                </Link>
            </form>
        )
    }
};

LogIn.propTypes = {
    logIn: PropTypes.func
};

export default LogIn;
