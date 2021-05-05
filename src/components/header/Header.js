import React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';
import { CardsContextConsumer } from '../../context/CardsContext';

const Header = () => (
    <CardsContextConsumer>
        {
            ({ countCards }) =>
            (<div className="header row">
                <div className="col-8">
                    <img src={logo} alt="Logo" />
                    <span className="header-title">
                        Learning React
                </span>
                </div>
                <div className="col-4 counter">
                    <span className="badge badge-light">
                        {countCards}
                    </span>
                    <Link className="btn btn-light" to="/" exact>
                        Home
                    </Link>
                    <Link className="btn btn-light" to="/login">
                        Log In
                    </Link>
                </div>
            </div>)
        }
    </CardsContextConsumer>
);

export default Header;
