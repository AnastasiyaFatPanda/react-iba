import React from 'react';
import './LogIn.scss';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Input from './input';
import { AuthActions } from '../../redux/reducers/authReducer';

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
            const pattern = /^[\w-.]+@([A-Za-z]+\.)+[A-Za-z]{2,5}$/;
            isValid = pattern.test(value) && isValid;
        }

        if (rules.isPassword) {
            const pattern = /(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]/g;
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

    logIn = () => {
        const { logInHandle } = this.props;
        const { logInForm } = this.state;

        const username = logInForm.find((form) => form.type === 'email').value;
        const password = logInForm.find((form) => form.type === 'password').value;

        logInHandle({ username, password });
    }

    render() {
        const { logInForm, formIsValid } = this.state;

        return (
            <form className="logIn_form">
                {logInForm.map(({ id, placeholder, type, value, valid, touched }) =>
                    <Input
                        key={id}
                        placeholder={placeholder}
                        type={type}
                        value={value}
                        valid={valid}
                        touched={touched}
                        onBlur={() => this.inputOnBlurHandler(id)}
                        onChange={(event) => this.inputOnChangeHandler(event, id)}
                    />
                )}
                <Link to="/">
                    <button
                        className="btn btn-light"
                        type="submit"
                        disabled={!formIsValid}
                        onClick={this.logIn} >
                        Log In
                    </button>
                </Link>
            </form>
        )
    }
};

LogIn.propTypes = {
    logInHandle: PropTypes.func,
};

const mapDispatchToProps = {
    logInHandle: AuthActions.login,
};

export default connect(null, mapDispatchToProps)(LogIn);
