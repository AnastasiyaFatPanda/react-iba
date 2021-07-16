import React from 'react';
import { connect } from 'react-redux';
import './Header.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../logo.svg';

const Header = ({countCards}) =>
(<div className="header row">
    <div className="col-3">
        <img src={logo} alt="Logo" />
        <span className="header-title">
            Learning React
        </span>
    </div>
    <div className="col-6 counter">
        <Link className="btn btn-light" to="/">
            Home
        </Link>
        <Link className="btn btn-light" to="/login">
            Log In
        </Link>
    </div>
    <div className="col-3 counter">
        <span className="badge badge-light">
            {countCards}
        </span>
    </div>
</div>
);

Header.propTypes = {
    countCards: PropTypes.number,
};
const mapStateToProps = state => ({
    countCards: state.countCards,
});

export default connect(mapStateToProps)(Header);