import React from 'react';
import './LogIn.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LogIn = ({ logIn }) =>
(
    <form className="logIn_form">
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
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
