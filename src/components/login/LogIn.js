import React from 'react';
import './LogIn.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LogIn = ({ logIn }) =>
(
    <form className="logIn_form">
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
                id="exampleInputEmail1"
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                autoComplete="on" />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
                id="exampleInputPassword1"
                type="password"
                className="form-control"
                placeholder="Password"
                autoComplete="on" />
        </div>

        <Link className="btn btn-light" to="/" onClick={logIn}>
            Log In
        </Link>
    </form>
);

LogIn.propTypes = {
    logIn: PropTypes.func
};

export default LogIn;
