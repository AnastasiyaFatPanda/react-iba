import React from 'react';
import { connect } from 'react-redux';
import './Header.scss';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import logo from '../../logo.svg';
import { AuthActions } from '../../redux/reducers/authReducer';

const Header = ({ countCards, isAuth, logOutHandle, userName, isAdmin }) =>
(<div className="header row">
    <div className="col-5">
        <img src={logo} alt="Logo" />
        {
            !isAuth
                ? <span className="header-title">
                    Learning React
                </span>
                : <span className="header-title">
                    Hello, {userName}
                </span>
        }
    </div>
    <div className="col-6 navigation-buttons">
        {
            !isAuth
                ? <Link className="btn btn-light" to="/">
                    Log In
                </Link>
                : (<>
                    <Link className="btn btn-light" to="/">
                        Home
                    </Link>
                    <Link to="/">
                        <button
                            className="btn btn-light"
                            type="submit"
                            onClick={logOutHandle} >
                            Log Out
                        </button>
                    </Link>
                </>)
        }
        {isAdmin && <Link className="btn btn-light" to="/settings">Settings</Link>}
    </div>
    <div className="col-1 counter">
        <span className="badge badge-light">
            {countCards}
        </span>
    </div>
</div>
);

Header.propTypes = {
    countCards: PropTypes.number,
    isAuth: PropTypes.bool,
    logOutHandle: PropTypes.func,
    userName: PropTypes.string,
    isAdmin: PropTypes.bool,
};

const mapStateToProps = state => ({
    countCards: state.cardReducer.countCards,
    isAuth: state.authReducer.isAuth,
    userName: state.authReducer.currentUser.authData.username,
    isAdmin: state.authReducer.currentUser.isAdmin,
});

const mapDispatchToProps = {
    logOutHandle: AuthActions.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);